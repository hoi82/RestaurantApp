import React, { useEffect } from 'react';
import { fetchTakeoutsIfNeed } from '../../../../actions/main/takeout';
import { useParams, useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Menu from './Menu';
import { Formik, Form, FieldArray } from 'formik';
import styles from "./Takeout.module.scss";
import BucketList from './BucketList';
import { showDialog } from "../../../../actions/common/dialog";
import { DialogMode } from "../../../../types/Variables";
import { SESSION_FOUND, LOG_IN_SUCCESS } from '../../../../actions/auth';
import Axios from 'axios';
import { axiosConfig, endpoint } from '../../../../config/url';

export default function Takeout(props) {
    const param = useParams();
    const takeout = useSelector((store) => store.main.takeout);
    const auth = useSelector((store) => store.auth);    
    const dispatch = useDispatch();    
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchTakeoutsIfNeed(param.id));
    }, []);    

    const handleSubmit = (values) => {
        dispatch(showDialog({
            mode: DialogMode.CONFIRM,
            content: "Are you sure to finish your order?",
            onConfirm: () => processTakeout(values.items)
        }))
    }

    const processTakeout = (orders = []) => {
        const data = combineToOrder(auth, param.id, orders);

        if (isLogin()) {
            fetchTakeoutOrder(data);
        }
        else {
            dispatch(showDialog({
                mode: DialogMode.ALERT,
                content: "You should login first to make an order."
            }))
        }
    }

    const fetchTakeoutOrder = (order) => {
        const ORDER_URL = "http://localhost:3005/api/takeout";
        Axios.post(ORDER_URL, order, axiosConfig).then((res) => {
            history.push(`${endpoint.takeoutMain}/${res.data}`);
        }).catch((err) => {
            console.log(err.message);
        });
    }

    const combineToOrder = (userInfo, resid, formValue) => {
        const v = { 
            userid: userInfo.id,
            resid: resid,            
            orders: formValue.map((order) => ({
                menuid: order.id,
                name: order.name,
                thumbnail: order.thumbnail,
                quantity: order.quantity,
                priceperunit: order.price.value,
                menutotalprice: order.quantity * order.price.value                
            })),
            totalprice: formValue.reduce((acc, cur) => {
                return acc + (cur.quantity * cur.price.value)
            }, 0)
        }
                
        return v;
    }

    const isLogin = () => {
        return auth.state == SESSION_FOUND || auth.state == LOG_IN_SUCCESS;
    }

    return (
        <Formik initialValues={{
            items: []
        }} onSubmit={handleSubmit}>
            <Form className={styles.takeout}>                          
                <span className={styles.title}>Takeout</span>                
                <FieldArray name="items">
                    {
                        (props) => (
                            <React.Fragment>
                                <BucketList helper={props}/>                                
                                {takeout.list.map((item, i) => 
                                    <Menu menu={item} key={item.id} index={i} helper={props}/>)}
                            </React.Fragment>                            
                        )
                    }
                </FieldArray>                      
            </Form>            
        </Formik>
    );
}
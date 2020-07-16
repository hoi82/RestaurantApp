import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from "./Takeouts.module.scss";
import { IMAGE_URL, endpoint } from '../../../../config/url';
import noImage from '../../../../types/noImage';
import { getFullAddress } from '../../../../utils/getStrings';
import { fetchMyTakeouts } from '../../../../actions/main/myTakeout';
import MenuButton from '../../../../components/MenuButton/MenuButton';
import Popup from '../../../../components/Popup';
import { Link } from 'react-router-dom';
import { showDialog } from '../../../../actions/common/dialog';
import TakeoutDetails from '../../../../components/TakeoutDetails';

function Takeout({restaurantThumbnail, restaurantAddress, restaurantName, orders, totalprice}) {
    const dispatch = useDispatch();
    const btnRef = useRef();

    const getMenuStringFromOrders = (orders) => {
        return orders.map((item) => (
            `${item.name} x ${item.quantity}`
        )).join(", ");
    }

    const handleDetails = (e) => {
        dispatch(showDialog({
            buttons: true,
            bgimg: false,
            content: <TakeoutDetails/>,            
        }))
    }

    return (
        <div className={styles.takeout}>
            <img className={styles.thumb} src={restaurantThumbnail ? `${IMAGE_URL}/${restaurantThumbnail}` : noImage}/>
            <div className={styles.text_container}>
                <span className={styles.title}>{restaurantName}</span>
                <span className={styles.small_content}>{getFullAddress(restaurantAddress)}</span>
                <span className={styles.small_content}>{getMenuStringFromOrders(orders)}</span>
                <span className={styles.big_content}>{totalprice}</span>
            </div>                  
            <MenuButton ref={btnRef} className={styles.menu}/>
            <Popup trigger={btnRef} position={{right: "8px", top: "48px"}}>
                <div className={styles.menu_panel}>                    
                    <button onClick={handleDetails} data-closebutton={true}>Details</button>
                    <Link to={`${endpoint.home}`}>Edit</Link>
                    <Link to={`${endpoint.takeout}`}>Cancel Order</Link>
                </div>
            </Popup>      
        </div>
    )
}

function Takeouts(props) {
    const my = useSelector((store) => store.main.my.takeout);
    const auth = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    useEffect(() => {        
        if (auth.isLogin) {                        
            dispatch(fetchMyTakeouts(auth.id));
        }
    }, [auth]);    

    const renderTakeouts = (takeouts) => {
        return takeouts.map((takeout) => (
            <Takeout key={takeout.id} {...takeout}/>
        ))
    }

    return (
        <div className={styles.takeouts}>
            <span className={styles.main_title}>Takeouts</span>
            <div className={styles.takeout_grid}>
                {renderTakeouts(my.takeouts)}
            </div>            
        </div>
    );
}

export default Takeouts;
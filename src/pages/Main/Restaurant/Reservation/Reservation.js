import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getFullAddress } from '../../../../utils/getStrings';
import { IMAGE_URL } from '../../../../config/url';
import styles from "./Reservation.module.scss";
import DatePicker from "../../../../components/DatePicker";
import TimePicker from "../../../../components/TimePicker";
import DropdownBox from '../../../../components/DropdownBox';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { showDialog } from "../../../../actions/common/dialog";
import { DialogMode } from '../../../../types/Variables';
import { registerReservation, fetchReservation } from '../../../../actions/main/reservation';
import { fetchRestaurantIfNeed } from '../../../../actions/main/restaurant/details';
import noImage from '../../../../types/noImage';
import { Form, Formik } from 'formik';
import { ErrorMessages } from '../../../../types/ErrorMessages';
import classnames from "classnames";

function ReservationUI(props) {
    const restaurant = useSelector((store) => store.main.restaurant.details);    
    const reservation = useSelector((store) => store.main.reservation);
    const auth = useSelector((store) => store.auth);
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch();    
    const param = useParams();  
    const store = useStore();      

    useEffect(() => {        
        dispatch(fetchRestaurantIfNeed(param.id));        
    },[]);        

    useEffect(() => {                                
        dispatch(fetchReservation(param.id, date));        
    }, [date]);                                

    const handleMember = (value) => {              
        props.setFieldValue("member", value);
    } 
    
    const handleDate = (value) => {
        setDate(value);        
    }

    const handleTime = (time) => {                
        props.setFieldValue("time", time);
    }     
    
    const dropdownFocus = (e) => {
        props.setFieldTouched("member", false);
    }

    const dropdownBlur = (e) => {
        props.setFieldTouched("member", true);
    }

    const timePickerFocus = (e) => {
        props.setFieldTouched("time", false);
    }

    const timePickerBlur = (e) => {        
        props.setFieldTouched("time", true);
    }    

    const handleLoggedName = (e) => {
        props.setFieldValue("name", auth.name);
    }

    const handleRefresh = () => {
        dispatch(fetchReservation(param.id, date));
    }
    
    const nameFocus = (e) => {
        props.setFieldTouched("name", false);
    }

    if (restaurant.isPending) return null;

    return (
        <Form className={styles.reservation}>
            <span className={styles.main_title}>Reservation</span>
            <header className={styles.res_profile}>
                <img src={restaurant.thumbnail? `${IMAGE_URL}/${restaurant.thumbnail}` : noImage}/>
                <div>
                    <span className={styles.name}>{restaurant.name}</span>
                    <span className={styles.address}>{getFullAddress(restaurant.address)}</span>
                </div>
            </header>    
            <div className={styles.info_panel}>    
                <div className={styles.header_box}>
                    <span className={styles.content_header}>Name</span>                    
                    <span className={classnames(styles.error_title, {[`${styles.error_visible}`] : props.touched["name"]})}>{props.errors["name"]}</span>
                </div>
                <div className={styles.name_panel}>
                    <input type="text" name="name" className={styles.name_input} value={props.values.name} onChange={props.handleChange} onFocus={nameFocus} onBlur={props.handleBlur}/>
                    <button type="button" onClick={handleLoggedName} className={styles.name_btn} disabled={!auth.isLogin}>로그인 이름 사용하기</button>
                </div>                
                <span className={styles.content_header}>Date</span>
                <DatePicker date={date} onChange={handleDate}/>
                <div className={styles.header_box}>
                    <span className={styles.content_header}>Time</span>
                    <span className={classnames(styles.error_title, {[`${styles.error_visible}`] : props.touched["time"]})}>{props.errors["time"]}</span>
                </div>     
                {
                    reservation.isPending ? null
                    :                    
                    <TimePicker available={reservation.available} reserved={reservation.reserved} time={props.values.time} timezone={restaurant.opens.timezone} onTimeChange={handleTime}
                    onFocus={timePickerFocus} onBlur={timePickerBlur} onRefresh={handleRefresh}/>                    
                }                
                <div className={styles.header_box}>
                    <span className={styles.content_header}>Member</span>
                    <span className={classnames(styles.error_title, {[`${styles.error_visible}`] : props.touched["member"]})}>{props.errors["member"]}</span>
                </div>                
                <DropdownBox value={props.values.member} onChange={handleMember} items={[1,2,3,4,5,6,7,8]} width="160px" onFocus={dropdownFocus} onBlur={dropdownBlur}/>
                <span className={styles.content_header}>Personal Message</span>
                <textarea name="message" value={props.values.message} className={styles.message} onChange={props.handleChange} onBlur={props.handleBlur}/>
            </div>                            
            {
                // restaurant.reservation ? <div className={styles.cf_panel}>
                //     <span className={styles.content_header}>Cancellation Fee</span>
                //     <span className={styles.cf_content}>
                //         {
                //             restaurant.reservation.fee ? 
                //             `${restaurant.reservation.fee.currency} ${restaurant.reservation.fee.value}`
                //             : "Free"
                //         }
                //     </span>
                //     {
                //         restaurant.reservation.fee ? 
                //         <React.Fragment>
                //             <span className={styles.cf_warning}>No payment is registered.</span>
                //             <button type="button" className={styles.cf_reg_btn}>Register Payment</button>
                //         </React.Fragment>
                //         : null
                //     }                        
                // </div>
                // : null
            }                
            <button type="submit" className={styles.submit_btn}>Submit</button>
        </Form> 
    )
}

function Reservation() {  
    const restaurant = useSelector((store) => store.main.restaurant.details);   
    const dispatch = useDispatch(); 

    const handleSubmit = (values) => {                  
        if (restaurant.reservation && restaurant.reservation.fee && restaurant.reservation.fee.value) {
            dispatch(showDialog({
                mode: DialogMode.CONFIRM,
                bgimg: false,
                buttons: false,
                content: "The cancellation fee will be paid.\r\nDo you want to continue reservation?",
                onConfirm: () => dispatch(registerReservation(values))
            }))            
        } 
        else {
            dispatch(registerReservation(values));
        }
    }         

    const handleValidate = (values) => {        
        const errors = {};        

        if (values.name == "") 
            errors.name = ErrorMessages.EMPTY_TEXT;

        if (values.time == null || values.time == "")
            errors.time = ErrorMessages.EMPTY_TEXT;

        if (values.member == 0) 
            errors.member = ErrorMessages.EMPTY_TEXT;        

        return errors;
    }

    return (                    
        <Formik initialValues={{name: "", time: null, member: 0, message: ""}} onSubmit={handleSubmit} validate={handleValidate}>
            {(props) => <ReservationUI {...props}/>}            
        </Formik>               
    );
}

export default Reservation;
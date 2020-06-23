import React from 'react';
import styles from "./Content.module.scss";
import loadable from '@loadable/component';
import { FieldArray } from 'formik';

const Profile = loadable(() => import("./Profile/Profile"));
const PaymentContainer = loadable(() => import("./Payment/PaymentContainer"));

export default ({pageName}) => {                 
    const renderContent = (page) => {                
        switch (page) {
            case "profile":
                return <Profile/>;                
            case "payment":
                return <FieldArray name="payments">
                    {(props) => <PaymentContainer arrayHelper={props}/>}
                </FieldArray>;
            default:
                return <Profile/>;                
        }
    }
        
    return (
        <div className={styles.content}>                
            {renderContent(pageName)}                
        </div>                        
    );   
}
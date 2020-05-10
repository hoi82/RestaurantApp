import React from 'react';
import styles from "./Content.module.scss";
import loadable from '@loadable/component';

const Profile = loadable(() => import("./Profile/Profile"));
const PaymentContainer = loadable(() => import("./Payment/PaymentContainer"));

export default ({pageName}) => {                 
    const renderContent = (page) => {                
        switch (page) {
            case "profile":
                return <Profile/>;
                break;
            case "payment":
                return <PaymentContainer location={location} history={history}/>;
                break;        
            default:
                return <Profile/>;
                break;
        }
    }
        
    return (
        <div className={styles.content}>                
            {renderContent(pageName)}                
        </div>                        
    );   
}
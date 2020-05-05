import React from 'react';
import styles from "./Content.module.scss";
import loadable from '@loadable/component';

const Profile = loadable(() => import("./Profile/Profile"));
const PaymentContainer = loadable(() => import("./Payment/PaymentContainer"));

export default ({location}) => {                 
    const renderContent = (state) => {        
        const page = state ? state.mainpage : null;
        switch (page) {
            case "profile":
                return <Profile/>;
                break;
            case "payment":
                return <PaymentContainer location={location}/>;
                break;        
            default:
                return <Profile/>;
                break;
        }
    }
        
    return (
        <div className={styles.content}>                
            {renderContent(location.state)}                
        </div>                        
    );   
}
import React from 'react';
import PropTypes from "prop-types";
import Profile from "./Profile";
import Payment from "./Payment";
import styles from "./Content.module.scss";
import { useSelector } from 'react-redux';

export default function Content(props) {    
    //NOTE: setState는 비동기다!!!절대 잊지 말것!
    //순차적인 처리를 원하면 뒤쪽의 Callback property에 해당 method를 넣을것.
    // SetContent(content) {
    //     this.setState({ curContent : content }, function() {
    //         localStorage.setItem("curContent", content);
    //     });                
    // }
    const page = useSelector((store) => store.registerNavigation.root)
    
    const renderContent = () => {        
        switch (page) {
            case "profile":
                return <Profile/>;
                break;
            case "payment":
                return <Payment/>;
                break;        
            default:
                return null;
                break;
        }
    }
        
    return (
        <div className={styles.content}>                
            {renderContent()}                
        </div>                        
    );   
}
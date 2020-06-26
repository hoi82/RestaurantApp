import React from 'react';
import Popup from "../../../components/Popup";
import styles from "./TakeoutResult.module.scss";

function TakeoutResult(props) {
    return (
        <div className={styles.takeout_result}>
            <div className={styles.title_box}>
                <span className={styles.page_title}>Order completed</span>
                <svg id="btnMenu" className={styles.menu} enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                    <path d="m257.36 337.61c-33.084 0-60 26.916-60 60s26.916 60 60 60 60-26.916 60-60-26.916-60-60-60zm0 100c-22.057 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z"/>
                    <path d="m257.36 197.61c-33.084 0-60 26.916-60 60s26.916 60 60 60 60-26.916 60-60-26.916-60-60-60zm0 100c-22.057 0-40-17.943-40-40 0-22.056 17.944-40 40-40s40 17.944 40 40c0 22.057-17.944 40-40 40z"/>
                    <path d="m257.36 177.61c33.084 0 60-26.916 60-60s-26.916-60-60-60-60 26.916-60 60 26.916 60 60 60zm0-100c22.056 0 40 17.944 40 40 0 22.057-17.944 40-40 40-22.057 0-40-17.943-40-40 0-22.055 17.944-40 40-40z"/>
                </svg>
                <Popup triggerID="btnMenu" position={{top: "48px", right: 0}}>
                    <div className={styles.menu_panel}>
                        <button>Save to receipts</button>
                        <button>Share</button>
                        <button>Back to Takeout</button>
                        <button>Back to Restaurant</button>
                    </div>
                </Popup>
            </div>   
            <div className={styles.content_box}>
                <span className={styles.section_title}>Name</span>
                <span className={styles.name}>aaa</span>
            </div>
            <div className={styles.content_box}>
                <span className={styles.section_title}>Restaurant</span>
                <span>aaaa</span>
            </div>
            <div className={styles.content_box}>
                <span className={styles.section_title}>Orders</span>
                <span>aaa</span>
                <span>bbb</span>
                <span>total</span>
            </div>            
        </div>
    );
}

export default TakeoutResult;
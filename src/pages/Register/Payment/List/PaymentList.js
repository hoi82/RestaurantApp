import React from 'react';
import styles from "./PaymentList.module.scss";
import box from "../../../../image/box.svg";

export default function PaymentList({children}) {    
    const renderList = () => {
        if (!children || children.length == 0) {
            return <div className={styles.empty_container}>
                <span className={styles.title}>저장된 결제 방법이 없어요.</span>
                <img src={box} className={styles.box_image}/>
            </div>;
        }
        else {
            return <div className={styles.item_container}>
                {children}
            </div>;   
        }
    }
    
    return (            
        <div className={styles.list}> 
            {renderList()}
        </div>
    );    
}
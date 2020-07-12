import React from 'react';
import styles from "./BucketList.module.scss";
import { useFormikContext } from 'formik';
import { IMAGE_URL } from '../../../../config/url';
import noImage from '../../../../types/noImage';

const BucketItem = ({item, index, helper}) => {
    const handleRemove = (e) => {
        helper.remove(index);
    }

    return (
        <div className={styles.bucketitem}>
            <img className={styles.thumb} src={item.thumbnail ? `${IMAGE_URL}/${item.thumbnail}` : noImage}/>
            <span className={styles.name}>{item.name}</span>
            <span className={styles.quantity}>{item.quantity}</span>
            <span className={styles.price}>{`${item.price.currency} ${item.price.value * item.quantity}`}</span>
            <svg className={styles.remove_btn} onClick={handleRemove} enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path d="m424 64h-88v-16c0-26.51-21.49-48-48-48h-64c-26.51 0-48 21.49-48 48v16h-88c-22.091 0-40 17.909-40 40v32c0 8.837 7.163 16 16 16h384c8.837 0 16-7.163 16-16v-32c0-22.091-17.909-40-40-40zm-216-16c0-8.82 7.18-16 16-16h64c8.82 0 16 7.18 16 16v16h-96z"/>
                    <path d="m78.364 184c-2.855 0-5.13 2.386-4.994 5.238l13.2 277.042c1.22 25.64 22.28 45.72 47.94 45.72h242.98c25.66 0 46.72-20.08 47.94-45.72l13.2-277.042c.136-2.852-2.139-5.238-4.994-5.238zm241.636 40c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16z"/>
                </g>
            </svg>
        </div>
    );
}

function BucketList({helper}) {
    const context = useFormikContext();

    const renderItems = () => {
        const { values: { items}} = context;        
        return items.map((item, i) => <BucketItem key={item.menuID} item={item} index={i} helper={helper}/>)
    }

    const getTotalPrice = () => {
        const { values: { items}} = context;
        return items.reduce((acc, cur, i) => {            
            return acc + (cur.quantity * cur.price.value);
        }, 0);
    }    

    return (
        <div className={styles.bucketlist}>
            {renderItems()}
            <div className={styles.total_panel}>
                <span className={styles.total_header}>Total</span>
                <span className={styles.total_content}>{`${getTotalPrice()}`}</span>
            </div>
            <button type="submit" className={styles.submit_btn}>Order</button>
        </div>
    );
}

export default BucketList;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { endpoint, IMAGE_URL } from '../../../../config/url';
import noImage from '../../../../types/noImage';
import styles from "./Menu.module.scss";

export default function Menu({menu, helper}) {
    const [quantity, setQuantity] = useState(1);        

    const handleAdd = (e) => {
        const { form: { values: {items}}} = helper;
        const idx = items.findIndex((item) => item.menuID == menu.id);
        if (idx > -1)
        {
            const replaceValue = {
                menuID: menu.id,
                thumbnail: menu.thumbnail,
                name: menu.name,
                price: menu.price,
                quantity: items[idx].quantity + quantity
            }            
            helper.replace(idx, replaceValue);
        }
        else {
            const newValue = {
                menuID: menu.id,
                thumbnail: menu.thumbnail,
                name: menu.name,
                price: menu.price,
                quantity: quantity
            }
            helper.push(newValue);
        }
        setQuantity(1);
    }

    const handleMinus = (e) => {
        setQuantity(prev => prev > 1 ? prev - 1 : prev);
    }

    const handlePlus = (e) => {
        setQuantity(prev => prev + 1);
    }    

    const handleChange = (e) => {        
        const value = e.target.validity.valid ? e.target.value : quantity;
        setQuantity(Number(value));
    }    

    return (
        <div className={styles.menu}>
            <img className={styles.thumb} src={menu.thumbnail ? `${IMAGE_URL}/${menu.thumbnail}` : noImage}/>
            <div className={styles.nameplate}>
                <span className={styles.name}>{menu.name}</span>
                <span>{`${menu.price.currency} ${menu.price.value}`}</span>
            </div>
            <div className={styles.control_panel}>
                <button type="button" onClick={handleMinus}>-</button>
                <input className={styles.input} type="text" maxLength={3} pattern="[0-9]*" value={quantity} onChange={handleChange}/>
                <button type="button" onClick={handlePlus}>+</button>
            </div>
            <button type="button" className={styles.add_btn} onClick={handleAdd}>Add</button>
        </div>
    )
}
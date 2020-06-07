import React, { useState, useEffect } from 'react';
import styles from "./Menu.module.scss";
import { fetchMenu } from '../utils';
import { useHistory } from 'react-router';
import { IMAGE_URL, endpoint } from '../../../../config/url';
import noImage from '../../../../types/noImage';

function Menu({id, thumbnail, name, price}) {    
    const history = useHistory();    

    const handleMenuClick = (e) => {
        history.push(`${endpoint.menuDetails}/${id}`, {menu});
    }

    return (
        <button className={styles.menu} onClick={handleMenuClick}>
            <img src={thumbnail ? `${IMAGE_URL}/${thumbnail}` : noImage}/>
            <span>{name}</span>
            <span>{`${price ? price.currency : null} ${price ? price.value : null}`}</span>
        </button>
    );
}

export default Menu;
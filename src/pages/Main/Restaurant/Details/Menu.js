import React, { useState, useEffect } from 'react';
import styles from "./Menu.module.scss";
import { fetchMenu } from './utils';
import { useHistory } from 'react-router';
import { IMAGE_URL, endpoint } from '../../../../config/url';
import noImage from '../../../../types/noImage';

function Menu({id}) {
    const [menu, setMenu] = useState({});
    const history = useHistory();

    useEffect(() => {
        fetchMenu(id).then((data) => {
            setMenu(data);                     
        });
    }, []);

    const handleMenuClick = (e) => {
        history.push(`${endpoint.menuDetails}/${id}`, {menu});
    }

    return (
        <button className={styles.menu} onClick={handleMenuClick}>
            <img src={menu.thumbnail ? `${IMAGE_URL}/${menu.thumbnail}` : `data:image/png;base64,${noImage}`}/>
            <span>{menu.name}</span>
            <span>{`${menu.price ? menu.price.currency : null} ${menu.price ? menu.price.value : null}`}</span>
        </button>
    );
}

export default Menu;
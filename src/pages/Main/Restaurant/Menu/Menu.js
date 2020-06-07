import React, { useState, useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router';
import { fetchMenu } from '../utils';
import { IMAGE_URL } from '../../../../config/url';
import noImage from '../../../../types/noImage';
import styles from "./Menu.module.scss";
import favorite from "../../../../image/addfav.svg";
import share from "../../../../image/share.svg";

export default function Menu() {    
    const [menu, setMenu] = useState({});
    const history = useHistory();  
    const params = useParams();
    const location = useLocation();    
    
    useEffect(() => {
        if (location.state && location.state.menu) {
            setMenu(location.state.menu);
        }
        else {
            fetchMenu(params.id).then((data) => setMenu(data));            
        }
    },[]);        
    
    return (
        <div className={styles.menu}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <img className={styles.thumbnail} src={menu.thumbnail ? `${IMAGE_URL}/${menu.thumbnail}` : noImage}/>
                    <div className={styles.header_content}>
                        <div>
                            <span className={styles.name}>{menu.name}</span>
                            <img src={favorite} className={styles.header_btn}/>
                            <img src={share} className={styles.header_btn}/>
                        </div>
                        <div style={{marginTop: "24px"}}>
                            <span className={styles.price_title}>Price : </span>
                            <span className={styles.price_content}>{`${menu.price ? menu.price.currency : null} ${menu.price ? menu.price.value : null}`}</span>
                        </div>
                    </div>
                </div>
                <span className={styles.section_title}>Ingredients</span>
                <p className={styles.section_content}>{menu.ingredients}</p>
                <span className={styles.section_title}>Description</span>
                <p className={styles.section_content}>{menu.description}</p>
                <button className={styles.takeout_btn} disabled={!menu.takeout}>Take Out</button>
            </div>
        </div>        
    );
}
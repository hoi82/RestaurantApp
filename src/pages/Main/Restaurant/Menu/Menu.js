import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { IMAGE_URL, endpoint } from '../../../../config/url';
import noImage from '../../../../types/noImage';
import styles from "./Menu.module.scss";
import favorite from "../../../../image/addfav.svg";
import share from "../../../../image/share.svg";
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenu } from '../../../../actions/main/menu';

export default function Menu() {    
    const menu = useSelector((store) => store.main.menu);
    const param = useParams();
    const dispatch = useDispatch();
    const history = useHistory();    
    
    //TODO: 여기부터 해야됨.메뉴 별도로 가져오던가 아니면 리스트를 통째로 불러서 하던지 해야할듯.
    useEffect(() => {
        dispatch(fetchMenu(param.id));
    },[]);        

    const addTakeout = (e) => {
        const order = {
            menuID: menu.menuID,
            thumbnail: menu.thumbnail,
            name: menu.name,
            price: menu.price,
            quantity: 1
        }
        history.push(`${endpoint.takeout}/${menu.restaurantID}`, order);
    }
    
    return (
        <div className={styles.menu}>        
            <div className={styles.header}>
                <img className={styles.thumbnail} src={menu.thumbnail ? `${IMAGE_URL}/${menu.thumbnail}` : noImage}/>
                <div className={styles.header_content}>
                    <div>
                        <span className={styles.name}>{menu.name}</span>
                        <img src={favorite} className={styles.header_btn}/>
                        <img src={share} className={styles.header_btn}/>
                    </div>
                    <div>
                        <span className={styles.price_title}>Price : </span>
                        <span className={styles.price_content}>{`${menu.price ? menu.price.currency : null} ${menu.price ? menu.price.value : null}`}</span>
                    </div>
                </div>
            </div>
            <span className={styles.section_title}>Ingredients</span>
            <p className={styles.section_content}>{menu.ingredients}</p>
            <span className={styles.section_title}>Description</span>
            <p className={styles.section_content}>{menu.description}</p>
            <button className={styles.takeout_btn} disabled={!menu.takeoutEnable} onClick={addTakeout}>Take Out</button>
        </div>        
    );
}
import React, { useEffect } from 'react';
import styles from "./Menus.module.scss";
import plan from "../../../../image/plan.svg";
import Menu from './Menu';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenusIfNeed } from '../../../../actions/main/restaurant/menus';

export default function Menus({restaurantID}) {
    const menus = useSelector((store) => store.main.restaurant.menus);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMenusIfNeed(restaurantID));
    }, []);

    const renderMenus = (menus) => {
        if (!menus || menus.length == 0)
            return null;

        if (menus.map) {
            return menus.map((menu, i) => (
                <Menu key={i} {...menu}/>
            ))
        }
        else {
            return null;
        }
    }
    
    if (menus.isPending) return null;

    return (
        <React.Fragment>
            <span className={styles.menu_title}>Menus</span>                    
            { menus.list.length > 0 ? <div className={styles.menu_panel}>
                <div className={styles.menu_inner_panel}>
                    {renderMenus(menus.list)}
                </div>
            </div> 
            : <div className={styles.menu_noitem_panel}>
                <div>
                    <img src={plan}/>
                    <span>Menus are not prepared. But we will meet them soon!</span>
                </div>                        
            </div> }   
        </React.Fragment>
    );
}
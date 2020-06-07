import React from 'react';
import styles from "./Menus.module.scss";
import plan from "../../../../image/plan.svg";
import Menu from './Menu';

export default function Menus({menus = []}) {
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

    return (
        <React.Fragment>
            <span className={styles.menu_title}>Menus</span>                    
            { menus && menus.length > 0 ? <div className={styles.menu_panel}>
                <div className={styles.menu_inner_panel}>
                    {renderMenus(menus)}
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
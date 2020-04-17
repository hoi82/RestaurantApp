import React, { useState } from 'react';
import styles from "./styles.scss";
import DropdownInput from '../../../../components/InputWithHeader/DropdownInput';

export default (props) => {    
    const restaurants = ["a", "aa", "aaa", "aaaa"];

    const itemRenderer = (item, index, clickEvent) => (
        <button key={index} onClick={clickEvent} className={styles.dropdown_item}>{item}</button>
    );
    //TODO: Dropdown 스타일 잡는것부터 할것.
    return (
        <div className={styles.container}>
            <span className={styles.title}>Search By Name</span>
            <span className={styles.description}>Input the name what you want.</span>
            <DropdownInput items={restaurants} itemRenderer={itemRenderer} inputStyle={styles.input} panelStyle={styles.dropdown}/>
            <button className={styles.search_btn}>
                <span className={styles.btn_title}>Search</span>
            </button>
        </div>
    );
}
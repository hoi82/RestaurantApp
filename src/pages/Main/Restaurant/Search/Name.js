import React from 'react';
import styles from "./styles.scss";
import DropdownInput from '../../../../components/InputWithHeader/DropdownInput';
import dummy from "../../../../data/nameDummy";

export default (props) => {    
    const restaurants = dummy(40);    

    const nameSelector = (value) => new Promise((resolve, reject) => {
       setTimeout(() => {
            const filtered = restaurants.filter((item) => item.indexOf(value) > -1);
            resolve(filtered);
            reject(new Error("item is empty"));
       }, 200);        
    });
        
    return (
        <div className={styles.container}>
            <span className={styles.title}>이름으로 검색</span>
            <span className={styles.description}>찾고 싶은 이름을 넣어주세요</span>
            <div className={styles.name_search_box}>
                <DropdownInput itemSelector={nameSelector} itemClass={styles.dropdown_item} itemSelectedClass={styles.dropdown_item_selected} 
                inputClass={styles.input} panelClass={styles.dropdown}/>
                <button className={styles.search_btn}>
                    <span className={styles.search_btn_title}>찾아보기</span>
                </button>
            </div>            
        </div>
    );
}
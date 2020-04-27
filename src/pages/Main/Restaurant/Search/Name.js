import React, { useState } from 'react';
import styles from "./styles.scss";
import Dropdown from '../../../../components/DropdownTextBox';
import { useSelector, useDispatch } from 'react-redux';
import { GetNames } from '../../../../actions/main';

export default (props) => {    
    const names = useSelector((store) => store.main.search.names);
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleChange = (value) => {
        dispatch(GetNames(value));
        setName(value);        
    }

    const handleSearch = (e) => {
        console.log(name);
    }
        
    return ( 
        <div className={styles.container}>
            <span className={styles.title}>이름으로 검색</span>
            <span className={styles.description}>찾고 싶은 이름을 넣어주세요</span>
            <div className={styles.name_search_box}>
                <Dropdown value={name} onChange={handleChange} items={names}/>
                <button className={styles.search_btn} onClick={handleSearch}>
                    <span className={styles.search_btn_title}>찾아보기</span>
                </button>
            </div>            
        </div>        
    );
}
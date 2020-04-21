import React from 'react';
import styles from "./styles.scss";
import dummy from "../../../../data/categoryDummy";
import PanelGrid from '../../../../components/PanelGrid';

export default (props) => {
    return (
        <div className={styles.container}>
            <span className={styles.title}>Search By Category</span>
            <span className={styles.description}>Select the category whay you want.</span>
            <PanelGrid items={dummy(37)}/>
        </div>
    );
}
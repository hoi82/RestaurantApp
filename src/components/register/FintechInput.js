import React, { Component } from 'react';
import styles from "./FintechInput.module.scss";
import close from "../../image/close.svg";

class FintechInput extends Component {
    render() {
        return (
            <div className={styles.container}>
                <button className={styles.close_btn} onClick={(e) => this.props.onBack("select")}>
                    <img src={close} className={styles.close_icon}/>
                </button>
            </div>
        );
    }
}

export default FintechInput;
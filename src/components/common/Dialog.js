import React, { Component } from 'react';
import styles from "./Dialog.module.scss";
import alert from "../../image/alert.svg";

class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false, title: "aaa", content: "bbb" };
        this.ShowDialog = this.ShowDialog.bind(this);
        this.CloseDialog = this.CloseDialog.bind(this);
    }    

    ShowDialog(content, title = "") {
        this.setState({ isOpen: true, title: title, content: content });
    }

    CloseDialog() {
        this.setState({ isOpen: false });
    }
    
    render() {
        return (  
            <React.Fragment>
                {
                    this.state.isOpen ? 
                    <div className={styles.dialog}>
                        <div className={styles.overlay} onClick={this.CloseDialog}></div>
                        <div className={styles.container}>
                            <div className={styles.box}>
                                {/* {
                                    this.state.title != "" ?
                                    <div className={styles.title_bar}>
                                        {this.state.title}
                                    </div> 
                                    :
                                    null
                                }                     */}
                                <img src={alert} className={styles.logo}></img>
                                <div className={styles.content_box}>
                                    {this.state.content}
                                </div>
                                <div className={styles.button_box}>
                                    <button onClick={this.CloseDialog}>
                                        닫기
                                    </button>
                                </div>
                            </div>    
                        </div>                        
                    </div>                                   
                    :
                    null
                }
            </React.Fragment>            
        );
    }
}

export default Dialog;
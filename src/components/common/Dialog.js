import React, { Component } from 'react';
import { DialogMode } from "./Variables";
import styles from "./Dialog.module.scss";
import alert from "../../image/alert.svg";
import success from "../../image/success.svg";
import yesorno from "../../image/true.svg";

class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isOpen: false,
            mode: DialogMode.ALERT, 
            title: "", 
            content: "",
            buttonText: "닫기",
            btnClass: styles.alert
        };

        this.showDialog = this.showDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }    

    callbackFunc = null;

    showDialog = (mode, content, title = "", callback) => {
        this.setState({ isOpen: true, mode: mode, title: title, content: content }, this.renderBtnBg);
        this.callbackFunc = callback;
    }

    closeDialog = () => {
        this.setState({ isOpen: false });
        if (typeof(this.callbackFunc) == "function")
            this.callbackFunc();
    }

    renderBg = () => {   
        switch (this.state.mode) {
            case DialogMode.ALERT:
                return <img src={alert} className={styles.logo}/>;
                break;
            case DialogMode.CONFIRM:
                return <img src={yesorno} className={styles.logo}/>;
                break;
            case DialogMode.SUCCESS:
                return <img src={success} className={styles.logo}/>;
                break;
            default:
                break;
        }
    }

    renderBtnBg = () => {        
        switch (this.state.mode) {
            case DialogMode.ALERT:
                this.setState({ btnClass : styles.alert_btn });
                break;
            case DialogMode.SUCCESS:
                this.setState({ btnClass : styles.success_btn });
                break;
            case DialogMode.CONFIRM:
                this.setState({ btnClass : styles.confirm_btn });
                break;
            default:
                return null;
                break;
        }
    }
    
    //NOTE: state에 속성을 부여해 true면 컴포넌트, false면 null return
    //state 변경시 컴포넌트를 다시 render한다는 점을 이용
    render() {        
        return (  
            <React.Fragment>
                {
                    this.state.isOpen ? 
                    <div className={styles.dialog}>
                        <div className={styles.overlay}></div>
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
                                {this.renderBg()}
                                <div className={styles.content_box}>
                                    {this.state.content}
                                </div>                                
                                <div className={styles.button_box}>
                                    <button className={this.state.btnClass} onClick={this.closeDialog}>
                                        {this.state.buttonText}
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
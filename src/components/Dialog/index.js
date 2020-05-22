import React from 'react';
import { DialogMode } from "../../types/Variables";
import styles from "./styles.scss";
import { useSelector, useDispatch } from 'react-redux';
import { closeDialog } from '../../actions/common/dialog';
import alert from "../../image/alert.svg";
import confirm from "../../image/true.svg";
import success from "../../image/success.svg";

export default function Dialog(props) {
    const dialog = useSelector((store) => store.shared.dialog);     
    const dispatch = useDispatch();       

    const handleClose = () => {   
        dispatch(closeDialog());     
        if (typeof(dialog.onClose) == "function")
            dialog.onClose();
    }

    const renderBg = () => {   
        switch (dialog.mode) {
            case DialogMode.ALERT:                
                return <img className={styles.logo} src={alert}/>;
                break;
            case DialogMode.CONFIRM:
                return <img className={styles.logo} src={confirm}/>;
                break;
            case DialogMode.SUCCESS:
                return <img className={styles.logo} src={success}/>;
                break;
            default:
                break;
        }
    }

    const renderBtnBg = () => {        
        switch (dialog.mode) {
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
         
    return (  
        <React.Fragment>
            {
                dialog.show ?
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
                            {renderBg()}
                            <div className={styles.content_box}>
                                {dialog.content}
                            </div>                                
                            <div className={styles.button_box}>
                                {dialog.buttons ? dialog.buttons : (
                                    <button className={styles.alert_btn} onClick={handleClose}>
                                        <span>
                                            닫기
                                        </span>                                        
                                    </button>
                                )}                                
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
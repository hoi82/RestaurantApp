import React, { useState, useRef } from 'react';
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
    const [mouseDownObj, setMouseDownObj] = useState(null);
    const overlayRef = useRef();

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

    const renderBtn = () => {        
        switch (dialog.mode) {
            case DialogMode.ALERT:
                return <button type="button" className={styles.alert_btn} onClick={handleClose}>
                    <span>
                        닫기
                    </span>
                </button>
            case DialogMode.SUCCESS:
                return <button type="button" className={styles.success_btn} onClick={handleClose}>
                    <span>
                        닫기
                    </span>
                </button>
            case DialogMode.CONFIRM:
                return <React.Fragment>
                    <button type="button" className={styles.confirm_btn} onClick={handleConfirm}>
                        <span>예</span>
                    </button>
                    <button type="button" className={styles.confirm_btn} onClick={handleCancel}>
                        <span>아니오</span>
                    </button>
                </React.Fragment>
            default:
                break;
        }
    }

    const handleConfirm = (e) => {
        dispatch(closeDialog());
        if (typeof(dialog.onConfirm) == "function")
            dialog.onConfirm();
    }

    const handleCancel = (e) => {
        dispatch(closeDialog());
        if (typeof(dialog.onCancel) == "function")
            dialog.onCancel();
    }    

    const handleOverlayDown = (e) => {
        setMouseDownObj(e.target);        
    }

    const handleOverlayUp = (e) => {
        if (e.target == mouseDownObj && e.target == overlayRef.current) {
            dispatch(closeDialog());
        }        
    }
    
    //NOTE: state에 속성을 부여해 true면 컴포넌트, false면 null return
    //state 변경시 컴포넌트를 다시 render한다는 점을 이용
         
    return (  
        <React.Fragment>
            {
                dialog.show ?
                <div className={styles.dialog}>
                    <div className={styles.overlay}/>
                    <div className={styles.container} ref={overlayRef} onMouseDown={handleOverlayDown} onMouseUp={handleOverlayUp}>
                        <div className={styles.box}>
                            {/* {
                                this.state.title != "" ?
                                <div className={styles.title_bar}>
                                    {this.state.title}
                                </div> 
                                :
                                null
                            }                     */}
                            {dialog.bgimg ? renderBg() : null}
                            <div className={styles.content_box}>
                                {dialog.content}
                            </div>        
                            {
                                dialog.buttons ? null : <div className={styles.button_box}>
                                    {renderBtn()}                                
                                </div>
                            }                                                    
                        </div>    
                    </div>                        
                </div>                                   
                :
                null
            }
        </React.Fragment>            
    );    
}
import React from 'react';
import styles from "./style.scss";
import close from "../../../../../image/close.svg";
import { Form, useFormikContext } from 'formik';

const Input = ({name, header, type, extChange}) => {
    const context = useFormikContext();

    const handleFocus = (e) => {
        context.setFieldTouched(name, false);
    }    

    const handleChange = (e) => {
        if (extChange) {
            extChange(e);
        }
        else {
            context.handleChange(e);
        }
    }

    return (
        <React.Fragment>
            <div className={styles.header_box}>
                <span className={styles.header_title}>{header}</span>
                <span className={context.touched[name] ? styles.error_title.concat(" ", styles.error_visible) : styles.error_title}>{context.errors[name]}</span>
            </div>
            <input className={styles.input} type={type ? type : "text"} name={name} value={context.values[name]} onChange={handleChange} onBlur={context.handleBlur} onFocus={handleFocus}/>
        </React.Fragment>
    )
}

export default function PaypalInput({edit=false, movePage}) {
    const backToList = () => {
        movePage("list");
    }       

    const handleClose = (e) => {
        if (edit) {
            backToList();
        }
        else {
            movePage("select");
        }        
    }      

    return (
        <Form className={styles.container}>
            <div className={styles.inner_container}>
                <Input header="이메일" name="email" type="email"/>
                <Input header="비밀번호" name="password" type="password"/>
            </div>            
            <button type="submit" className={styles.add_btn}>
                <span className={styles.add_btn_text}>
                    {edit ? "저장하기" : "추가하기"}
                </span>
            </button>
            <button type="button" className={styles.close_btn} onClick={handleClose}>
                <img src={close} className={styles.close_icon}/>
            </button>
        </Form>
    );    
}
import React from 'react';
import styles from "./style.scss";
import close from "../../../../../image/close.svg";
import { useFormikContext, Form } from 'formik';
import Formatter from '../../../../../utils/Formatter';

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

export default function CreditCardInput({edit = false, movePage}) {
    const context = useFormikContext();

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
    
    const handleNumberChange = (e) => {
        e.target.value = Formatter.formatCardNumber(e.target.value);
        context.setFieldValue("number", e.target.value);
    }

    const handleNumberFocus = (e) => {
        context.setFieldTouched("number", false);
    }

    const handleExpireChange = (e) => {        
        const value = Formatter.formatExpireDate(e.target.value);        
        e.target.value = value;
        context.setFieldValue("expire", value);
    }    
        
    return (         
        <Form className={styles.container}>
            <div className={styles.inner_container}>
                <div className={styles.num_box}>
                    <div className={styles.header_box}>
                        <span className={styles.header_title}>카드번호</span>
                        <span className={context.touched["number"] ? styles.error_title.concat(" ", styles.error_visible) : styles.error_title}>{context.errors["number"]}</span>
                    </div>
                    <input className={styles.input} type="text" name="number" value={context.values["number"]} onChange={handleNumberChange} onBlur={context.handleBlur} onFocus={handleNumberFocus} autoFocus/>
                    <label>
                        <img/>
                    </label>
                </div>
                <div className={styles.etc_box}>
                    <div className={styles.expire_box}>
                        <Input header="만료" name="expire" extChange={handleExpireChange}/>
                    </div>
                    <div className={styles.cvc_box}>
                        <Input header="CVC" name="cvc" type="password"/>
                    </div>
                </div>   
                <div className={styles.name_box}>
                    <Input header="소유주" name="cashHolder"/> 
                </div>
            </div>
            <button type="submit" className={styles.add_btn}>
                <span>
                    {edit ? "저장하기" : "추가하기"}
                </span>
            </button>
            <button type="button" className={styles.close_btn} onClick={handleClose}>
                <img src={close} className={styles.close_icon}/>
            </button>
        </Form>
    );    
}
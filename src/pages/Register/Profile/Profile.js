import React from 'react';
import styles from "./Profile.module.scss";
import { useSelector, useDispatch } from 'react-redux';
import { useFormikContext, Form } from 'formik';

const Input = ({header, name, type, autoFocus = false}) => {
    const context = useFormikContext();      

    const handleFocus = (e) => {
        context.setFieldTouched(name, false);
    }

    return (
        <React.Fragment>
            <div className={styles.header_box}>
                <span className={styles.header_title}>{header}</span>
                <span className={context.touched[name] ? styles.error_title.concat(" ", styles.error_visible) : styles.error_title}>{context.errors[name]}</span>
            </div>
            <input className={styles.input} type={type ? type : "text"} name={name} value={context.values[name]} onChange={context.handleChange} onBlur={context.handleBlur} autoFocus={autoFocus} onFocus={handleFocus}/>
        </React.Fragment>        
    )
}

export default function Profile() {       
    const profile = useSelector((store) => store.register.profile);
    const status = useSelector((store) => store.register.status);    
    const context = useFormikContext();
    const dispatch = useDispatch();      

    const handleFocus = (e) => {
        context.setFieldTouched("email", false);
    }

    return (
        <Form className={styles.profile}>
            <Input header="이메일" name="email" type="email" autoFocus/>
            <Input header="비밀번호" name="password" type="password"/>
            <Input header="이름" name="name"/>
            <Input header="연락처" name="contact"/>
            <Input header="주소" name="address"/>            
        </Form>
    );    
}
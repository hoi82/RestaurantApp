import React from 'react';
import ProfileInput from '../../../components/InputWithHeader/ProfileInput';
import { useDispatch } from 'react-redux';
import { updateName, validateName } from '../../../actions/register/profile';

export default function NameInput(props) {       
    const dispatch = useDispatch(); 

    const handleChange = (e) => {
        let value = e.target.value.trim();
        dispatch(updateName(value));     
    }

    const handleBlur = (e) => {
        dispatch(validateName());
    }
    
    return (
        <React.Fragment>
            <ProfileInput header="이름" type="text" value={props.name} error={props.error} onInput={handleChange} onBlur={handleBlur}/>
        </React.Fragment>
    );    
}
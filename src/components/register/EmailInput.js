import React, { Component } from 'react';
import ProfileInput from './ProfileInput';
import { connect } from "react-redux";
import { updateProfile } from '../../actions/register';
import Validator from '../../data/Validator';

class EmailInput extends Component {
    constructor(props) {
        super(props);        
    }        

    handleChange = (value) => {             
        this.props.handleEmail({email: value});                  
    }    

    render() {
        return (
            <React.Fragment>
                <ProfileInput header="이메일" type="email" value={this.props.value} onChange={this.handleChange} validator={Validator.validateEmailCallback}/>
            </React.Fragment>
        );
    }
}

let mapStateToProps = (state, props) => {      
    return {
        value: state.register.email
    };
}

let mapDispatchToProps = (dispatch) => {        
    return {
        handleEmail: (field) => dispatch(updateProfile(field))
    };    
}

EmailInput = connect(mapStateToProps, mapDispatchToProps)(EmailInput);

export default EmailInput;
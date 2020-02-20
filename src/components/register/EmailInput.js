import React, { Component } from 'react';
import ProfileInput from './ProfileInput';
import { connect } from "react-redux";
import { updateInfo } from '../../actions/register';
import Validator from '../../data/Validator';

class EmailInput extends Component {
    constructor(props) {
        super(props);        
    }    

    handleChange = (value) => {             
        this.props.handleChange({email: value});                  
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
        handleChange: (field) => dispatch(updateInfo(field))
    };    
}

EmailInput = connect(mapStateToProps, mapDispatchToProps)(EmailInput);

export default EmailInput;
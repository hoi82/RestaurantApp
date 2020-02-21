import React, { Component } from 'react';
import ProfileInput from './ProfileInput';
import Validator from '../../data/Validator';
import { updateProfile } from '../../actions/register';
import { connect } from 'react-redux';

class PasswordInput extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (value) => {
        this.props.handlePassword({password : value});
    }

    render() {
        return (
            <React.Fragment>
                <ProfileInput header="비밀번호" type="password" value={this.props.value} onChange={this.handleChange} validator={Validator.validatePasswordCallback}/>
            </React.Fragment>
        );
    }
}

let mapStateToProps = (state, props) => {
    return {
        value: state.register.password
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        handlePassword: (field) => dispatch(updateProfile(field))
    }
}

PasswordInput = connect(mapStateToProps, mapDispatchToProps)(PasswordInput);

export default PasswordInput;
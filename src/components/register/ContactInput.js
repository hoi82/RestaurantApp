import React, { Component } from 'react';
import ProfileInput from './ProfileInput';
import { updateProfile } from '../../actions/register';
import { connect } from 'react-redux';
import Validator from '../../data/Validator';

class ContactInput extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (value) => {
        this.props.handleContact({contact: value});
    }

    render() {
        return (
            <React.Fragment>
                <ProfileInput header="연락처" type="text" value={this.props.value} onChange={this.handleChange} validator={Validator.validateContactCallback}/>
            </React.Fragment>
        );
    }
}

let mapStateToProps = (state, props) => {
    return {
        value: state.register.contact
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        handleContact: (field) => dispatch(updateProfile(field))
    }
}

ContactInput = connect(mapStateToProps, mapDispatchToProps)(ContactInput);

export default ContactInput;
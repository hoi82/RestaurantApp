import React, { Component } from 'react';
import ProfileInput from './ProfileInput';
import { updateProfile } from '../../actions/register';
import { connect } from 'react-redux';
import Validator from '../../data/Validator';

class NameInput extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (value) => {
        this.props.handleName({name: value});
    }

    render() {
        return (
            <React.Fragment>
                <ProfileInput header="이름" type="text" value={this.props.value} onChange={this.handleChange} validator={Validator.validateNameCallback}/>
            </React.Fragment>
        );
    }
}

let mapStateToProps = (state, props) => {
    return {
        value: state.register.name
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        handleName : (field) => dispatch(updateProfile(field))
    }
}

NameInput = connect(mapStateToProps, mapDispatchToProps)(NameInput);

export default NameInput;
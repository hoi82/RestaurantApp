import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileInput from './ProfileInput';
import { updateProfile } from '../../actions/register';
import Validator from '../../data/Validator';

class AddressInput extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (value) => {
        this.props.handleAddr({address: value});
    }

    render() {
        return (
            <React.Fragment>
                <ProfileInput header="주소" type="text" value={this.props.value} onChange={this.handleChange} validator={Validator.validateAddressCallback}/>
            </React.Fragment>
        );
    }
}

let mapStateToProps = (state, props) => {
    return {
        value: state.register.address
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        handleAddr: (field) => dispatch(updateProfile(field))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressInput);
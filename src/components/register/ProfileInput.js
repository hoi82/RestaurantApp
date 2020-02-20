import React, { Component } from 'react';
import styles from "./ProfileInput.module.scss";

class ProfileInput extends Component {
    constructor(props) {
        super(props);   
        
        this.state = {error: ""};
    }    
    
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log("update");
    //     if (prevProps.value != this.props.value) {
    //         this.setState({error: ""});
    //     }        
    // }

    handleInput = (e) => {
        let value = e.target.value.trim();
        this.props.onChange(value);
        e.target.data = e.target.value;
        this.setState({error: ""});
    }

    handleBlur = (e) => {   
        if (e.target.data != undefined) {
            this.props.validator(this.props.value, (error) => this.setState({error: error}));
        }           
    }

    render() {
        return (            
            <div className={styles.profileInput}>
                <div className={styles.header_box}>
                    <span className={styles.header}>{this.props.header}</span>
                    <span className={styles.error_text}>{this.state.error}</span>
                </div>                    
                <input type={this.props.type} defaultValue={this.props.value} onInput={this.handleInput} onBlur={this.handleBlur}/>
            </div>
        );
    }
}

export default ProfileInput;
import React, { Component } from 'react';
import PropTypes from "prop-types";
import Profile from "./Profile";
import Payment from "./Payment";
import styles from "./Content.module.scss";

class Content extends Component {
    constructor(props) {
        super(props);                    
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.curContent != nextProps.curContent) {
            return true;
        } else {
            return false;
        }
    }

    //NOTE: setState는 비동기다!!!절대 잊지 말것!
    //순차적인 처리를 원하면 뒤쪽의 Callback property에 해당 method를 넣을것.
    // SetContent(content) {
    //     this.setState({ curContent : content }, function() {
    //         localStorage.setItem("curContent", content);
    //     });                
    // }

    RenderContent() {
        switch (this.props.curContent) {
            case "profile":
                return <div className={styles.content}><Profile userInfo={this.props.userInfo}/></div>;
                break;
            case "payment":
                return <div className={styles.content}><Payment list={this.props.userInfo.payments}/></div>;
                break;        
            default:
                return null;
                break;
        }
    }
    
    render() {
        return (
            <React.Fragment>
                {this.RenderContent()}
            </React.Fragment>            
        );
    }
}

Content.propTypes = {
    userInfo: PropTypes.object
}

export default Content;
import React, { Component } from 'react';
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
                return <div className={styles.content}><Profile userInfoChange={this.props.userInfoChange}/></div>;
                break;
            case "payment":
                return <div className={styles.content}><Payment userInfoChange={this.props.userInfoChange}/></div>;
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

export default Content;
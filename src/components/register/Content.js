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
        if (this.props.curPage != nextProps.curPage) {
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

    renderContent() {
        switch (this.props.curPage) {
            case "profile":
                return <div className={styles.content}>
                    <Profile userInfo={this.props.userInfo} userInfoChange={this.props.userInfoChange}/>
                    </div>;
                break;
            case "payment":
                return <div className={styles.content}>
                    <Payment userInfo={this.props.userInfo}/>
                    </div>;
                break;        
            default:
                return null;
                break;
        }
    }
    
    render() {
        return (
            <React.Fragment>
                {this.renderContent()}
            </React.Fragment>            
        );
    }
}

Content.propTypes = {
    userInfo: PropTypes.object,
    userInfoChange: PropTypes.func
}

export default Content;
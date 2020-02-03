import React, { Component } from 'react';
import Profile from "./Profile";
import Payment from "./Payment";

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = { curContent : "" };
        this.SetContent = this.SetContent.bind(this);
    }
    //NOTE: setState는 비동기다!!!절대 잊지 말것!
    //순차적인 처리를 원하면 뒤쪽의 Callback property에 해당 method를 넣을것.
    SetContent(content) {
        this.setState({ curContent : content },
                function() {
                    console.log(this.state.curContent);
                }
             );        
    }

    RenderContent() {
        switch (this.state.curContent) {
            case "profile":
                return <Profile/>;
                break;
            case "payment":
                return <Payment/>;
                break;        
            default:
                return null;
                break;
        }
    }
    
    render() {
        return (
            <div>
                {this.RenderContent()}
            </div>
        );
    }
}

export default Content;
import React, { Component } from 'react';
import styles from "./PaymentList.module.scss";
import PaymentItem from "./PaymentItem";

class PaymentList extends Component {
    constructor(props) {
        super(props);

        this.state = { list : this.props.list }        
    }

    RemoveItem = (index) => {
        this.state.list.splice(index, 1);
        this.forceUpdate();
    }

    //NOTE:List Render 첫번째 방법.state는 사용할수 없음
    // list = this.state.list.map((item, i) => {
    //         return (<PaymentItem info={item} key={i} onRemove={this.RemoveItem.bind(this)}/>);
    //     })

    //NOTE:List Render 두번째 방법
    renderList = () => {
        return this.state.list.map((item, i) => {
            return <PaymentItem item={item} key={i} id={i} onRemove={this.RemoveItem.bind(this)}/>
        });
    }

    render() {   
        return (            
            <div className={styles.list}> 
                {this.renderList()}
            </div>
        );
    }
}

export default PaymentList;
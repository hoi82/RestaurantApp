import React, { Component } from 'react';
import styles from "./PaymentList.module.scss";
import PaymentItem from "./PaymentItem";

class PaymentList extends Component {
    constructor(props) {
        super(props);
    }

    list = this.props.list.map((item, i) => {
            return (<PaymentItem info={item} key={i}/>);
        })

    render() {
        return (
            <div className={styles.list}> 
                {this.list}
            </div>
        );
    }
}

export default PaymentList;
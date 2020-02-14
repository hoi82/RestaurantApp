import React, { Component } from 'react';
import styles from "./PaymentList.module.scss";
import PaymentItem from "./PaymentItem";
import box from "../../image/box.svg";

class PaymentList extends Component {
    constructor(props) {
        super(props);

        this.state = { list : this.props.list }        
    }

    removeItem = (index) => {
        this.state.list.splice(index, 1);
        this.forceUpdate();
    }

    //NOTE:List Render 첫번째 방법.state는 사용할수 없음
    // list = this.state.list.map((item, i) => {
    //         return (<PaymentItem info={item} key={i} onRemove={this.RemoveItem.bind(this)}/>);
    //     })

    //NOTE:List Render 두번째 방법
    renderList = () => {
        if (this.props.list.length == 0) {
            return <div className={styles.empty_container}>
                <span className={styles.title}>저장된 결제 방법이 없어요.</span>
                <img src={box} className={styles.box_image}/>
            </div>;
        }
        else {
            return <div className={styles.item_container}>
            {
                this.state.list.map((item, i) => {
                    return <PaymentItem item={item} key={i} id={i} onRemove={this.removeItem.bind(this)}/>
                })            
            }     
            </div>;   
        }
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
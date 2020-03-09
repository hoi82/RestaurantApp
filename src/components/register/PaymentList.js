import React from 'react';
import styles from "./PaymentList.module.scss";
import box from "../../image/box.svg";
import { useSelector } from 'react-redux';

export default function PaymentList(props) {
    const list = useSelector((store) => store.payments.list);    

    //NOTE:List Render 일반적인 방법.state는 사용할수 없음
    // list = this.state.list.map((item, i) => {
    //         return (<PaymentItem info={item} key={i} onRemove={this.RemoveItem.bind(this)}/>);
    //     })    
    const renderList = () => {
        if (list.length == 0) {
            return <div className={styles.empty_container}>
                <span className={styles.title}>저장된 결제 방법이 없어요.</span>
                <img src={box} className={styles.box_image}/>
            </div>;
        }
        else {
            return <div className={styles.item_container}>
                {props.renderedList}
            </div>;   
        }
    }
    
    return (            
        <div className={styles.list}> 
            {renderList()}
        </div>
    );    
}
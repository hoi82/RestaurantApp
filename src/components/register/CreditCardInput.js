import React, { Component } from 'react';
import styles from "./CreditCardInput.module.scss";
import close from "../../image/close.svg";
import logo from "../../image/visa.svg";

class CreditCardInput extends Component {
    constructor(props) {
        super(props);        
    }

    handleNumber = (e) => {        
        if (e.metaKey || e.ctrlKey)
            return true;
        //NOTE:e.which와 e.key는 여기에서 차이가 남. key를 사용할 경우 " "로 체크해야함
        if (e.key == " ")             
            return e.preventDefault();        
        if (e.key < 33)
            return true;
        
        let input = String.fromCharCode(e.key);
        if (!(/[\d\s]/.test(input)))
            e.preventDefault();
    }

    cardNumberChange = (e) => {
        let chunk = e.target.value.substr(e.target.value.length - 4, 4);
        let count = (e.target.value.match(/[\d]{4}\s/g) || []).length;        
        if ((count < 3) && /[\d]{4}/.test(chunk))
            e.target.value = e.target.value + " ";
    }

    expireDateChange = (e) => {
        let pattern = "[\\d]{2}";
        let regex = new RegExp(pattern, "g"); 

        let chunk = e.target.value.substr(e.target.value.length - 2, 2);        
        let count = 0;
        let match;
        //NOTE:exec method는 최초 일치만 찾기 때문에 while 루프를 돌아야한다.
        //이때 regexp flag에 g(global)이 없다면 무한루프 빠지므로 주의할것.
        while ((match = regex.exec(e.target.value)) != null) {
            count++;
        }                            
        
        if ((count < 2) && regex.test(chunk))
            e.target.value = e.target.value + "/";
    }
    
    render() {
        return (
            <div className={styles.container}>                                             
                <div className={styles.num_box}>
                    <span>카드 번호</span>
                    <input type="text" className={styles.num_input} maxLength="19" placeholder="1234 1234 1234 1234" onKeyPress={this.handleNumber} onChange={this.cardNumberChange}/>
                </div>
                <div className={styles.etc_box}>
                    <div className={styles.expire_box}>
                        <span>만료일</span>
                        <input type="text" className={styles.expire_input} maxLength="5" placeholder="MM/YY" onKeyPress={this.handleNumber} onChange={this.expireDateChange}/>
                    </div>
                    <div className={styles.cvc_box}>
                        <span>CVC</span>
                        <input type="password" className={styles.cvc_input} maxLength="3"/>
                    </div>
                </div>                
                <button className={styles.add_btn}>
                    <span className={styles.add_btn_text}>저장하기</span>
                </button>
                <button className={styles.close_btn} onClick={ () => this.props.onBack("select")}>
                    <img src={close} className={styles.close_icon}/>
                </button>                
            </div>
        );
    }
}

export default CreditCardInput;
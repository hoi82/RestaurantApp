import React, { Component } from 'react';
import styles from "./CreditCardInput.module.scss";
import close from "../../image/close.svg";
import Validator from '../common/Validator';

class CreditCardInput extends Component {
    constructor(props) {
        super(props);        

        this.state = {
            cardType: "",
            numberError: "",
            expireError: "",
            nameError: ""
        }
    }

    handleNumber = (e) => {       
        var code = e.keyCode;
        
        if (code > 47 && code < 58) {
          return;
        }
        
        if (e.ctrlKey || e.metaKey || e.altKey) {
          return;
        }

        if (code === 8 || code === 9 || code === 36 || code === 35 || code === 37 ||
            code === 39 || code === 8 || code === 46) {
          return;
        }
        event.preventDefault();
    }

    handleExpire = (e) => {
        this.handleNumber(e);        
        const val = e.target.value.replace(/\D/g,"");
        
        if (val.length == 0) {
            if (e.key == "1" || e.key == "2") {
                return true;
            }
            else {

            }
        }
        else {

        }     
    }

    cardNumberChange = (e) => {
        let val = e.target.value;
        let parts = [];
        let idx = 0;

        val = val.replace(/[^0-9]/gi, "");

        for (idx = 0; idx < val.length; idx += 4) {            
            parts.push(val.substr(idx, 4));            
        }
        
        if (idx < val.length - 1) {
            parts.push(val.substr(idx, val.length - idx));
        }        

        if (parts.length > 0)
            e.target.value = parts.join(" ");        

        const result= Validator.validateCreditNumber(e.target.value);
        this.setState({cardType : result.name});
        
        e.target.data = e.target.value;
    }    

    expireDateChange = (e) => {        
        let pattern = "^(0[1-9]|1[0-2])";
        let regex = new RegExp(pattern, "g"); 
        let val = e.target.value;
        let oldval = e.target.data;

        // //NOTE:exec method는 최초 일치만 찾기 때문에 while 루프를 돌아야한다.
        // //이때 regexp flag에 g(global)이 없다면 무한루프 빠지므로 주의할것.
        // while ((match = regex.exec(e.target.value)) != null) {
        //     count++;
        // }                                    
        
        if (regex.test(val) && oldval.length <= 2) {
            e.target.value = e.target.value.slice(0,2) + "/" + e.target.value.slice(2);
        }
        
        e.target.data = e.target.value;     
    }

    cardNumberOut = (e) => {
        if (e.target.data != undefined)
        {
            const valid = Validator.validateCreditNumber(e.target.value);
            this.setState({numberError : valid.error});
        }
    }
    
    //TODO: Expire 에러메세지 표시부터
    //Profile에도 Blur시 에러메세지 표시하는걸로 변경할것.
    render() {
        return (
            <div className={styles.container}>                                             
                <div className={styles.num_box}>
                    <span>카드 번호</span>
                    <span>{this.state.numberError}</span>
                    <input type="text" className={styles.num_input} maxLength="19" placeholder="1234 1234 1234 1234" data="" 
                    onKeyDown={this.handleNumber} onChange={this.cardNumberChange} onBlur={this.cardNumberOut}/>
                </div>
                <div className={styles.etc_box}>
                    <div className={styles.expire_box}>
                        <span>만료일</span>
                        <input type="text" className={styles.expire_input} maxLength="5" placeholder="MM/YY" data="" onKeyDown={this.handleExpire} onInput={this.expireDateChange}/>
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
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from "./Nav.module.scss";

class Nav extends Component {
    constructor(props) {
        super(props);   
        
        this.state = { selected : "profile" };
    }    

    handleClick = (e) => {
        console.log(e.target.value);
        this.props.changeContent(e.target.value);
        this.setState({ selected : e.target.value });
    }

    //NOTE: onClick 이벤트에 this.func() 형태로 넣으면 함수의 리턴값을 이벤트로 설정한다는 의미이기 때문에 ()를 제거하고 써야함
    //부득이하게 파라미터를 넣을거라면 arrow function 형태로 넣을것.
    render() {
        return (
            <div className={styles.nav}>
                <div className={styles.nav_panel}/>
                <div className={styles.nav_container}>                
                    <div className={styles.item_box}>                        
                        <span className={styles.header}>필수</span>                         
                        <button value="profile" className={this.state.selected == "profile" ? styles.item_btn + " " + styles.selected : styles.item_btn} onClick={this.handleClick}>                            
                            <span className={styles.large_btn_text}>개인정보</span>
                        </button>                        
                        <span className={styles.header}>선택</span>                                            
                        <button value="payment" className={this.state.selected == "payment" ? styles.item_btn + " " + styles.selected : styles.item_btn} onClick={this.handleClick}>
                            <span className={styles.large_btn_text}>결재정보</span>
                        </button>                                                                                     
                    </div>
                    <div className={styles.register_box}>
                        <button className={styles.register_btn} onClick={this.props.onRegister}>
                            <span className={styles.medium_btn_text}>가입하기</span>
                        </button>
                        <div className={styles.button_box}>
                            <span className={styles.small_text}>계정이 있으신가요?</span>
                            <Link to={"/"}>
                                <button className={styles.link_btn}>
                                    <div className={styles.link_text}>로그인</div>
                                </button>
                            </Link>                                
                        </div>   
                    </div>
                </div>
            </div>
        );
    }
}

export default Nav;
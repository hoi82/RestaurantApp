import React, { useState, useEffect } from 'react';
import styles from "./Header.module.scss";
import Popup from '../../components/Popup';
import uk from "../../image/uk.svg";
import kr from "../../image/korea.svg";
import es from "../../image/spain.svg";
import ch from "../../image/china.svg";
import HeaderProfile from './HeaderProfile';
import classNames from "classnames/bind";
import theme from "../../theme/theme.scss";

const cx = classNames.bind(theme);

function Header(props) {

    useEffect(() => {
        document.documentElement.classList.toggle(cx("light_theme"));
    }, []);
    
    const handleClick = (e) => {         
        document.documentElement.classList.toggle(cx("light_theme"));
        document.documentElement.classList.toggle(cx("dark_theme"));
    }

    return (
        <div className={styles.header}>
            <button className={styles.test_btn} onClick={handleClick}>Theme</button>
            <HeaderProfile/>            
            <TranslateButton id="btnTranslate" className={styles.trans_btn}/>
            <Popup triggerID="btnTranslate" position={{right: "0", top: "60px"}}>
                <div>
                    <button data-closebutton={true} className={styles.language_btn}>
                        <img className={styles.flag} src={kr}/>
                        <span>Korean</span>
                    </button>
                    <button data-closebutton={true} className={styles.language_btn}>
                        <img className={styles.flag} src={uk}/>
                        <span>English</span>
                    </button>
                    <button data-closebutton={true} className={styles.language_btn}>
                        <img className={styles.flag} src={es}/>
                        <span>Spanish</span>
                    </button>
                    <button data-closebutton={true} className={styles.language_btn}>
                        <img className={styles.flag} src={ch}/>
                        <span>Chinese</span>
                    </button>
                </div>                
            </Popup>        
        </div>
    );
}

function TranslateButton({id, className}) {
    return (
        <svg id={id} className={className} enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
            <g>
                <path d="m207.386 280.048c0-4.142-3.358-7.5-7.5-7.5h-168.338c-9.125 0-16.548-7.423-16.548-16.548v-224.452c0-9.125 7.423-16.548 16.548-16.548h224.452c9.125 0 16.548 7.423 16.548 16.548v168.338c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-168.338c0-17.396-14.152-31.548-31.548-31.548h-224.452c-17.396 0-31.548 14.152-31.548 31.548v224.452c0 17.396 14.152 31.548 31.548 31.548h168.338c4.142 0 7.5-3.358 7.5-7.5z"/>
                <path d="m480.452 224.452h-64.129c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5h64.129c9.125 0 16.548 7.423 16.548 16.548v224.452c0 9.125-7.423 16.548-16.548 16.548h-224.452c-9.125 0-16.548-7.423-16.548-16.548v-224.452c0-9.125 7.423-16.548 16.548-16.548h128.259c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5h-128.259c-17.396 0-31.548 14.152-31.548 31.548v224.452c0 17.396 14.152 31.548 31.548 31.548h224.452c17.396 0 31.548-14.152 31.548-31.548v-224.452c0-17.396-14.152-31.548-31.548-31.548z"/>
                <path d="m215.919 80.161h-64.645v-8.532c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v8.532h-64.645c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5h110.446c-4.319 13.874-15.141 41.853-38.337 69.779-14.166-17.038-23.762-34.166-30.118-48.323-1.697-3.778-6.133-5.467-9.914-3.771-3.779 1.697-5.467 6.135-3.771 9.914 7.021 15.639 17.728 34.661 33.696 53.479-11.383 11.809-25.167 23.259-41.814 33.248-3.552 2.131-4.704 6.738-2.572 10.29 1.406 2.344 3.89 3.642 6.438 3.642 1.313 0 2.644-.345 3.852-1.07 17.648-10.589 32.225-22.703 44.2-35.007 12.11 12.434 26.701 24.462 44.276 35.007 1.208.725 2.539 1.07 3.852 1.07 2.548 0 5.032-1.298 6.438-3.642 2.131-3.552.979-8.159-2.572-10.29-16.676-10.005-30.473-21.447-41.88-33.265 11.789-13.878 20.436-27.488 26.589-38.914 9.956-18.49 15.043-34.033 17.292-42.148h18.189c4.142 0 7.5-3.358 7.5-7.5s-3.357-7.499-7.5-7.499z"/>
                <path d="m378.434 295.254c-1.668-4.055-5.577-6.674-9.961-6.674-.003 0-.007 0-.011 0-4.388.004-8.297 2.631-9.958 6.693-.023.056-.045.113-.067.169l-54.181 142.258c-1.474 3.871.468 8.204 4.339 9.678.879.335 1.781.493 2.668.493 3.022 0 5.871-1.84 7.01-4.833l11.654-30.599h76.701l11.54 30.578c1.463 3.875 5.788 5.832 9.665 4.369 3.875-1.462 5.832-5.79 4.369-9.665l-53.688-142.264c-.025-.067-.052-.135-.08-.203zm-42.793 102.187 32.813-86.156 32.514 86.156z"/>
                <path d="m204.387 410.323-32.064-24.048c-3.313-2.485-8.015-1.813-10.5 1.5s-1.813 8.015 1.5 10.5l14.064 10.548h-25.597c-26.806 0-48.613-21.808-48.613-48.613v-48.093c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v48.093c0 35.077 28.537 63.613 63.613 63.613h25.597l-14.064 10.548c-3.313 2.485-3.985 7.187-1.5 10.5 1.474 1.965 3.726 3 6.006 3 1.566 0 3.145-.489 4.494-1.5l32.064-24.048c1.889-1.417 3-3.639 3-6s-1.111-4.584-3-6z"/>
                <path d="m307.613 101.677 32.064 24.048c1.349 1.012 2.928 1.5 4.494 1.5 2.28 0 4.533-1.036 6.006-3 2.485-3.313 1.813-8.015-1.5-10.5l-14.064-10.548h25.597c26.806 0 48.613 21.808 48.613 48.613v48.093c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-48.093c0-35.077-28.537-63.613-63.613-63.613h-25.597l14.064-10.548c3.313-2.485 3.985-7.187 1.5-10.5-2.486-3.314-7.186-3.985-10.5-1.5l-32.064 24.048c-1.889 1.417-3 3.639-3 6s1.111 4.584 3 6z"/>
            </g>
        </svg>
    )
}

export default Header;
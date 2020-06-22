import React from 'react';
import styles from "./Header.module.scss";
import Popup from '../../components/Popup';
import translate from "../../image/translation.svg";
import uk from "../../image/uk.svg";
import kr from "../../image/korea.svg";
import es from "../../image/spain.svg";
import ch from "../../image/china.svg";
import HeaderProfile from './HeaderProfile';

function Header(props) {
    return (
        <div className={styles.header}>
            <HeaderProfile/>
            <img id="btnTranslate" className={styles.trans_btn} src={translate}/>
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

export default Header;
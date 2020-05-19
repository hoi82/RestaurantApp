import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurant } from '../../../../actions/main/details';
import { getFullAddress } from '../../../../utils/getStrings';
import styles from "./style.scss";
import favorite from "../../../../image/favorite.svg";
import share from "../../../../image/share.svg";
import gm from "../../../../image/gps.svg";
import noImage from '../../../../types/noImage';
import PanelGrid from '../../../../components/PanelGrid';
import Review from './Review';
import { showDialog } from "../../../../actions/common/dialog";
import { fetchReviews, getFormattedTimeString, getDayName, isInTime } from './utils';
import ReactHtmlParser from "react-html-parser";
import Menu from './Menu';
import { IMAGE_URL } from '../../../../config/url';
import plan from "../../../../image/plan.svg";

function Details({match}) {   
    const details = useSelector((store) => store.main.details);    
    const [reviews, setReviews] = useState([]);

    const dispatch = useDispatch(); 
    useEffect(() => {
        dispatch(fetchRestaurant(match.params.id));
        fetchReviews(match.params.id).then((data) => setReviews(data));        
    }, []);

    useEffect(() => {
        
    }, [details]);    

    const renderReview = (item, i) => {
        return <Review key={i} index={i} review={item}/>
    }

    const renderMenus = (menus) => {
        if (!menus || menus.length == 0)
            return null;

        if (menus.map) {
            return menus.map((menu, i) => (
                <Menu id={menu} key={i}/>
            ))
        }
        else {
            return null;
        }
    }

    const showGoogleMap = (e) => {
        dispatch(showDialog({
            content: "aaa"
        }))
    }

    const renderOpens = (dates) => {
        if (!dates)
            return null;        
        if (dates.time) {            
            return <div className={styles.calentdar_container}>                
                {dates.time.map((time, i) => {
                        return time.length > 0 ? <div key={i} className={styles.calendar_panel}>
                            <div style={{flex: "1"}}><span>{getDayName(i)}</span></div>
                            <div style={{flex: "2"}}>
                            {time.map((oc, j) => {                                
                                return <div key={j}>
                                    <span>{getFormattedTimeString(oc.open)}</span>
                                    <span> - </span>
                                    <span>{getFormattedTimeString(oc.close)}</span>
                                </div>
                            })}
                            </div>
                        </div> : null
                    })
                }
            </div> 
        }
        else {
            return null;
        }
    };

    return (
        <div className={styles.details}>
            <div className={styles.container}>
                <div className={styles.upper_container}>
                    <div className={styles.thumbnail_panel}>
                        <img src={details.thumbnail ? `${IMAGE_URL}/${details.thumbnail}` : `data:image/png;base64,${noImage}`}/>
                        <span className={styles.rating}>8.8/10 in 1600 reviews</span>
                    </div>                
                    <div className={styles.info_panel}>
                        <div className={styles.info_inner_panel}>
                            <span className={styles.name}>{details.name}</span>                            
                            <button><img src={favorite}/></button>
                            <button><img src={share}/></button>                        
                        </div>  
                        <div className={styles.info_inner_panel}>
                            <span className={styles.address}>{getFullAddress(details.address)}</span>
                            <button onClick={showGoogleMap}><img src={gm}/></button>
                        </div>
                        <p className={styles.hour_title}>Now <span className={styles.hour_content}>{isInTime(details.opens) ? "Opened" : "Closed"}</span></p>
                        {renderOpens(details.opens)}
                        <span></span>
                    </div>
                </div>
                <div className={styles.lower_container}>
                    <span className={styles.title}>Description</span>
                    <p className={styles.desc}>{ReactHtmlParser(details.description)}</p>
                    <span className={styles.title}>Menus</span>                    
                    { details.menus && details.menus.length > 0 ? <div className={styles.menu_panel}>
                        <div className={styles.menu_inner_panel}>
                            {renderMenus(details.menus)}
                        </div>                        
                    </div> 
                    : <div className={styles.noitem_panel}>
                        <div>
                            <img src={plan}/>
                            <span>Menus are not prepared. But we will meet them soon!</span>
                        </div>                        
                    </div> }                    
                    <div className={styles.review_title_panel}>
                        <span className={styles.title}>Reviews</span>
                        {
                            reviews.length > 0 ? <button className={styles.new_review_btn}>Write a Review</button> : null
                        }                        
                    </div>                                        
                    { reviews.length > 0 ? <div style={{height: "auto", marginTop: "24px"}}>
                        <PanelGrid config={{lockLayout: "List", showNavigator: true, layout: {list: {rows: 10}}}} items={reviews} itemRenderer={renderReview}/>
                    </div>
                    : <div className={styles.noitem_panel}>
                        <div style={{display: "flex"}}>                            
                            <span>No reviews are done. Be the first reviewer!</span>
                        </div>                            
                        <button className={styles.new_review_btn}>Write a Review</button>
                    </div> }
                </div>
            </div>            
            <footer className={styles.navigator}>
                <button>Contact</button>
                <button>Reservation</button>
                <button>Take Out</button>
                <button>Reviews</button>
            </footer>    
        </div>
    );
}

export default Details;
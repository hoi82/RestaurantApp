import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurant } from '../../../../actions/main/details';
import { getFullAddress } from '../../../../utils/getStrings';
import styles from "./style.scss";
import favorite from "../../../../image/favorite.svg";
import share from "../../../../image/share.svg";
import gm from "../../../../image/gps.svg";
import noImage from '../../../../types/noImage';
import { showDialog } from "../../../../actions/common/dialog";
import { fetchReviews, getFormattedTimeString, getDayName, isInTime } from './utils';
import ReactHtmlParser from "react-html-parser";
import { IMAGE_URL } from '../../../../config/url';
import Reviews from './Reviews';
import Menus from './Menus';
import { HashLink } from "react-router-hash-link";
import { useParams } from 'react-router';

function Details({match}) {   
    const details = useSelector((store) => store.main.details);    
    const [reviews, setReviews] = useState([]);
    const param = useParams();    

    const dispatch = useDispatch(); 
    useEffect(() => {
        dispatch(fetchRestaurant(param.id));
        fetchReviews(param.id).then((data) => setReviews(data));        
    }, []);

    useEffect(() => {
        
    }, [details]);            

    const showGoogleMap = (e) => {
        dispatch(showDialog({
            content: "aaa"
        }))
    };

    const getRatingAvg = (arr = []) => {
        if (!arr || arr.length == 0)
            return "?";

        const result = arr.reduce((acc, cur, i) => {
            return acc + cur.rating;
        }, 0);

        return (result / arr.length).toFixed(1);
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
                        <span className={styles.rating}>{`${getRatingAvg(reviews)} / 10 in ${reviews.length} reviews`}</span>
                    </div>                
                    <div className={styles.info_panel}>
                        <div className={styles.info_inner_panel}>
                            <span className={styles.name}>{details.name}</span>
                            <img src={favorite}/>
                            <img src={share}/>
                        </div>  
                        <div className={styles.info_inner_panel}>
                            <span className={styles.address}>{getFullAddress(details.address)}</span>
                            <img onClick={showGoogleMap} src={gm}/>
                        </div>
                        <p className={styles.hour_title}>Now <span className={styles.hour_content}>{isInTime(details.opens) ? "Opened" : "Closed"}</span></p>
                        {renderOpens(details.opens)}
                        <span></span>
                    </div>
                </div>
                <div className={styles.lower_container}>
                    <span className={styles.desc_title}>Description</span>
                    <p className={styles.desc}>{ReactHtmlParser(details.description)}</p>
                    <Menus menus={details.menus}/>            
                    <Reviews resid={param.id} thumbnail={details.thumbnail} id={"review"} reviews={reviews}/>
                </div>
            </div>            
            <footer className={styles.navigator}>
                <button><span>Contact</span></button>
                <button><span>Reservation</span></button>
                <button><span>Take Out</span></button>
                <HashLink smooth to={"#review"}><span>Reviews</span></HashLink>
            </footer>    
        </div>
    );
}

export default Details;
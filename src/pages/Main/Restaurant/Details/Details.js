import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantIfNeed } from '../../../../actions/main/restaurant/details';
import { getFullAddress } from '../../../../utils/getStrings';
import styles from "./style.scss";
import addFavIcon from "../../../../image/addfav.svg";
import removeFavIcon from "../../../../image/removefav.svg";
import share from "../../../../image/share.svg";
import gm from "../../../../image/gps.svg";
import noImage from '../../../../types/noImage';
import { showDialog, closeDialog } from "../../../../actions/common/dialog";
import { getFormattedTimeString, getDayName, isInTime } from '../utils';
import ReactHtmlParser from "react-html-parser";
import { IMAGE_URL, endpoint } from '../../../../config/url';
import Reviews from './Reviews';
import Menus from './Menus';
import { HashLink } from "react-router-hash-link";
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import GoogleMapReact from "google-map-react";
import close from "../../../../image/close.svg";
import marker from "../../../../image/marker.svg";
import { DialogMode } from '../../../../types/Variables';
import { fetchFavoritesIfNeed, removeFavorite, addFavorite, FAVORITES_FETCHED } from '../../../../actions/main/favorite/restaurant';
import { fetchMenusIfNeed } from '../../../../actions/main/menu';

function Marker({name}) {
    return (
        <div className={styles.marker_container}>
            <img src={marker} className={styles.marker}/>
            <span>{name}</span>
        </div>        
    )
}

function Details() {   
    const details = useSelector((store) => store.main.restaurant.details); 
    const reviews = useSelector((store) => store.main.restaurant.reviews);
    const favorites = useSelector((store) => store.main.favorite.restaurant);
    const param = useParams(); 
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRestaurantIfNeed(param.id));
        dispatch(fetchFavoritesIfNeed());
        dispatch(fetchMenusIfNeed(param.id));
    }, []);      

    const handleDialog = (e) => {
        dispatch(closeDialog());
    }

    const showGoogleMap = (e) => {
        dispatch(showDialog({
            bgimg: false,
            buttons: true,
            content: <div style={{width: "640px", height: "480px"}}>
                <GoogleMapReact center={{lat: details.address.lat, lng: details.address.lng}} defaultZoom={18} 
                options={{fullscreenControl: false}} 
                bootstrapURLKeys={{key: "AIzaSyAmHuLLFXqvW5v8hgpdO8MNYLEXirB6v9I"}}
                yesIWantToUseGoogleMapApiInternals>
                    <Marker lat={details.address.lat} lng={details.address.lng} name={details.name}/>
                </GoogleMapReact>
                <button className={styles.dialog_btn} onClick={handleDialog}>
                    <img src={close}/>
                </button>
            </div>
        }))
    };    

    const isFavorite = () => {        
        return favorites.list.filter((v) => v.id == param.id).length > 0;
    }

    const handleFavorite = (e) => {
        if (isFavorite()) {
            dispatch(removeFavorite(param.id)).then(() => {
                if (favorites.status == FAVORITES_FETCHED) {
                        dispatch(showDialog({
                        mode: DialogMode.SUCCESS,
                        bgimg: false,
                        content: "This restaurant is removed from your favorite list",                        
                    }));
                }
            });            
        }
        else {
            dispatch(addFavorite(param.id)).then(() => {
                if (favorites.status == FAVORITES_FETCHED) {
                    dispatch(showDialog({
                        mode: DialogMode.SUCCESS,
                        bgimg: false,
                        content: "Sucessfully added to your favorite list",                        
                    }));        
                }
            });            
        }        
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
                <div className={styles.name_panel}>
                    <span className={styles.name}>{details.name}</span>
                    <img src={isFavorite() ? removeFavIcon : addFavIcon} onClick={handleFavorite}/>
                    <img src={share}/>
                    <div className={styles.info_inner_panel}>
                        <span className={styles.address}>{getFullAddress(details.address)}</span>
                        <img onClick={showGoogleMap} src={gm}/>
                    </div>
                </div> 
                <div className={styles.upper_container}>                    
                    <div className={styles.thumbnail_panel}>
                        <img src={details.thumbnail ? `${IMAGE_URL}/${details.thumbnail}` : noImage}/>
                        <span className={styles.rating}>{`${reviews.reviewRating} / 10 in ${reviews.totalReviews} reviews`}</span>
                    </div>                
                    <div className={styles.info_panel}>                                                 
                        <p className={styles.hour_title}>Now <span className={styles.hour_content}>{isInTime(details.opens) ? "Opened" : "Closed"}</span></p>
                        {renderOpens(details.opens)}                      
                    </div>
                </div>
                <section className={styles.navigator}>
                    <button><span>Contact</span></button>
                    <Link to={`${endpoint.restaurantReservation}/${param.id}`}>Reservation</Link>
                    <Link to={`${endpoint.takeout}/${param.id}`}>Take Out</Link>
                    <HashLink smooth to={"#review"}><span>Reviews</span></HashLink>
                </section>
                <div className={styles.lower_container}>
                    <span className={styles.desc_title}>Description</span>
                    <p className={styles.desc}>{ReactHtmlParser(details.description)}</p>
                    <Menus restaurantID={param.id}/>            
                    <Reviews id={"review"} resid={param.id}/>
                </div>
            </div>                         
        </div>
    );
}

export default Details;
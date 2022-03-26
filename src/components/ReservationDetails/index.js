import React from 'react';
import styles from "./ReservationDetails.module.scss";
import { getFullAddress } from '../../utils/getStrings';
import { IMAGE_URL } from '../../config/url';
import noImage from '../../types/noImage';
import CloseButton from '../CloseButton';
import { useDispatch } from 'react-redux';
import { closeDialog } from '../../actions/common/dialog';
import GoogleMapReact from 'google-map-react';

function ReservationDetails(props) {
    const dispatch = useDispatch();    

    const {restaurantThumbnail, restaurantAddress, restaurantName, name, time, timezone, member, message} = props;

    const handleClick = (e) => {
        dispatch(closeDialog());
    }

    return (
        <div>
            <h2>Restaurant Information</h2>            
            <CloseButton onClick={handleClick}/>
            <div>
                <img style={{width: "24px", height: "24px"}} src={restaurantThumbnail ? `${IMAGE_URL}/${restaurantThumbnail}` : noImage}/>
                <div>
                    <h1>{restaurantName}</h1>
                    <h3>{getFullAddress(restaurantAddress)}</h3>
                </div>
                <div style={{width: "640px", height: "240px"}}>
                    <GoogleMapReact center={{lat: restaurantAddress.lat, lng: restaurantAddress.lng}} defaultZoom={18} 
                    options={{fullscreenControl: false}} 
                    bootstrapURLKeys={{key: "AIzaSyAmHuLLFXqvW5v8hgpdO8MNYLEXirB6v9I"}}
                    yesIWantToUseGoogleMapApiInternals/>
                </div>   
            </div>
            <h2>Reservation</h2>
            <h4>Name</h4>
            <span>{name}</span>
            <h4>Time</h4>
            <span>{time}</span>
            <h4>Memeber</h4>
            <span>{member}</span>
            <h4>Message</h4>
            <p>{message || "none"}</p>
        </div>
    );
}

export default ReservationDetails;
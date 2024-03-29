import React from 'react';
import styles from "./TakeoutDetails.module.scss";
import { getFullAddress } from '../../utils/getStrings';
import noImage from '../../types/noImage';
import { IMAGE_URL } from '../../config/url';
import GoogleMapReact from 'google-map-react';
import CloseButton from '../CloseButton';
import { useDispatch } from 'react-redux';
import { closeDialog } from '../../actions/common/dialog';

function Order(props) {    
    const {name, quantity, menutotalprice} = props;

    return (
        <div>
            <span>{name}</span>
            <span>{quantity}</span>
            <span>{menutotalprice}</span>
        </div>
    )
}

function TakeoutDetails(props) {    
    const dispatch = useDispatch();
    const {restaurantName, restaurantAddress, restaurantThumbnail, orders, totalprice} = props;

    console.log(props);

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
            <h2>Order</h2>
            <div>
                {orders.map((order) => (
                    <Order key={order.menuid} {...order}/>
                ))}
            </div>
            <div>
                <span>Total</span>
                <span>{totalprice}</span>
            </div>
        </div>
    );
}

export default TakeoutDetails;
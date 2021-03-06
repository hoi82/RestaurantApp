import React, { useEffect, useState, useRef } from 'react';
import styles from "./Favorites.module.scss";
import { getFullAddress } from '../../../utils/getStrings';
import { IMAGE_URL, endpoint } from '../../../config/url';
import noImage from '../../../types/noImage';
import { fetchFavorites, removeFavorite, toggleAll, toggleFavorite, removeSelectedFavorites } from '../../../actions/main/favorite/restaurant';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PanelGrid from '../../../components/PanelGrid';
import StyledCheckBox from "../../../components/StyledCheckBox";
import Popup from '../../../components/Popup';
import { Link } from 'react-router-dom';
import { showDialog } from '../../../actions/common/dialog';
import { DialogMode } from '../../../types/Variables';
import MenuButton from '../../../components/MenuButton/MenuButton';

const Restaurant = ({id, name, address, thumbnail, selected, index}) => {    
    const history = useHistory();
    const dispatch = useDispatch();
    const btnRef = useRef();

    const handleRemove = (e) => {
        dispatch(showDialog({
            mode: DialogMode.CONFIRM,
            content: "Are you sure want to remove this restaurant?",
            onConfirm: () => {
                dispatch(removeFavorite(id));
            }
        }))
    }    

    const handleToggle = (e) => {
        dispatch(toggleFavorite(index));
    }

    return (
        <div className={styles.restaurant}>
            <img className={styles.thumb} src={thumbnail ? `${IMAGE_URL}/${thumbnail}` :  noImage}/>
            <div className={styles.content_panel}>                                   
                <Link className={styles.name} to={`${endpoint.restaurantDetail.replace(":id", id)}`}>{name}</Link>
                <span>{getFullAddress(address)}</span>                
            </div>               
            <StyledCheckBox checked={selected} onChange={handleToggle}/>            
            <MenuButton ref={btnRef} className={styles.menu}/>
            <Popup trigger={btnRef} position={{top: "16px", right: "64px"}}>
                <div className={styles.menu_panel}>
                    <button onClick={handleRemove}>Remove from favorite list</button>
                    <Link to={`${endpoint.restaurantDetail.replace(":id", id)}`}>Details</Link>
                    <Link to={`${endpoint.restaurantReservation}/${id}`}>Reservation</Link>
                    <Link to={`${endpoint.takeout}/${id}`}>Take Out</Link>
                </div>
            </Popup>
        </div>
    )
};

export default function Favorites({}) {
    const [selectState, setSelectState] = useState(true);    
    const restaurants = useSelector((store) => store.main.favorite.restaurant);  
    const auth = useSelector((store) => store.auth);  
    const dispatch = useDispatch();        

    useEffect(() => {        
        if (auth.isLogin) {            
            dispatch(fetchFavorites());
        }                 
    }, [auth]);    

    const renderRestaurant = (item, index) => {
        return <Restaurant {...item} key={item.id} index={index}/>;
    }        

    const handleToggleAll = (e) => {           
        dispatch(toggleAll(selectState));
        setSelectState((prev) => !prev);
    }

    const handleRemoveSelected = (e) => {
        dispatch(removeSelectedFavorites());
    }

    const renderUserFavorite = () => {
        return (                
            restaurants.list.length > 0 ?
            <React.Fragment>
                <header className={styles.header}>
                    <button value={true} onClick={handleToggleAll}>Select All</button>
                    <button onClick={handleRemoveSelected}>Remove</button>
                </header>  
                <PanelGrid items={restaurants.list} itemRenderer={renderRestaurant} config={{lengthPerPage: 10, gap: "16px"}}/>
            </React.Fragment>            
            :        
            <div className={styles.no_result}>
                <svg className={styles.svg} enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                    <path className={styles.path} d="m300.249 245.226c-1.12-1.864-65.764-109.468-66.212-110.208-9.496-15.409-31.962-15.364-41.354.134l-66.153 110.157c-10.043 16.388 2.059 37.174 20.681 37.174h31.179c5.523 0 10-4.478 10-10s-4.477-10-10-10h-31.18c-3.033 0-5.547-3.639-3.562-6.915l66.142-110.094c1.665-2.651 5.523-2.649 7.196.016.068.113 66.134 110.148 66.201 110.256 1.83 2.971-.489 6.737-3.62 6.737h-31.179c-5.523 0-10 4.478-10 10s4.477 10 10 10h31.179c18.699-.001 30.713-20.885 20.682-37.257z"/>
                    <path className={styles.path} d="m213.389 170.735c-5.523 0-10 4.477-10 10v62.748c0 5.522 4.477 10 10 10s10-4.478 10-10v-62.748c0-5.523-4.477-10-10-10z"/>
                    <path className={styles.path} d="m213.389 266.232c-8.885 0-13.328 10.813-7.07 17.069 3.888 3.888 10.226 3.915 14.14 0 3.881-3.88 3.921-10.218 0-14.14-1.86-1.869-4.44-2.929-7.07-2.929z"/>
                    <path className={styles.path} d="m458.729 398.173-98.702-98.703c15.294-26.023 23.361-55.572 23.361-85.986 0-93.738-76.262-170-170-170s-170 76.262-170 170c0 93.737 76.262 169.999 170 169.999 30.265 0 59.688-7.993 85.62-23.145l98.777 98.778c8.14 8.139 18.961 12.621 30.472 12.621s22.332-4.482 30.472-12.621c16.802-16.803 16.802-44.141 0-60.943zm-395.34-184.69c0-82.711 67.29-150 150-150s150 67.289 150 150c0 83.001-67.344 149.999-150 149.999-82.711 0-150-67.289-150-149.999zm381.198 231.491c-4.361 4.362-10.161 6.764-16.329 6.764s-11.968-2.401-16.329-6.764l-95.936-95.937c12.259-9.29 23.205-20.126 32.697-32.62l95.896 95.898c9.005 9.004 9.005 23.655.001 32.659z"/>
                </svg>
                <span className={styles.text}>{"You have no favorite restaurants.\r\nBut you can add any restaurants to it."}</span>
            </div>
        )
    }

    return (        
        <div className={styles.favorites}>
            <span className={styles.title}>Favorite Restaurants</span>                                      
            {
                auth.isLogin ?
                renderUserFavorite()                
                :                
                <div className={styles.no_result}>   
                    <NotUser/>                 
                    <span className={styles.text}>To find your favorite restaurants, please log in.</span>
                </div>   
            }            
        </div>        
    );
}

const NotUser = () => {
    return (
        <svg className={styles.svg} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 511.999 511.999" enableBackground="new 0 0 512 512">
            <path className={styles.path} d="M418.071,297.743h-40.208H93.929c-31.846,0-57.754,25.909-57.754,57.755s25.909,57.754,57.754,57.754h33.852
                l-4.369,3.549c-5.031,4.088-7.295,10.561-5.909,16.892c1.386,6.332,6.147,11.268,12.426,12.879l2.269,0.583l-11.198,43.629
                c-1.373,5.35,1.851,10.799,7.2,12.172l34.009,8.729c0.819,0.211,1.654,0.314,2.486,0.314c1.776,0,3.537-0.474,5.091-1.393
                c2.283-1.351,3.936-3.553,4.595-6.121l11.199-43.631l2.269,0.583c6.279,1.611,12.828-0.421,17.092-5.304
                c4.264-4.882,5.396-11.645,2.956-17.649l-10.257-25.233h180.223h40.208v0.001c31.846,0,57.754-25.908,57.754-57.754
                S449.915,297.743,418.071,297.743z M134.364,438.712l-0.004,0.015c0.002-0.006,0.003-0.013,0.005-0.019
                C134.364,438.71,134.364,438.711,134.364,438.712z M182.116,439.318c-2.921-0.752-5.959-0.32-8.556,1.216
                c-2.596,1.535-4.438,3.989-5.186,6.907l-10.879,42.387l-14.638-3.758l10.878-42.382c0.751-2.922,0.319-5.961-1.218-8.558
                c-1.537-2.596-3.992-4.438-6.906-5.182l-5.064-1.301l18.953-15.396l12.441-10.106l4.108,10.106l11.123,27.364L182.116,439.318z
                M367.862,393.252H189.51l-4.126-10.15c-1.194-2.936-3.708-5.133-6.778-5.92c-3.072-0.79-6.332-0.075-8.792,1.924L152.4,393.252
                H93.929c-20.818,0-37.754-16.937-37.754-37.754c0-20.818,16.937-37.755,37.754-37.755h273.934V393.252z M418.071,393.252h-30.208
                v-75.509h30.208c20.818,0,37.754,16.937,37.754,37.755C455.824,376.315,438.887,393.252,418.071,393.252z"/>
            <path className={styles.path} d="M423.868,332.589c-3.425-4.332-9.714-5.069-14.046-1.642c-4.333,3.425-5.067,9.714-1.642,14.046l6.735,8.519
                l-6.735,8.519c-3.425,4.332-2.69,10.621,1.642,14.046c1.836,1.452,4.023,2.156,6.195,2.156c2.953-0.001,5.877-1.302,7.851-3.798
                l11.64-14.721c2.875-3.635,2.875-8.77,0-12.404L423.868,332.589z"/>
            <path className={styles.path} d="M96.979,359.319c0.25,0.61,0.56,1.19,0.92,1.73c0.37,0.55,0.79,1.06,1.25,1.52c0.46,0.461,0.97,0.881,1.52,1.24
                c0.54,0.36,1.12,0.67,1.72,0.92c0.61,0.25,1.23,0.44,1.87,0.57c0.65,0.13,1.3,0.2,1.96,0.2c0.65,0,1.3-0.07,1.95-0.2
                c0.64-0.13,1.27-0.32,1.87-0.57c0.6-0.25,1.19-0.56,1.73-0.92c0.54-0.359,1.06-0.779,1.52-1.24c0.46-0.46,0.88-0.97,1.24-1.52
                c0.36-0.54,0.67-1.12,0.92-1.73c0.25-0.6,0.44-1.229,0.57-1.869c0.13-0.641,0.2-1.301,0.2-1.95c0-0.65-0.07-1.311-0.2-1.96
                c-0.13-0.63-0.32-1.26-0.57-1.87c-0.25-0.601-0.56-1.18-0.92-1.72c-0.36-0.551-0.78-1.061-1.24-1.521
                c-0.46-0.46-0.98-0.88-1.52-1.25c-0.54-0.36-1.13-0.67-1.73-0.92c-0.6-0.25-1.23-0.44-1.87-0.57c-3.25-0.649-6.7,0.41-9.02,2.74
                c-0.46,0.46-0.88,0.97-1.25,1.521c-0.36,0.54-0.67,1.119-0.92,1.72c-0.25,0.61-0.44,1.24-0.57,1.87
                c-0.13,0.649-0.19,1.31-0.19,1.96c0,0.649,0.06,1.31,0.19,1.95S96.729,358.72,96.979,359.319z"/>
            <path className={styles.path} d="M150.16,359.319c0.25,0.61,0.56,1.19,0.92,1.73c0.37,0.55,0.79,1.06,1.25,1.52c0.46,0.461,0.97,0.881,1.52,1.24
                c0.54,0.36,1.12,0.67,1.72,0.92c0.61,0.25,1.24,0.44,1.87,0.57c0.65,0.13,1.31,0.2,1.96,0.2s1.31-0.07,1.95-0.2
                c0.64-0.13,1.27-0.32,1.87-0.57c0.61-0.25,1.19-0.56,1.73-0.92c0.55-0.359,1.06-0.779,1.52-1.24c0.46-0.46,0.88-0.97,1.24-1.52
                c0.36-0.54,0.67-1.12,0.92-1.73c0.25-0.6,0.44-1.229,0.57-1.869c0.13-0.641,0.2-1.301,0.2-1.95c0-0.65-0.07-1.311-0.2-1.96
                c-0.13-0.63-0.32-1.26-0.57-1.87c-0.25-0.601-0.56-1.18-0.92-1.72c-0.36-0.551-0.78-1.061-1.24-1.521
                c-2.32-2.33-5.77-3.39-9.03-2.74c-0.63,0.13-1.26,0.32-1.87,0.57c-0.6,0.25-1.18,0.56-1.72,0.92c-0.55,0.37-1.06,0.79-1.52,1.25
                c-0.46,0.46-0.88,0.97-1.25,1.521c-0.36,0.54-0.67,1.119-0.92,1.72c-0.25,0.61-0.44,1.24-0.57,1.87
                c-0.13,0.649-0.19,1.31-0.19,1.96c0,0.649,0.06,1.31,0.19,1.95S149.91,358.72,150.16,359.319z"/>
            <path className={styles.path} d="M203.349,359.319c0.25,0.61,0.56,1.19,0.92,1.73c0.36,0.55,0.78,1.06,1.24,1.52c0.46,0.461,0.97,0.881,1.52,1.24
                c0.54,0.36,1.12,0.67,1.73,0.92c0.6,0.25,1.23,0.44,1.87,0.57c0.64,0.13,1.3,0.2,1.95,0.2c0.65,0,1.31-0.07,1.95-0.2
                s1.27-0.32,1.87-0.57c0.61-0.25,1.19-0.56,1.73-0.92c0.55-0.359,1.06-0.779,1.52-1.24c0.46-0.46,0.88-0.97,1.24-1.52
                c0.36-0.54,0.67-1.12,0.92-1.73c0.25-0.6,0.44-1.229,0.57-1.869c0.13-0.641,0.2-1.301,0.2-1.95c0-0.65-0.07-1.311-0.2-1.96
                c-0.12-0.63-0.32-1.26-0.57-1.87c-0.25-0.601-0.56-1.18-0.92-1.72c-0.36-0.551-0.78-1.061-1.24-1.521
                c-2.32-2.33-5.78-3.39-9.02-2.74c-0.64,0.13-1.27,0.32-1.88,0.57c-0.6,0.25-1.18,0.56-1.72,0.92c-0.55,0.37-1.06,0.79-1.52,1.25
                c-0.46,0.46-0.88,0.97-1.24,1.521c-0.36,0.54-0.67,1.119-0.92,1.72c-0.25,0.61-0.45,1.24-0.57,1.87
                c-0.13,0.649-0.2,1.31-0.2,1.96c0,0.649,0.07,1.31,0.2,1.95C202.899,358.09,203.099,358.72,203.349,359.319z"/>
            <path className={styles.path} d="M256.53,359.319c0.25,0.61,0.56,1.19,0.92,1.73c0.36,0.55,0.78,1.06,1.24,1.52c0.46,0.461,0.97,0.881,1.52,1.24
                c0.54,0.36,1.12,0.67,1.73,0.92c0.6,0.25,1.23,0.44,1.87,0.57c0.64,0.13,1.3,0.2,1.95,0.2s1.31-0.07,1.95-0.2
                s1.27-0.32,1.87-0.57c0.61-0.25,1.19-0.56,1.73-0.92c0.55-0.359,1.06-0.779,1.52-1.24c0.46-0.46,0.88-0.97,1.24-1.52
                c0.36-0.54,0.67-1.12,0.92-1.73c0.25-0.6,0.45-1.229,0.57-1.869c0.13-0.641,0.2-1.301,0.2-1.95c0-0.65-0.07-1.311-0.2-1.96
                c-0.12-0.63-0.32-1.26-0.57-1.87c-0.25-0.601-0.56-1.18-0.92-1.72c-0.36-0.551-0.78-1.061-1.24-1.521
                c-2.32-2.33-5.78-3.39-9.02-2.74c-0.64,0.13-1.27,0.32-1.87,0.57c-0.61,0.25-1.19,0.56-1.73,0.92c-0.55,0.37-1.06,0.79-1.52,1.25
                c-0.46,0.46-0.88,0.97-1.24,1.521c-0.36,0.54-0.67,1.119-0.92,1.72c-0.25,0.61-0.44,1.24-0.57,1.87
                c-0.13,0.649-0.2,1.31-0.2,1.96c0,0.649,0.07,1.31,0.2,1.95C256.09,358.09,256.28,358.72,256.53,359.319z"/>
            <path className={styles.path} d="M309.71,359.319c0.25,0.61,0.56,1.19,0.92,1.73c0.36,0.55,0.78,1.06,1.24,1.52c0.46,0.461,0.97,0.881,1.52,1.24
                c0.54,0.36,1.12,0.67,1.73,0.92c0.6,0.25,1.23,0.44,1.87,0.57c0.64,0.13,1.3,0.2,1.95,0.2s1.31-0.07,1.96-0.2
                c0.63-0.13,1.26-0.32,1.87-0.57c0.6-0.25,1.18-0.56,1.72-0.92c0.55-0.359,1.06-0.779,1.52-1.24c0.46-0.46,0.88-0.97,1.25-1.52
                c0.36-0.54,0.67-1.12,0.92-1.73c0.25-0.6,0.44-1.229,0.57-1.869c0.13-0.641,0.19-1.301,0.19-1.95c0-0.65-0.06-1.311-0.19-1.96
                c-0.13-0.63-0.32-1.26-0.57-1.87c-0.25-0.601-0.56-1.18-0.92-1.72c-0.37-0.551-0.79-1.061-1.25-1.521
                c-0.46-0.46-0.97-0.88-1.52-1.25c-0.54-0.36-1.12-0.67-1.72-0.92c-0.61-0.25-1.24-0.44-1.87-0.57c-1.29-0.26-2.62-0.26-3.91,0
                c-0.64,0.13-1.27,0.32-1.87,0.57c-0.61,0.25-1.19,0.56-1.73,0.92c-0.55,0.37-1.06,0.79-1.52,1.25
                c-0.46,0.46-0.88,0.97-1.24,1.521c-0.36,0.54-0.67,1.119-0.92,1.72c-0.25,0.61-0.44,1.24-0.57,1.87
                c-0.13,0.649-0.2,1.31-0.2,1.96c0,0.649,0.07,1.31,0.2,1.95S309.46,358.72,309.71,359.319z"/>
            <path className={styles.path} d="M168.259,252.763c0.245,0.233,0.498,0.459,0.768,0.668c22.963,17.766,50.111,27.821,78.925,29.321
                c0.205,0.011,0.411,0.021,0.616,0.031c0.914,0.044,1.831,0.078,2.748,0.105c0.27,0.008,0.54,0.018,0.81,0.025
                c1.131,0.026,2.263,0.043,3.399,0.043c1.142,0,2.281-0.017,3.419-0.043c0.26-0.006,0.518-0.016,0.777-0.024
                c0.94-0.027,1.877-0.062,2.813-0.107c0.18-0.009,0.359-0.018,0.538-0.028c29.286-1.515,56.797-11.843,79.972-30.112
                c0.318-0.251,0.617-0.522,0.899-0.806C376.267,225.885,397,186.061,397,141.479C397.001,63.467,333.535,0,255.525,0
                S114.046,63.467,114.046,141.478C114.046,186.591,135.27,226.839,168.259,252.763z M268.515,262.259
                c-0.62,0.065-1.241,0.125-1.863,0.181c-0.688,0.063-1.375,0.126-2.066,0.177c-1.199,0.087-2.401,0.157-3.607,0.209
                c-0.413,0.019-0.826,0.033-1.24,0.047c-1.401,0.047-2.805,0.081-4.215,0.081c-1.392,0-2.778-0.033-4.162-0.079
                c-0.408-0.014-0.815-0.029-1.221-0.046c-1.151-0.05-2.298-0.116-3.443-0.197c-0.666-0.048-1.33-0.106-1.993-0.165
                c-0.718-0.063-1.435-0.131-2.151-0.206c-0.799-0.085-1.597-0.173-2.392-0.274c-0.141-0.018-0.281-0.039-0.422-0.057
                c-20.159-2.627-38.78-10.213-54.596-21.493v-18.105c0-23.827,11.834-44.928,29.92-57.779
                c11.304,8.834,25.509,14.119,40.934,14.119s29.631-5.284,40.934-14.119c18.086,12.851,29.92,33.952,29.92,57.779v17.412h0.001
                C310.113,251.929,290.157,259.948,268.515,262.259z M255.525,20c66.983,0,121.478,54.494,121.478,121.478
                c0,30.622-11.394,58.63-30.159,80.018c-0.265-29.199-14.371-55.15-36.064-71.597c7.453-10.756,11.835-23.793,11.835-37.841
                c0-3.305-0.245-6.629-0.729-9.88c-0.813-5.462-5.897-9.231-11.363-8.419c-5.463,0.813-9.232,5.899-8.419,11.362
                c0.339,2.279,0.511,4.613,0.511,6.937c0,10.303-3.366,19.832-9.048,27.557c-4.61,6.268-10.747,11.341-17.859,14.673
                c-5.99,2.807-12.667,4.385-19.707,4.385c-7.04,0-13.717-1.578-19.707-4.385c-7.112-3.332-13.249-8.405-17.859-14.673
                c-5.682-7.725-9.048-17.253-9.048-27.557c0-25.703,20.911-46.614,46.614-46.614c3.538,0,7.061,0.396,10.473,1.179
                c5.389,1.239,10.749-2.129,11.982-7.513c1.234-5.383-2.129-10.747-7.512-11.981c-4.875-1.118-9.903-1.685-14.942-1.685
                c-36.731,0-66.614,29.883-66.614,66.614c0,14.048,4.382,27.085,11.835,37.841c-21.901,16.604-36.075,42.893-36.075,72.433v0.222
                c-19.326-21.518-31.101-49.946-31.101-81.076C134.046,74.494,188.541,20,255.525,20z"/>
            <path className={styles.path} d="M288.259,77.37c0.25,0.6,0.56,1.18,0.92,1.72c0.36,0.55,0.78,1.06,1.24,1.52c0.46,0.471,0.97,0.881,1.52,1.25
                c0.54,0.36,1.12,0.671,1.73,0.921c0.6,0.25,1.23,0.439,1.87,0.569s1.3,0.19,1.95,0.19s1.31-0.061,1.95-0.19
                c0.64-0.13,1.27-0.319,1.88-0.569c0.6-0.25,1.18-0.561,1.72-0.921c0.55-0.369,1.06-0.779,1.52-1.25
                c0.46-0.46,0.88-0.97,1.24-1.52c0.36-0.54,0.67-1.12,0.92-1.72c0.25-0.61,0.45-1.23,0.57-1.87c0.13-0.65,0.2-1.3,0.2-1.96
                c0-0.65-0.07-1.311-0.2-1.95c-0.12-0.64-0.32-1.271-0.57-1.87s-0.56-1.189-0.92-1.729c-0.36-0.551-0.78-1.061-1.24-1.521
                c-0.46-0.46-0.97-0.88-1.52-1.24c-0.54-0.359-1.12-0.67-1.72-0.92c-0.61-0.25-1.24-0.439-1.88-0.569
                c-1.29-0.261-2.61-0.261-3.9,0c-0.64,0.13-1.27,0.319-1.87,0.569c-0.61,0.25-1.19,0.561-1.73,0.92
                c-0.55,0.36-1.06,0.78-1.52,1.24c-0.46,0.46-0.88,0.97-1.24,1.521c-0.36,0.54-0.67,1.13-0.92,1.729s-0.44,1.23-0.57,1.87
                c-0.13,0.64-0.2,1.3-0.2,1.95c0,0.66,0.07,1.31,0.2,1.96C287.819,76.14,288.009,76.76,288.259,77.37z"/>
        </svg>
    )
}
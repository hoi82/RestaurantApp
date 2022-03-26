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
import NotLogin from '../../../components/NotLogin';
import NoResult from "../../../components/NoResult";

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
            <NoResult/>
        )
    }

    return (        
        <div className={styles.favorites}>
            <h2 className={styles.title}>Favorite Restaurants</h2>
            {
                auth.isLogin ?
                renderUserFavorite()                
                :                
                <NotLogin content="To find your favorite restaurants, please log in."/>                
            }            
        </div>        
    );
}
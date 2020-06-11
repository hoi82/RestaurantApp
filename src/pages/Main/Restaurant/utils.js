import axios from "axios"
import { axiosConfig } from "../../../config/url";
import moment from "moment-timezone";

const REVIEW_URL = "http://localhost:3005/api/restaurant/_ID/reviews";
const USER_NAME_URL = "http://localhost:3005/api/user/_ID/name";
const MENU_URL = "http://localhost:3005/api/menu";
const RESTAURANT_THUMBNAIL_URL = "http://localhost:3005/api/restaurant/thumbnail";
const REVIEW_ACTION_URL = "http://localhost:3005/api/review";
const RESERVATION_URL = "http://localhost:3005/api/reservation";
const FAVORITE_URL = "http://localhost:3005/api/favorite/restaurant";
const FAVORITE_LIST = "http://localhost:3005/api/favorite/restaurants";

export const fetchReviews = (resID, errcb) => {
    return new Promise((resolve, reject) => {
        axios.get(REVIEW_URL.replace("_ID", resID), axiosConfig).then((res) => {        
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        })
    })    
}

export const fetchUserName = (userID, errcb) => {
    return axios.get(USER_NAME_URL.replace("_ID", userID), axiosConfig).then((res) => {
        return res.data;
    }).catch((err) => {
        errcb(err);
    });
}

export const fetchMenu = (menuID) => {
    return axios.get(`${MENU_URL}/${menuID}`, axiosConfig).then((res) => {
        return res.data;
    }).catch((err) => {

    });
}

export const ISODateToString = (iso) => {
    if (!iso) return null;

    const date = new Date(iso);
    const today = new Date();
    if (date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() && date.getDate() == today.getDate()) {
        return "today";
    }
    else {
        const gap = (today.getTime() - date.getTime()) / (1000 * 3600 * 24);        
        switch (Math.round(gap)) {
            case 0:
                return "yesterday";
            case 1:
                return "yesterday";
            case 2:
                return "2 days before";
            default:
                return date.toLocaleDateString();
        }
    }
}

const getCurrnetLocale = () => {
    var language;
    if (window.navigator.languages) {
        language = window.navigator.languages[0];
    } else {
        language = window.navigator.userLanguage || window.navigator.language;
    }
    return language;
}

export const getFormattedTimeString = (format = {}) => {        
    return moment(format).locale(moment.locale()).format("LT");
}

export const getDayName = (index) => {    
    var date = new Date(2020, 5, 14 + index);
    return new Intl.DateTimeFormat(getCurrnetLocale(), {weekday: "short"}).format(date);    
}

export const isInTime = (date) => {    
    if (!date) return false;
    const now = new Date();
    const standard = new Date(new Date().setHours(0,0));    
    const ocArr = date.time[now.getDay()];    

    for (let i = 0; i < ocArr.length; i++) {
        const oc = ocArr[i];        
        const thereOpen = moment().tz(date.timezone).set({hour: oc.open.hour, minute: oc.open.minute}).unix();
        const thereClose = moment().tz(date.timezone).set({hour: oc.close.hour, minute: oc.close.minute}).unix();                
        
        const nowTime = moment().unix();        

        if (nowTime >= thereOpen && nowTime < thereClose) {            
            return true;
        }        
    }        
    return false;
}

export const fetchRestaurantThumbnail = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${RESTAURANT_THUMBNAIL_URL}/${id}`, axiosConfig).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        })
    })    
}

export const uploadReview = (review) => {    
    return new Promise((resolve, reject) => {
        axios.post(REVIEW_ACTION_URL, review, axiosConfig).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}

export const editReview = (review) => {
    return new Promise((resolve, reject) => {
        axios.patch(REVIEW_ACTION_URL, review, axiosConfig).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    });
}

export const deleteReview = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(REVIEW_ACTION_URL, Object.assign({}, axiosConfig, {data: { id }})).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}

export const fetchReservationInfo = (resid, date) => {    
    return new Promise((resolve, reject) => {                
        axios.get(`${RESERVATION_URL}/${resid}/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`, 
        axiosConfig).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export const createReservation = (info) => {
    return new Promise((resolve, reject) => {
        axios.post(RESERVATION_URL, info, axiosConfig).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export const fetchReservation = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${RESERVATION_URL}/${id}`, axiosConfig).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export const addFavorite = (resid) => {
    return new Promise((resolve, reject) => {
        axios.post(`${FAVORITE_URL}`, {
            resid: resid
        }, axiosConfig).then((res) => {
            resolve(res.data);
        }).catch((err) => {                        
            reject(err.response.data);
        });
    })
}

export const removeFavorite = (resid) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${FAVORITE_URL}/${resid}`, axiosConfig).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export const getRestaurantIsFavorite = (resid) => {
    return new Promise((resolve, reject) => {
        axios.get(`${FAVORITE_URL}/${resid}`, axiosConfig).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export const getFavoriteRestaurants = () => {
    return new Promise((resolve, reject) => {
        axios.get(FAVORITE_LIST, axiosConfig).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        })
    })
}
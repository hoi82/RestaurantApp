import axios from "axios"

const REVIEW_URL = "http://localhost:3005/api/restaurant/_ID/reviews";
const USER_NAME_URL = "http://localhost:3005/api/user/_ID/name";
const MENU_URL = "http://localhost:3005/api/menu";

export const fetchReviews = (resID, errcb) => {
    return axios.get(REVIEW_URL.replace("_ID", resID), {
        headers: {                
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        withCredentials: true
    }).then((res) => {        
        return res.data;
    }).catch((err) => {
        errcb(err);
    })
}

export const fetchUserName = (userID, errcb) => {
    return axios.get(USER_NAME_URL.replace("_ID", userID), {
        headers: {                
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        withCredentials: true
    }).then((res) => {
        return res.data;
    }).catch((err) => {
        errcb(err);
    });
}

export const fetchMenu = (menuID) => {
    return axios.get(`${MENU_URL}/${menuID}`, {
        headers: {                
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        withCredentials: true
    }).then((res) => {
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
    if (!format.map || format.length != 2) 
        return null;    
        
    // const form = new Intl.NumberFormat(getCurrnetLocale(), {minimumIntegerDigits: 2});
    // return `${form.format(format[0])}:${form.format(format[1])}`;

    var date = new Date(2000, 1, 1, format[0], format[1]);    
    return new Intl.DateTimeFormat(getCurrnetLocale(), {minute: "2-digit", hour: "2-digit" }).format(date);
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
        const thereOpen = new Date(standard.getTime() + ((now.getTimezoneOffset() - date.timezone) * 60 * 1000) + (oc.open[0] * 1000 * 60 * 60) + (oc.open[1] * 1000 * 60));
        const thereClose = new Date(standard.getTime() + ((now.getTimezoneOffset() - date.timezone) * 60 * 1000) + (oc.close[0] * 1000 * 60 * 60) + (oc.close[1] * 1000 * 60)); 
        
        const thereOpenTime = thereOpen.getHours() * 60 + thereOpen.getMinutes();
        const thereCloseTime = thereClose.getHours() * 60 + thereClose.getMinutes();
        const nowTime = now.getHours() * 60 + now.getMinutes();

        if (nowTime >= thereOpenTime && nowTime < thereCloseTime) {
            return true;
        }        
    }        
    return false;
}
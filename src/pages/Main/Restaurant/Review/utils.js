import axios from "axios";

const RESTAURANT_THUMBNAIL_URL = "http://localhost:3005/api/thumbnail/restaurant";
const UPLOAD_REVIEW = "http://localhost:3005/api/review";

export const fetchRestaurantThumbnail = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${RESTAURANT_THUMBNAIL_URL}/${id}`, {
            headers: {                
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            withCredentials: true
        }).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        })
    })    
}

export const uploadReview = (review) => {    
    return new Promise((resolve, reject) => {
        axios.post(UPLOAD_REVIEW, review, {
            headers: {                
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            withCredentials: true
        }).then((res) => {
            resolve(res);
        }).catch((err) => {
            resolve(err);
        })
    })
}
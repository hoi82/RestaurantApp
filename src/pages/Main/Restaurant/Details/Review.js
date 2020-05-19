import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import styles from "./style.scss";
import { fetchUserName, ISODateToString } from './utils';
import Ratings from "react-ratings-declarative";

function Review({review}) {
    const [userName, setUserName] = useState("");
    const [fold, setFold] = useState(true);
    //const history = useHistory();    

    useEffect(() => {
        fetchUserName(review.userID).then((name) => setUserName(name));
    }, []);

    const handleUnfold = () => {
        setFold(false);
    };

    const handleFold = () => {
        setFold(true);
    };

    const injectFold = (str="") => {
        if (!str) return null;                
        const split = str.match(/.{1,500}/g);
        if (split.length > 1) {
            split[1] = <React.Fragment>
                <span className={fold ? null : styles.non_display}>...</span>
                <button className={fold ? null : styles.non_display} onClick={handleUnfold}>read more</button>
                <span className={fold ? styles.non_display : null}>{split[1]}</span>
                <button className={fold ? styles.non_display : null} onClick={handleFold}>read less</button>
            </React.Fragment>
        }
        return split;
    }
    
    return (
        <div className={styles.review}>
            <div className={styles.user_panel}>
                {/* <img className={styles.profileImage}/> */}
                <span className={styles.userName}>{userName}</span>
            </div>
            <div className={styles.content}>
                <div className={styles.info_panel}>
                    <Ratings rating={review.rating} widgetDimensions="20px" svgIconViewBoxes="0 0 32 32" widgetSpacings="0px"
                        svgIconPaths="M32.143,12.403c-0.494-1.545-3.213-1.898-6.092-2.279c-1.578-0.207-3.371-0.441-3.912-0.842   c-0.545-0.398-1.305-2.035-1.977-3.482c-1.222-2.631-2.379-5.113-3.997-5.117l-0.03-0.005c-1.604,0.027-2.773,2.479-4.016,5.082   c-0.685,1.439-1.464,3.07-2.007,3.465C9.563,9.616,7.77,9.836,6.187,10.028c-2.876,0.35-5.599,0.678-6.107,2.215   s1.479,3.426,3.585,5.422c1.156,1.098,2.465,2.342,2.671,2.982s-0.143,2.416-0.448,3.977c-0.558,2.844-1.085,5.537,0.219,6.5   c0.312,0.223,0.704,0.336,1.167,0.326c1.331-0.021,3.246-1.057,5.097-2.061c1.387-0.758,2.96-1.613,3.66-1.621   c0.677,0,2.255,0.879,3.647,1.654c1.893,1.051,3.852,2.139,5.185,2.117c0.416-0.006,0.771-0.113,1.061-0.322   c1.312-0.945,0.812-3.637,0.285-6.492c-0.29-1.564-0.615-3.344-0.41-3.984c0.212-0.637,1.536-1.865,2.703-2.955   C30.627,15.809,32.633,13.948,32.143,12.403z">
                        <Ratings.Widget/>
                        <Ratings.Widget/>
                        <Ratings.Widget/>
                        <Ratings.Widget/>
                        <Ratings.Widget/>
                        <Ratings.Widget/>
                        <Ratings.Widget/>
                        <Ratings.Widget/>
                        <Ratings.Widget/>
                        <Ratings.Widget/>
                    </Ratings>
                    <span className={styles.date}>{`reviewed ${ISODateToString(review.created)}`}</span>
                </div>
                <span className={styles.review_title}>{review.title}</span>
                <p className={styles.comment}>{injectFold(review.comment)}</p>
            </div>
        </div>
    );
}

export default Review;
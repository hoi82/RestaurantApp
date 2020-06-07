import React, { useState, useEffect } from 'react';
import NormalInput from "../../../../components/InputWithHeader/NormalInput";
import Ratings from 'react-ratings-declarative';
import styles from "./NewReview.module.scss";
import { useParams, useLocation, useHistory } from 'react-router';
import { getFullAddress } from '../../../../utils/getStrings';
import { fetchRestaurantThumbnail, uploadReview, editReview } from '../utils';
import { IMAGE_URL, endpoint } from '../../../../config/url';
import { ErrorMessages } from '../../../../types/ErrorMessages';
import { useDispatch } from 'react-redux';
import { showDialog } from "../../../../actions/common/dialog";
import { DialogMode } from '../../../../types/Variables';
import noImage from '../../../../types/noImage';

export default function NewReview() {       
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [restaurant, setRestaurant] = useState({});
    const [forceUpdate, setForceUpdate] = useState(false);
    const [ratingError, setRatingError] = useState("");
    const [commentError, setCommentError] = useState("");
    const param = useParams();
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {        
        const { review } = location.state ? location.state : {};        

        if (review) {
            setRating(review.rating);
            setTitle(review.title);
            setComment(review.comment);
        }

        fetchRestaurantThumbnail(param.resid).then((res) => {
            setRestaurant(res);
        })                
    }, []);

    useEffect(() => {
        if (forceUpdate) {
            if (rating == 0) {
                setRatingError(ErrorMessages.EMPTY_TEXT);
            }

            if (comment.trim() == "") {
                setCommentError(ErrorMessages.EMPTY_TEXT);
            }
        }
    }, [forceUpdate])

    const handleRating = (rating) => {
        setRating(rating);
        setRatingError("");
    }

    const handleCommentFocus = (e) => {
        setCommentError("");
    }

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    }

    const handleCommentBlur = (e) => {
        setCommentError(comment.trim().length < 50 ? ErrorMessages.EMPTY_TEXT : "");
    }    

    const validation = () => {
        if (rating != 0 && title.trim() != "" && comment.trim().length >= 50) {
            return true;
        }
        else {
            return false;
        }
    }    

    const handleSubmit = (e) => {
        e.preventDefault();
        setForceUpdate(true);
        
        if (validation()) {
            if (location.state) {                
                editReview({
                    id: param.id,                     
                    resId: param.resId,
                    rating: rating,
                    title: title,
                    comment: comment                                 
                }).then((res) => {
                    dispatch(showDialog({
                        mode: DialogMode.SUCCESS,
                        content: "수정되었습니다.",
                        onClose: () => {
                            history.push(`${endpoint.restaurantDetail}/${param.resid}`);
                        }
                    }))
                }).catch((err) => {
                    dispatch(showDialog({
                        content: "에러가 발생했습니다."
                    }))
                });
            }
            else {
                uploadReview({
                    resId: param.resid,
                    rating: rating, 
                    title: title,
                    comment: comment
                }).then((res) => {
                    dispatch(showDialog({
                        mode: DialogMode.SUCCESS,
                        content: "등록되었습니다.",
                        onClose: () => {
                            history.push(`${endpoint.restaurantDetail}/${param.resid}`);
                        }
                    }))
                }).catch((err) => {
                    dispatch(showDialog({
                        content: "에러가 발생했습니다."
                    }))
                });
            }          
        }        
    }    

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    return (
        <div className={styles.newreview}>
            <form className={styles.container} onSubmit={handleSubmit}>
                {/* <span className={styles.main_title}>New Review</span> */}
                <header className={styles.res_profile}>
                    <img src={restaurant.thumbnail ? `${IMAGE_URL}/${restaurant.thumbnail}` : noImage}/>
                    <div>
                        <span className={styles.name}>{restaurant.name}</span>
                        <span className={styles.address}>{getFullAddress(restaurant.address)}</span>
                    </div>
                </header>
                <div>
                    <div style={{display: "flex", marginBottom: "8px"}}>
                        <span className={styles.comment_title}>평가</span>
                        <span className={styles.error_title}>{ratingError}</span>
                    </div>                    
                    <Ratings rating={rating} changeRating={handleRating} widgetDimensions="20px" svgIconViewBoxes="0 0 32 32" widgetSpacings="0px"
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
                </div>                
                <div className={styles.input_container}>
                    <NormalInput header="제목" value={title} onChange={handleTitleChange} forceUpdate={forceUpdate}/>
                </div> 
                <div className={styles.comment_box}>
                    <div className={styles.comment_container}>
                        <div style={{display: "flex"}}>
                            <span className={styles.comment_title}>내용</span>
                            <span className={styles.error_title}>{commentError}</span>
                        </div>                        
                        <span className={styles.comment_title}>{`${comment.length}/50`}</span>
                    </div>                
                    <textarea className={styles.comment_textbox} value={comment} onFocus={null} onChange={handleCommentChange} onBlur={handleCommentBlur} onFocus={handleCommentFocus} spellCheck={false} minLength={50}/>
                </div>                
                <button className={styles.commit_btn}>{location.state ? "리뷰 수정하기" : "리뷰 등록하기"}</button>
            </form>            
        </div>
    );
}
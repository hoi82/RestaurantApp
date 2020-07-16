import React, { useState, useEffect } from 'react';
import Ratings from 'react-ratings-declarative';
import styles from "./ReviewForm.module.scss";
import { useParams } from 'react-router';
import { getFullAddress } from '../../../../utils/getStrings';
import { IMAGE_URL, endpoint } from '../../../../config/url';
import { ErrorMessages } from '../../../../types/ErrorMessages';
import { useDispatch, useSelector } from 'react-redux';
import noImage from '../../../../types/noImage';
import { fetchRestaurantIfNeed } from '../../../../actions/main/restaurant/details';
import { Field, Formik } from "formik";
import { uploadReview, editReview } from '../../../../actions/main/restaurant/reviews';
import { fetchReview } from '../../../../actions/main/restaurant/review';

export default ({route, match}) => {                
    const param = useParams();        
    const dispatch = useDispatch();
    const restaurant = useSelector((store) => store.main.restaurant.details);
    const review = useSelector((store) => store.main.restaurant.review);

    //TODO:여기도 바로 패치하지 말고 스토리지 같은거 이용해서 할것.
    useEffect(() => {        
        dispatch(fetchRestaurantIfNeed(param.resid));  
        if (isEdit()) {
            dispatch(fetchReview(param.id));
        }
    }, []);         
    
    const validateRating = (value) => {        
        let errorMessage;
        if (value == 0) {
            errorMessage = ErrorMessages.EMPTY_TEXT;
        }
        return errorMessage;
    }

    const validateTitle = (value) => {        
        let errorMessage;
        if (value == "") {
            errorMessage = ErrorMessages.EMPTY_TEXT;
        }
        return errorMessage;
    }

    const validateComment = (value) => {
        let errorMessage;
        if (value.length < 50) {
            errorMessage = ErrorMessages.EMPTY_TEXT;
        }
        return errorMessage;
    }

    const handleReviewSubmit = (values) => {  
        if (isEdit()) {
            dispatch(editReview(param.resid, param.id, values));
        }   
        else {
            dispatch(uploadReview(param.resid, values));
        }           
    }

    const isEdit = () => {            
        return match.path == endpoint.editReview;
    }            

    if (isEdit() && review.isPending) return null;

    return (      
        <Formik onSubmit={handleReviewSubmit} enableReinitialize={true}
            initialValues={isEdit() ? 
                review : 
                {
                    rating: 0, 
                    title: "", 
                    comment: ""
                }}>
            {({handleSubmit, setFieldValue, setFieldTouched}) => (
                <form className={styles.newreview} onSubmit={handleSubmit}>
                    <span className={styles.main_title}>Review</span>
                    <header className={styles.res_profile}>
                        <img src={restaurant.thumbnail ? `${IMAGE_URL}/${restaurant.thumbnail}` : noImage}/>
                        <div>
                            <span className={styles.name}>{restaurant.name}</span>
                            <span className={styles.address}>{getFullAddress(restaurant.address)}</span>
                        </div>
                    </header>                        
                    <Field name="rating" validate={validateRating}>
                        {({
                            field, 
                            form: { touched, errors },
                            meta
                        }) => (
                            <div>
                                <div className={styles.header_box}>
                                    <span className={styles.header_title}>평가</span>
                                    <span className={touched.rating ? styles.error_title.concat(" ", styles.error_visible) : styles.error_title}>{errors.rating}</span>
                                </div>
                                <Ratings rating={field.value} changeRating={(value) => {setFieldTouched("rating"); setFieldValue("rating", value, true)}} widgetDimensions="20px" svgIconViewBoxes="0 0 32 32" widgetSpacings="0px"
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
                        )}
                    </Field>                    
                    <Field name="title" validate={validateTitle}>
                        {({
                            field, 
                            form: { touched, errors },
                            meta
                        }) => (
                            <div className={styles.input_container}>
                                <div className={styles.header_box}>
                                    <span className={styles.header_title}>제목</span>
                                    <span className={touched.title ? styles.error_title.concat(" ", styles.error_visible) : styles.error_title}>{errors.title}</span>
                                </div>
                                <input type="text" className={styles.title_input} {...field} onBlur={(e) => setFieldTouched("title")}/>
                            </div> 
                        )}                        
                    </Field>  
                    <Field name="comment" validate={validateComment}>
                        {({
                            field, 
                            form: { touched, errors },
                            meta
                        }) => (
                            <div className={styles.comment_box}>
                                <div className={styles.comment_container}>
                                    <div className={styles.header_box}>
                                        <span className={styles.header_title}>내용</span>
                                        <span className={touched.comment ? styles.error_title.concat(" ", styles.error_visible) : styles.error_title}>{errors.comment}</span>
                                    </div>                        
                                    <span className={styles.header_title}>{`${field.value.length}/50`}</span>
                                </div>                
                                <textarea className={styles.comment_textbox} spellCheck={false} {...field} onBlur={(e) => setFieldTouched("comment")}/>
                            </div>    
                        )}
                    </Field>                                                  
                    {/* <button type="submit" className={styles.commit_btn}>{review.resid != "" ? "리뷰 수정하기" : "리뷰 등록하기"}</button> */}
                    <button type="submit" className={styles.commit_btn}>리뷰 등록하기</button>
                </form>    
            )}            
        </Formik>             
    )   
};
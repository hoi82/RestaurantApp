import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PanelGrid from '../../../../components/PanelGrid';
import styles from "./Reviews.module.scss";
import Review from './Review';
import { Link } from 'react-router-dom';
import { endpoint } from '../../../../config/url';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewsIfNeed, deleteReview, fetchReviews, REVIEW_REMOVED } from '../../../../actions/main/restaurant/reviews';
import { showDialog } from '../../../../actions/common/dialog';
import { DialogMode } from '../../../../types/Variables';

export default function Reviews({id, resid}) {
    const reviews = useSelector((store) => store.main.restaurant.reviews);
    const [page, setPage] = useState(0);
    const [pageLength, setPageLength] = useState(10);
    const dispatch = useDispatch();
    const param = useParams();    

    useEffect(() => {
        dispatch(fetchReviewsIfNeed(resid, page, pageLength));
    }, [page]);

    const handleDelete = (id) => {
        dispatch(showDialog({
            mode: DialogMode.CONFIRM,
            content: "정말 삭제하겠습니까?",
            onConfirm: () => {  
                dispatch(deleteReview(id, page, pageLength)).then(({status}) => {
                    if (status == REVIEW_REMOVED) {
                        dispatch(fetchReviews(resid, page, pageLength));
                    }                    
                });
            }
        }));         
    }    

    const renderReview = (item, i) => {        
        return <Review key={i} {...item} onDelete={handleDelete}/>
    }    

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);                
    }        

    return (
        <React.Fragment>
            <div id={id} className={styles.review_title_panel}>
                <span className={styles.review_title}>Reviews</span>
                {
                    reviews.items.length > 0 ? <Link className={styles.new_review_btn} to={{pathname: endpoint.newReview.replace(":resid", param.id)}}>Write a Review</Link> : null
                }                        
            </div>                                        
            { reviews.items.length > 0 ? <div style={{height: "auto", marginTop: "24px"}}>
                <PanelGrid config={{lengthPerPage: pageLength, fullLength: reviews.totalReviews, dynamicFetch: true}} 
                items={reviews.items} itemRenderer={renderReview} onPageChange={handlePageChange}/>
            </div>
            : <div className={styles.review_noitem_panel}>
                <div style={{display: "flex"}}>                            
                    <span>No reviews are done. Be the first reviewer!</span>
                </div>                            
                <Link className={styles.new_review_btn} to={{pathname: endpoint.newReview.replace(":resid", param.id)}}>Write a Review</Link>
            </div> }            
        </React.Fragment>           
    );
}
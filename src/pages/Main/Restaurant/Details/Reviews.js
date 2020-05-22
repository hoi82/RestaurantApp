import React from 'react';
import { useHistory, useParams } from 'react-router';
import PanelGrid from '../../../../components/PanelGrid';
import styles from "./Reviews.module.scss";
import Review from './Review';
import { Link } from 'react-router-dom';
import { endpoint } from '../../../../config/url';

export default function Reviews({resName, resthumbnail, id, reviews = []}) {
    const history = useHistory();
    const param = useParams();    
    const renderReview = (item, i) => {
        return <Review key={i} index={i} review={item}/>
    }    

    return (
        <React.Fragment>
            <div id={id} className={styles.review_title_panel}>
                <span className={styles.review_title}>Reviews</span>
                {
                    reviews.length > 0 ? <Link className={styles.new_review_btn} to={{pathname: endpoint.newReview.replace(":id", param.id), state: {id: param.id, name: resName, thumbnail: resthumbnail}}}>Write a Review</Link> : null
                }                        
            </div>                                        
            { reviews.length > 0 ? <div style={{height: "auto", marginTop: "24px"}}>
                <PanelGrid config={{lockLayout: "List", showNavigator: true, layout: {list: {rows: 10}}}} items={reviews} itemRenderer={renderReview}/>
            </div>
            : <div className={styles.review_noitem_panel}>
                <div style={{display: "flex"}}>                            
                    <span>No reviews are done. Be the first reviewer!</span>
                </div>                            
                <Link className={styles.new_review_btn} to={{pathname: endpoint.newReview.replace(":id", param.id), state: {id: param.id, name: resName, thumbnail: resthumbnail}}}>Write a Review</Link>
            </div> }
        </React.Fragment>           
    );
}
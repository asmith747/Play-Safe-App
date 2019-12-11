import React from 'react';
import {Rating} from './rating';

export const ReviewList = props =>(
<div>
<h2>Product Reviews ({props.reviews.length})</h2>
    
    {props.reviews.length === 0 && <span className = "bg-gray  m-0 p-2 mb-10 rounded-top">Be the first to add a review!<br/><br/></span>}
        <ul>
            {
                props.reviews.map((x, i) =>
                <li key = {i} className = "list-group-item my-3 mx-0">
                    
                    <h2> <div className = " row row-bordered mx-2" ><Rating value = {x.rating}/></div></h2>  
                    <div className="w-100"><hr/></div>    <span className = "float-right font-weight-light" >{x.date}</span>
                    <span className = "font-weight-light">{x.userName}</span>
                    <p >"{x.comment}"</p>
               
                </li>
                )
            }
        </ul>
    
    </div>
);
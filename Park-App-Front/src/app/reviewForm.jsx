import React from 'react';
import { ParkReview } from '../models/ParkReview';
import {Rating} from './rating';

export class ReviewForm extends React.Component{

    ratingOptions = [1,2,3,4,5];    

    state = {
        userName:'',
        rating: '',
        comment:''
    };

    onSubmit()
    {   
        let d = new Date().toDateString();
        this.props.onReviewAdded(new ParkReview(this.state.userName, this.state.rating, this.state.comment, d));
        this.setState({userName: '', rating: '', comment: ''});
    }

    render()
    {
        return(
            <div className = "border border ">
            <h3 className= "bg-secondary text-white m-0 p-2 rounded-top">Add Review</h3>
            <div className = "form-row p-2">
            <div className = "col-8">
                <label htmlFor="newUserName">Your Name</label>
            <input type = "text"
            name = "newUserName"
            id = "newUserName"
            className = "form-control"
            value = {this.state.userName}
            onChange = {e => this.setState({userName: e.target.value})}/>
            </div>

            <div className = "col-2">
                <label htmlFor="newRating">Rating</label>
            <select
            name = "newRating"
            id = "newRating"
            className = "form-control"
            value = {this.state.rating}
            onChange = {e => this.setState({rating: e.target.value})}>
            <option></option>
            {
              this.ratingOptions.map(x => <option key= {(x)}>{x}</option>)
            }
            </select>
            </div>
            <Rating className="col-2 " value={this.state.rating}></Rating>

            
            </div>
            <div className="form-group p-2 my-2">
                <label htmlFor="newComment">Comment</label>
            <textarea  rows = "6"
            name = "newComment"
            id = "newComment"
            className = "form-control"
            value = {this.state.comment}
            onChange = {e => this.setState({comment: e.target.value})}>
            </textarea>
            </div>
         
            <div className= "p-2">
            <button
            type="button"
            className="btn btn-primary" onClick = {() => this.onSubmit()}>
            Submit
            </button>
                </div>
            </div>
        );
    }
}
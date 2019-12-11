import React from 'react';

export class Rating extends React.Component{

    state = {
        rating: '',
    }

    addRating(name, val){
        console.log(val)
        this.setState({
            rating: val
        });
        console.log(this.state.rating)
        this.props.addRating(name, val);
    }

    render(){
        return (
            <div className="d-flex flex-row">
                {/* {console.log(this.props)} */}
                <label htmlFor={this.props.name} className="mx-2 mt-1">{this.props.name}:</label>
                <select type="text"
                        id={this.props.name}
                        name={this.props.name}
                        className="mb-2"
                        value={this.state.rating}
                        //onChange={e => this.setState({rating: e.target.value})} 
                        onChange={e => this.addRating(this.props.name, e.target.value)}
                        //onChange={this.handleChange}  
                >
                <option></option>
                {
                    [1,2,3,4,5,6,7,8,9,10].map(x => <option key={x} value={x}>{x}</option>)
                }
                </select>
            </div>
        );
    }
}
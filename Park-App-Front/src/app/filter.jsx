import React from 'react';

export class Filter extends React.Component{

    state = {
        check: false,
    }

    handleChange(val){
        console.log(val)
        this.setState({
            check: val
        })
        this.props.handleChange(this.props.name,val)
    }

    render(){
        return(
            <div>
                <label htmlFor={this.props.name} className="mx-2">{this.props.name}</label>
                <input type="checkbox"
                    name={this.props.name}
                    className="mr-2"
                    checked={this.state.check}
                    onChange={e => this.handleChange(e.target.checked)}
                >   
                </input>
            </div>
        )
    }
}
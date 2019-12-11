import React from 'react';
import { UserRepo } from '../api/UserRepo';

export class NewAccountPage extends React.Component {

    userRepo = new UserRepo();

    state = {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
        passwords: false,
        empty: false,
        userTaken: false,
    }

    onCreate() {
        this.setState({
            empty: false,
            passwords: false,
            userTaken: false
        });
        if(!this.state.firstName || !this.state.lastName || !this.state.username || !this.state.password || !this.state.confirmPassword){
            this.setState({
                empty: true
            });
        }
        else if(this.state.password !== this.state.confirmPassword){
            this.setState({
                passwords: true
            });
        }
        else{
            let account = {firstName: this.state.firstName,
                        lastName: this.state.lastName, 
                        username: this.state.username, 
                        password: this.state.password}
            this.userRepo.createAccount(account)
            .then(res => {
                console.log("here")
                console.log(res.error)
                if(res.error){
                    this.setState({
                        userTaken: true
                    });
                }
                else{
                    this.props.history.push("/")
                }
            })
        }
    }

    render() {
        return(
            <div className="background">
                <img className="bgImg" src={require("../assets/ParkBg4.jpg")}></img>
                <form>
                    <div className="box rounded">
                        <div className="head rounded" id="new-account-head">
                            <h5>Create New Account</h5>
                        </div>
                        <div>
                        {this.state.empty ? <p className="incorrect mx-2 mt-1 mb-0"> Please fill out all fields</p>: ''}
                        {this.state.userTaken ? <p className="incorrect mx-2 mt-1 mb-0"> This user name is already taken</p>: ''}
                        <label className="credentials-label">First Name</label>
                        <label className="credentials-label">Last Name</label>
                            <input type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="credentials-input"
                                    value={this.state.firstName}
                                    onChange={e => this.setState({firstName: e.target.value})}
                            />
                            <input type="text"
                                    id="lastName"
                                    name="lastName"
                                    className="credentials-input"
                                    value={this.state.lastName}
                                    onChange={e => this.setState({lastName: e.target.value})}
                            />
                            <label className="login-label">User Name</label>
                            <input type="text"
                                    id="userName"
                                    name="userName"
                                    className="login-input"
                                    value={this.state.username}
                                    onChange={e => this.setState({username: e.target.value})}
                            />
                            <label className="login-label">Password</label>
                            {this.state.passwords ? <label className="incorrect"> Passwords must match</label>: ''}
                            <input type="text"
                                    id="password"
                                    name="password"
                                    className="login-input"
                                    value={this.state.password}
                                    onChange={e => this.setState({password: e.target.value})}
                            />
                            <label className="login-label">Confirm Password</label>
                            <input type="text"
                                    id="password"
                                    name="password"
                                    className="login-input"
                                    value={this.state.confirmPassword}
                                    onChange={e => this.setState({confirmPassword: e.target.value})}
                            />
                            {/* <div className="center"> */}
                                <button 
                                    type="button" 
                                    className="login-button rounded"
                                    id="new-account-button"
                                    onClick={() => this.onCreate()}
                                >
                                    Create Account
                                </button>
                                <button 
                                    type="button" 
                                    className="login-button rounded"
                                    id="cancel-button"
                                    onClick={() => this.props.history.push("/")}
                                >
                                    Cancel
                                </button>
                            {/* </div> */}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
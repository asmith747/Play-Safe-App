import React from 'react';
import { UserRepo } from '../api/UserRepo';

export class LoginPage extends React.Component {

    userRepo = new UserRepo();

    state = {
        userName: '',
        password: '',
        userID: -1,
        incorrectLogin: false,
    }

    signIn() {
        this.setState({
            incorrectLogin: false,
        });
        var loginData = {username: this.state.userName, password: this.state.password}
        // console.log(loginData)
        this.userRepo.login(loginData)
        .then(res => {
            console.log(res)
            if(res.error || res === "Please enter a username and password!" || res === "Incorrect username and/or password"){
                this.setState({
                    incorrectLogin: true
                });
            }
            else{
                let parts = res.split(" ")
                console.log(parts)
                console.log(parseInt(parts[parts.length - 1]))
                this.setState({
                    userID: parseInt(parts[parts.length - 1]),
                })
                console.log(this.state.userID)
                this.props.history.push({
                    pathname: "/HomePage",
                    state: {userID: this.state.userID}
                });
            } 
        });
    }

    render() {
        return(
            <div className="background">
                <img className="bgImg" src={require("../assets/ParkBg4.jpg")}></img>
                <form>
                    <div className="box rounded">
                        <div className="head rounded">
                            <h5>Play Safe</h5>
                        </div>
                        <div>
                            <label className="login-label">User Name</label>
                            {this.state.incorrectLogin ? <label className="incorrect"> Incorrect Username or Password</label>: ''}
                            <input type="text"
                                    id="userName"
                                    name="userName"
                                    className="login-input"
                                    value={this.state.userName}
                                    onChange={e => this.setState({userName: e.target.value})}
                            />
                            <label className="login-label">Password</label>
                            <input type="text"
                                    id="password"
                                    name="password"
                                    className="login-input"
                                    value={this.state.password}
                                    onChange={e => this.setState({password: e.target.value})}
                            />
                            <div className="center">
                                <button 
                                    type="button" 
                                    className="login-button rounded"
                                    id="sign-in-button"
                                    onClick={() => this.signIn()}
                                >
                                    Sign In
                                </button>
                            </div>
                            <div className="strike">
                                <span>OR</span>
                            </div>
                            <div className="center">
                                <button 
                                    type="button" 
                                    className="login-button rounded"
                                    id="create-account-button"
                                    onClick={() => this.props.history.push("/NewAccount")}
                                >
                                    Create New Account
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
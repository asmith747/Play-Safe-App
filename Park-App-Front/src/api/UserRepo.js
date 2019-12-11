import axios from 'axios';

export class UserRepo {

     //url = "http://localhost:3000";
    url = "http://35.223.38.2:80";
    config = {};

    login(loginData) {
        return new Promise((resolve, reject) => {
            axios
            .post(`${this.url}/login/auth`, loginData, this.config)
            .then(res => {
                console.log("login")
                resolve(res.data);
                //console.log(res)
                if(res.data === "Incorrect username and/or password!" || res.data === "Please enter your username and password!"){
                    console.log("nope");
                }
            })
            .catch(res => resolve({ error: "Wrong Username or Password"}));
        });
    }

    //need to confirm url extensions

    createAccount(account) {
        return new Promise((resolve, reject) => {
            axios
            .post(`${this.url}/createAccount`,
            {
                firstName: account.firstName,
                lastName: account.lastName,
                username: account.username,
                password: account.password,
            },
            this.config
            )
            .then(res => resolve(res.data))
            .catch(res => resolve({ error: "Username Already Taken"}));
        });
    }

    updateUser(body)
    {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/profile/update`, body, this.config)
                .then(x => resolve(x.data))
                .catch(x => alert(x));
            });
    }
    
    //when sending the user id send as userID
    getUser(userID){
        return new Promise((resolve, reject) => {
        axios.post(`${this.url}/profile`, userID, this.config)
            .then(x => resolve(x.data))
            .catch(x => alert(x));
        });
    }

//added favorites
    updateFavorites(parkId, body){
        return new Promise((resolve, reject) => {
        axios.post(`${this.url}/browse/${parkId}/favorite`, body, this.config)
            .then(x => resolve(x.data))
            .catch(x => alert(x));
        });
    }

    getFavorites(body){
        return new Promise((resolve, reject) => {
        axios.post(`${this.url}/favorites/myFavorites`, body, this.config)
            .then(x => resolve(x.data))
            .catch(x => alert(x));
        });
    }

    deleteFavorite(body){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/favorites/removeFavorite`, body, this.config)
                .then(x => resolve(x.data))
                .catch(x => alert(x));
            });
    }

    getMyIncidents(userInfo){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/incident/myIncidents`, userInfo, this.config)
                .then(x => resolve(x.data))
                .catch(x => alert(x));
            });
    }

    getMyReviews(userInfo){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/rating/myRatings`, userInfo, this.config)
                .then(x => resolve(x.data))
                .catch(x => alert(x));
            });
    }

}
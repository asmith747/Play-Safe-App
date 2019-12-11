import axios from 'axios';

export class ParkRepo{
    //url = "http://localhost:3000";

     url = "http://35.223.38.2:80";


    config = {};

    getParks(){
        return new Promise((resolve, reject) => {
            axios
            .get(`${this.url}/browse`, this.config)
            .then(res => {
                resolve(res.data);
                // console.log("from park repo")
                // console.log(res);
            })
            .catch(res => alert(res))
        });
    }

    getPark(id){
        return new Promise((resolve, reject) => {
            axios
            .get(`${this.url}/browse/${id}`, this.config)
            .then(res => {
                resolve(res.data);
            })
            .catch(res => alert(res))
        });
    }

    getParkCare(id){
        return new Promise((resolve, reject) => {
            axios
            .get(`${this.url}/browse/${id}/care`, this.config)
            .then(res => {
                resolve(res.data);
            })
            .catch(res => alert(res))
        });
    }

    getParkIncidents(id){
        return new Promise((resolve, reject) => {
            axios
            .get(`${this.url}/incident/park/${id}`, this.config)
            .then(res => {
                resolve(res.data);
            })
            .catch(res => alert(res))
        });
    }

    updateIncidents(incident)
    {
        return new Promise((resolve, reject) =>{
                    axios.post(`${this.url}/incident/createIncident`, incident, this.config)
                    .then(x => resolve(x.data))
                    .catch(x => alert(x));
                });
    }

    getAverageRating(id){
        return new Promise((resolve, reject) => {
            axios
            .get(`${this.url}/rating/avgRating/${id}`, this.config)
            .then(res => {
                resolve(res.data);
            })
            .catch(res => alert(res))
        });
    }

    addIncident(incident)
    {
        return new Promise((resolve, reject) =>{
            axios.post(`${this.url}/incident`, incident, this.config)
            .then(x => resolve(x.data))
            .catch(x => alert(x));
        });
    }

    addReview(theReview){
        return new Promise((resolve, reject) =>{
            axios.post(`${this.url}/browse`, theReview, this.config)
            .then(res => resolve(res.data))
            .catch(res => alert(res));
        });
    }


    getReviews(id){
        return new Promise((resolve, reject) => {
            axios
            .get(`${this.url}/rating/view/${id}`, this.config)
            .then(res => {
                resolve(res.data);
            })
            .catch(res => alert(res))
        });
    }

    search(param){
        return new Promise((resolve, reject) => {
            axios
            .post(`${this.url}/search`, param, this.config)
            .then(res => {
                resolve(res.data);
            })
            .catch(res => alert(res))
        });
    }

}
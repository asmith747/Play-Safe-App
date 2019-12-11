import React from 'react';
import { ParkRepo } from '../api/ParkRepo';
import { UserRepo } from '../api/UserRepo';
import { Link } from 'react-router-dom';
import { Rating } from './rating'
export class ParkPage extends React.Component{

    parkRepo = new ParkRepo();
    userRepo = new UserRepo();

    state = {
        inciDate: 0,
        inciDescription:'',
        inciType:0,
        reviews: [],
        park: [],
        incidents: [],
        facilities: [],
        avgReviews: [],
        reviewDescription: "",
        accessibility: 0,
        atmosphere: 0,
        cleanliness: 0,
        crowd: 0,
        equipment: 0,
        noise: 0,
        pet_friendliness: 0,
        // reviewUsername:[],
        shade: 1,
        userName:"",
        ratings: ["Accessibility","Atmosphere","Cleanliness","Crowd","Equipment","Noise","Pet Friendly"],
    };
    
    onReviewAdded(){
        let theReview = {review: this.state.reviewDescription, accessibilityRating: this.state.accessibility, atmosphereRating: this.state.atmosphere, noiseRating: this.state.noise, cleanlinessRating: this.state.cleanliness, equipmentRating: this.state.equipment, shadeRating: this.state.shade, petRating: this.state.pet_friendliness, crowdRating: this.state.crowd, userID: this.props.location.state.userID, parkId: this.props.location.state.id}
        if(theReview.review == "" || theReview.accessibilityRating == 0 || theReview.atmosphereRating == 0 || theReview.noiseRating == 0 || theReview.cleanlinessRating == 0 || theReview.equipmentRating == 0  || theReview.petRating == 0 || theReview.crowdRating == 0 )
        {
            window.alert("Please enter a value for every review field");
        }
        else{
            this.parkRepo.addReview(theReview)
        .then(arr => {
            console.log("rev add")
            console.log(arr)
            window.location.reload(false);
        });
        }
    }
   
    addRating(name, val){
        console.log(name)
        if(name == "Accessibility"){
            console.log(val)
            this.setState({
                accessibility: val
            });
            console.log(this.state.accessibility)
        }
        if(name == "Atmosphere"){
            console.log(val)
            this.setState({
                atmosphere: val
            });
            console.log(this.state.atmosphere)
        }
        if(name == "Cleanliness"){
            console.log(val)
            this.setState({
                cleanliness: val
            });
            console.log(this.state.cleanliness)
        }
        if(name == "Crowd"){
            console.log(val)
            this.setState({
                crowd: val
            });
            console.log(this.state.crowd)
        }
        if(name == "Equipment"){
            console.log(val)
            this.setState({
                equipment: val
            });
            console.log(this.state.equipment)
        }
        if(name == "Noise"){
            console.log(val)
            this.setState({
                noise: val
            });
            console.log(this.state.noise)
        }
        if(name == "Pet Friendly"){
            console.log(val)
            this.setState({
                pet_friendliness: val
            });
            console.log(this.state.pet_friendliness)
        }
    }

    // getReviewUsername(review)
    // {
       
    //     let body = {userID: review.createdBy};
    //     this.userRepo.getUser(body)
    //     .then(arr => {
            
    //         this.setState({
    //             reviewUsername: [...this.state.reviewUsername, `${arr[0].username}`]
    //         });

    //     })
     
    // }

    getDate(x){
        let half = x.split("T")
        let parts = half[0].split("-")
        let date = "" + parts[1] + "-" + parts[2] + "-" + parts[0]
        console.log(date)
        return date
    }

    render(){
        return (
            <div className=" overflow-auto background">
                <img className="bgImg" src={require("../assets/ParkBg4.jpg")}></img>
            {/* //to show background image, uncomment what is above and comment the div below.  But, a lot of the content does not have a background set so it will be displayed directly above the image.  You will need to play around with giving some divs bg-light */}
            {/* <div> */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand">Play Safe</a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to ={{pathname: '/HomePage',
                                    state: {userID: this.props.location.state.userID}}} className="nav-link"> Home </Link>
                        </li>
                        <li className="nav-item">
                                <Link to = {{pathname: '/UserPage',
                                    state: {userID: this.props.location.state.userID}}} className="nav-link"> User Page</Link>
                        </li>
                        </ul>
                        <Link id="signOut"
                            to={{pathname: '/'}} 
                            className="nav-link"> 
                            Sign Out
                        </Link>
                    </div>
                </nav>

                {/* {console.log("here")}
                {console.log(this.state.park)} */}
                <div className="bg-gray" align="center">
                    <h1>{this.state.park.park_name}</h1>
                    {/* <img src="https://via.placeholder.com/1000x500" alt="parkPic"/> */}
                    <h5 className="text-dark">{this.state.park.address} {this.state.park.zipcode}</h5>
                    <p className="text-secondary mb-1">Supervisor: {this.state.park.park_supervisor_fname} {this.state.park.park_supervisor_lname}</p>
                    <p className="text-secondary"> Hours: {this.state.park.open_time} - {this.state.park.close_time}</p>
                
                </div>
                <div className="container">
                    <div className="bg-white p-4">
                        <h3>Basic Information:</h3>
                        <div className="d-flex flex-row flex-wrap">
                            <div>{this.state.park.basketballCourt ? <span className = "card bg-gray m-0 p-2 rounded-top parkInfo">Basketball Court</span> : '' }</div>
                            <div>{this.state.park.bikeFriendly ? <span className = "card bg-gray m-0 p-2 rounded-top parkInfo">Bike Friendly</span> : '' }</div>
                            <div>{this.state.park.dogFriendly ? <span className = "card bg-gray m-0 p-2 rounded-top parkInfo">Dog Friendly</span> : '' }</div>
                            <div>{this.state.park.doggie_bags ? <span className = "card bg-gray m-0 p-2 rounded-top parkInfo">Dog Bags</span> : '' }</div>
                            <div>{this.state.park.fenced_area ? <span className = "card bg-gray m-0 p-2 rounded-top parkInfo">Fenced Area</span> : '' }</div>
                            <div>{this.state.park.leash_required ? <span className = "card bg-gray m-0 p-2 rounded-top parkInfo">Leash Required</span> : '' }</div>
                            <div>{this.state.park.playground ? <span className = "card bg-gray m-0 p-2 rounded-top parkInfo">Playground</span> : '' }</div>
                            <div>{this.state.park.pool ? <span className = "card bg-gray m-0 p-2 rounded-top parkInfo">Pool</span> : '' }</div>
                            <div>{this.state.park.shade ? <span className = "card bg-gray m-0 p-2 rounded-top parkInfo">Shade</span> : '' }</div>
                            <div>{this.state.park.skatePark ? <span className = "card bg-gray m-0 p-2 rounded-top parkInfo">Skate Park</span> : '' }</div>
                            <div>{this.state.park.soccerField ? <span className = "card bg-gray m-0 p-2 rounded-top parkInfo">Soccer Field</span> : '' }</div>
                            <div>{this.state.park.tennisCourt ? <span className = "card bg-gray m-0 p-2 rounded-top parkInfo">Tennis Court</span> : '' }</div>
                            <div>{this.state.park.trashcans ? <span className = "card bg-gray m-0 p-2 rounded-top parkInfo">Trash Cans</span> : '' }</div>
                            <div>{this.state.park.water ? <span className = "card bg-gray m-0 p-2 rounded-top parkInfo">Water</span> : '' }</div>
                        </div>
                    </div>

                    <br/>

                    <div>
                    <div className="bg-white p-4 mb-4">
                        <h3>Average Ratings:</h3>
                        {typeof this.state.reviews != "object" ? (
                            <p>There are no reviews recorded in this park</p>
                        ) : (
                            <div>
                                <div className="d-flex flex-row flex-wrap mb-2 ml-2">
                                    <span className = "card bg-gray m-0 px-3 py-2 rounded-top reviewInfo">Average Accessibility Rating: {this.state.avgReviews.accessibilityAVG}</span>
                                    <span className = "card bg-gray m-0 px-3 py-2 rounded-top reviewInfo">Average Atmosphere Rating: {this.state.avgReviews.atmosphereAVG}</span>
                                    <span className = "card bg-gray m-0 px-3 py-2 rounded-top reviewInfo">Average Noise Rating: {this.state.avgReviews.noiseAVG}</span>
                                    <span className = "card bg-gray m-0 px-3 py-2 rounded-top reviewInfo">Average Equipment Rating: {this.state.avgReviews.equipmentAVG}</span>
                                    <span className = "card bg-gray m-0 px-3 py-2 rounded-top reviewInfo">Average Pet Friendliness Rating: {this.state.avgReviews.pet_friendlinessAVG}</span>
                                    <span className = "card bg-gray m-0 px-3 py-2 rounded-top reviewInfo">Average Crowd Rating: {this.state.avgReviews.crowdAVG}</span>
                                </div>
                            </div>)}
                        </div>
                        <form className="mb-3">
                            <div className="card mb-2">
                                <div className="card-header bg-secondary p-2 text-light">
                                <h5 className="ml-1 mt-1">Add Review</h5>
                                </div>
                                <textarea id="review"
                                    name="review"
                                    className="form-control"
                                    rows="4"
                                    value={this.state.reviewDescription}
                                    onChange={e => this.setState({reviewDescription: e.target.value})}
                                />
                                <div className="d-flex flex-row flex-wrap ml-2">
                                    {this.state.ratings.map(x => 
                                        <Rating name={x} 
                                                key={x} 
                                                addRating={this.addRating.bind(this)}
                                        />
                                    )}
                                    <label htmlFor="Shade" className="mx-2 mt-1">Shade:</label>
                                    <select type="text"
                                        id="Shade"
                                        name="Shade"
                                        className="mb-2"
                                        value={this.state.shade}
                                        onChange={e => this.setState({shade: e.target.value})} 
                                        >
                                        <option></option>
                                        {
                                            ["No", "Yes"].map(
                                                (x, i) => <option key={x} value={i}>{x}</option>
                                            )
                                        }
                                    </select>
                                    
                                </div>
                                <div className="m-2" align="center">
                                    <button type="button" className="btn btn-primary mb-2 rounded w-50" onClick={() => this.onReviewAdded()}>Submit</button>
                                </div>
                            </div>
                        </form>
                        {typeof this.state.reviews != "object" ? (
                            <p>There are no reviews recorded in this park</p>
                        ) : (
                            <div>
                            <div className="bg-secondary text-light rounded p-2">
                                <h4 className="ml-1 mt-1">Reviews:</h4>
                            </div>
                            {this.state.reviews.map((x, i) => 
                                <div className="card mb-2" key={i}>
                                    <div className="card-header p-2">
                                        {/* need to find username */}   
                        
                                        {/* <label className="ml-1 mt-1">{this.getReviewUsername(x)}</label> */}
                                        {console.log(x.create_date)}
                                        <label className="ml-1 mt-1">{x.username}</label>
                                        <label className="float-right ml-1 mt-1">{this.getDate(x.create_date)}</label>
                            
                                        {/* <label className="float-right ml-1 mt-1">{x.create_date}</label> */}
                                    </div>
                                    <p className="ml-2 my-4">{x.review}</p>
                                    <div className="d-flex flex-row flex-wrap mb-2 ml-2">
                                        <span className = "card bg-gray m-0 px-3 py-2 rounded-top reviewInfo">Accessibility: {x.accessibility}</span>
                                        <span className = "card bg-gray m-0 px-3 py-2 rounded-top reviewInfo">Atmosphere: {x.atmosphere}</span>
                                        <span className = "card bg-gray m-0 px-3 py-2 rounded-top reviewInfo">Cleanliness: {x.cleanliness}</span>
                                        <span className = "card bg-gray m-0 px-3 py-2 rounded-top reviewInfo">Crowd: {x.crowd}</span>
                                        <span className = "card bg-gray m-0 px-3 py-2 rounded-top reviewInfo">Equipment: {x.equipment}</span>
                                        <span className = "card bg-gray m-0 px-3 py-2 rounded-top reviewInfo">Noise: {x.noise}</span>
                                        <span className = "card bg-gray m-0 px-3 py-2 rounded-top reviewInfo">Pet Friendliness: {x.pet_friendliness}</span>
                                        {x.shade ? <span className = "card bg-gray m-0 px-3 py-2 rounded-top reviewInfo">Has Shade</span> : ''}
                                    </div>
                                </div>
                        ) }
                        
                    </div>
                        )}
                    </div>
                    <br/>

                    <div className = "card">
                        <div className = "card-header bg-secondary p-2 text-light">
                            <h5 className = "ml-1 mt-1">Add Incident:</h5>
                        </div>
                        
                        <form className = "m-3">
             <div className = "form-row">
                        <div className=" form-inline form-group col-md-6">
                                <label htmlFor="inciDate">
                                Date of Incident:
                                </label>
                                <input type="date"
                                id="inciDate"
                                name="inciDate"
                                className="form-control mx-3"
                                value={this.state.inciDate}
                                onChange={ e => this.setState({inciDate: e.target.value }) } />
                            </div>       
                            
                            <div className = "form-inline form-group col-md-6">
                            <label htmlFor="inciDate">
                                Incident Type:
                            </label>
                            <select
                                name="inciType"
                                id="inciType"
                                className="form-control mx-3"
                                value={this.state.inciType}
                                onChange={e => this.setState({ inciType: e.target.value })}>
                                <option></option>
                                {
    ["Vandalism", "Drugs", "Theft", "Sexual Assault", "Kidnapping", "Homicide", "Pervert"].map((x, i ) => <option key={x} value = {i + 1}>{x}</option>)
                                }
                                 </select>
                                </div>

                                </div>
                            <div className = "form-group ">
                                <label htmlFor="inciDescription">
                                Description of Incident: 
                                </label>
                                <textarea
                                id="review"
                                name="inciDescription"
                                className="form-control"
                                rows = "4"
                                value={this.state.inciDescription}
                                onChange={ e => this.setState({ inciDescription: e.target.value }) } />
                            </div>   
                                <div align="center">   
                                    <button type = "button" className = "form-control btn btn-primary rounded btn-sm center btn-block mb-0 w-50" onClick = {e => this.onIncidentSubmit()}>
                                    Report
                                </button>
                            </div> 
                            


                        </form>
                        </div>
                        {typeof this.state.incidents != "object" ? (
                            <p className="bg-white rounded mt-2 p-3">There are no incidents recorded in this park</p>
                            ) : (
                            <div>
                                <div className="bg-secondary text-light rounded p-2 mt-4">
                                     <h4 className="ml-1 mt-1">Incidents:</h4>
                                </div>
                            {this.state.incidents.map((x, i) => 
                                <div className="card mb-2" key={i}>
                                    {/* {console.log("incid test")}
                                    {console.log(x)} */}
                                    <div className="card-header p-2">
                                        {/* need to find username */}
                                    <label className="ml-1 mt-1">{x.username}</label>
                                        <label className="float-right ml-1 mt-1">{this.getDate(x.incidentDate)}</label>
                                    </div>
                                    <div></div>
                                    <p className="ml-2 mt-2">{x.incidentDescription}</p>
                                </div>
                     
                        )}
                            </div>
                        )
                        }
                            

                    <div className = "card d-flex bg-info mx-3 mt-4 px-4">
                        <h3 className = "text-white center text-bold p1">Nearby Emergency Services</h3>
                        {typeof this.state.facilities != "object" ? (
                            <p>There are no facilities nearby</p>
                        ) : (
                            this.state.facilities.map((x, i) => 
                                <div className="d-flex flex-row flex-wrap" key={i}>
                                    <div className="card mb-2 mr-1 facility" >
                                        <h6 className="ml-2 mt-2 mb-0">{x.care_name}</h6>
                                        <p className="ml-2 mt-2 mb-0 text-secondary">Address: {x.care_address} {x.care_zipcode}</p>
                                        <p className="ml-2 mt-2 mb-0 text-secondary">Phone Number: {x.care_phoneNum}</p>
                                    </div>
                                    <div className="card mb-2 mr-1 facility">
                                        <h6 className="ml-2 mt-2 mb-0">{x.police_name}</h6>
                                        <p className="ml-2 mt-2 mb-0 text-secondary">Address: {x.police_address} {x.care_zipcode}</p>
                                        <p className="ml-2 mt-2 mb-0 text-secondary">Phone Number: {x.police_phoneNum}</p>
                                    </div>
                                    <div className="card mb-2 facility">
                                        {/* Get Fire Station Name */}
                                        <h6 className="ml-2 mt-2 mb-0">Nearest Fire Station</h6>
                                        <p className="ml-2 mt-2 mb-0 text-secondary">Address: {x.fire_address} {x.care_zipcode}</p>
                                        <p className="ml-2 mt-2 mb-0 text-secondary">Station Number: {x.fire_stationNo}</p>
                                    </div>
                                </div>
                        ))}
                    </div>
                    <div>
                        {/* <ReviewForm onReviewAdded= {x => this.onReviewAdded(x)}/> */}
                    </div>
                </div>
            </div>
        );
    }

    onIncidentSubmit()
    {
        console.log(this.state.inciDate)
        // let tempdate = this.state.inciDate.split("/");
        // console.log(tempdate[0]);
        if(this.state.inciType == 0 || this.state.incidentDate == 0 || this.state.inciDescription == "")
        {
            console.log("Im in this if statement");
            window.alert("You must enter a value in for each field of Incident");
        }
        else{
            console.log("hello Im in else");
            let incident = { parkId: this.props.location.state.id, userID: this.props.location.state.userID, incidentType: this.state.inciType, incidentDate: this.state.inciDate, incidentDescription: this.state.inciDescription};
            this.parkRepo.updateIncidents(incident)
            .then(() => {
                this.setState({
                    inciDate: 0,
                    inciType: 0,
                    inciDescription: '',
                });
                window.location.reload(false);
    
                console.log("posted bitches")
            }); 
        }
       
    }

    componentDidMount() {
        this.parkRepo.getPark(this.props.location.state.id)
        .then(arr => {
            // console.log("here")
            // console.log(arr)
            // console.log(arr[0].park_id)
            this.setState({
                park: arr[0]
            });
        })

        let userIdBody = {userID: this.props.location.state.userID}
        this.userRepo.getUser(userIdBody)
        .then(x => { 
            console.log("this is what it prints") 
            console.log(x[0].username)
          this.setState({
              userName: x[0].username
              });
          })
  
    
        this.parkRepo.getParkIncidents(this.props.location.state.id)
        .then(arr => {
            console.log("Incients here")
            // console.log(arr)
            console.log(arr)
            // console.log(arr[0].incidentDescription)
            this.setState({
                incidents: arr
            });
        })

        this.parkRepo.getReviews(this.props.location.state.id)
        .then(arr => {
            // console.log("here")
            // console.log(arr)
            // console.log(arr[0])
            this.setState({
                reviews: arr
            });
        })

        this.parkRepo.getParkCare(this.props.location.state.id)
        .then(arr => {
            //console.log("here")
            //console.log(arr)
            // console.log(arr[0])
            this.setState({
                facilities: arr
            });
        })

        // let theReview = {review: this.state.reviewDescription, accessibilityRating: this.state.accessibility, atmosphereRating: this.state.atmosphere, noiseRating: this.state.noise, cleanlinessRating: this.state.cleanliness, equipmentRating: this.state.equipment, shadeRating: this.state.shade, petRating: this.state.pet_friendliness, crowdRating: this.state.crowd, userID: 1, parkId: this.props.location.state.id}
        // console.log(theReview)
        // this.parkRepo.addReview(theReview)
        // .then(arr => {
        //     console.log("here")
        //     console.log(arr)
        //     // console.log(arr[0])
        //     // this.setState({
        //     //     facilities: arr
        //     //});
        // });

        // this.parkRepo.getParkReviews(this.props.location.state.id)
        // .then(arr => {
        //     console.log("here")
        //     console.log(arr)
        //     // console.log(arr[0])
        //     // console.log(arr[0].incidentDescription)
        //     // this.setState({
        //     //     incidents: arr
        //     // });
        // })

        // this.parkRepo.getParkReviews(this.props.location.state.id)
        // .then(arr =>{
        //     this.setState({
        //         reviews: arr
        //     });
        // })
            // console.log(arr[0].incidentDescription)
        //     this.setState({
        //          incidents: arr
        //     });
        // })

        this.parkRepo.getAverageRating(this.props.location.state.id)
        .then(arr =>{
            this.setState({
                avgReviews: arr[0]
            });
        })
    }
}

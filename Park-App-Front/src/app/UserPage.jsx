import React from 'react';//first thing have to do on every compone
import { UserRepo } from '../api/UserRepo';
import { Link } from 'react-router-dom';
export class UserPage extends React.Component{

     
    userRepo = new UserRepo();
    state = {
        userName: "",
        password: "",
        userInfo: [],
        myFavorites: [],
        myIncidents:[],
        myReviews:[]
    };

    changeUsername()
    {
      let tempBody = {username: this.state.userName, userID: this.props.location.state.userID};
      console.log(tempBody);
        this.userRepo.updateUser(tempBody)
        .then(x => {
          console.log(x)

      }); 
    }

    changePassword()
    {
      let tempBody = {password: this.state.password, userID: this.props.location.state.userID};
      console.log(tempBody);
        this.userRepo.updateUser(tempBody)
        .then(x => {
          console.log()
          console.log(x)
          this.setState({
            password: ""
          });
          window.alert("Password changed")

      }); 
    }

    // changeUsername(){
    // let tempBody = {username: this.state.userName }
    // this.userRepo.updateUser(tempBody)
    // .then(() => {
    //     window.location.reload(false);
    // }

    deleteFavorite(userid, parkid)
    {
      let tempBody = {userID: userid, parkID: parkid};
      this.userRepo.deleteFavorite(tempBody)
      .then(p => {
        window.location.reload(false);
        
      });  
        
    }

    getDate(x){
      let half = x.split("T")
      let parts = half[0].split("-")
      let date = "" + parts[1] + "-" + parts[2] + "-" + parts[0]
      console.log(date)
      return date
  }

    displayIncidents() {
      const list = [];
      console.log("Kirby")
      console.log(this.state.myIncidents)
      if(this.state.myIncidents  != "There are no saved incidents")
      // if(this.state.myIncidents.length != 0)
      {
        console.log("hereee")
        // console.log('these are incidents homie');
        // console.log(myIncidents);
     this.state.myIncidents.map((x, i) => 
      list.push(
              <div className="card mb-2 mt-2" key={i}>
                  <div className="card-header p-2">
                      {/* need to find username */}
                  <label className="ml-1 mt-1">{x.park_name}</label>
                      <label className="float-right ml-1 mt-1">{this.getDate(x.incidentDate)}</label>
                  </div>
                  <p className="ml-2 mt-2">{x.incidentDescription}</p>
              </div>
            ))}

      else{
        list.push(
          <div key = {1}>
            <span>You don't have any Incidents to display</span>
          </div>
        )
      }
     return list;
   }

   displayMyReviews() {
    const list = [];
    console.log(this.state.myReviews)
    if(this.state.myReviews != "There are no saved reviews")
    {
   this.state.myReviews.map((x, i) => 
    list.push(
   
        <div className="card mb-2" key={i}>
        <div className="card-header p-2">
            {/* need to find username */}   

            <label className="ml-1 mt-1">{x.park_name}</label>
            <label className="float-right ml-1 mt-1">{this.getDate(x.create_date)}</label>
        </div>
        <p className="ml-2 my-4">{x.review}</p>
        <div className="d-flex flex-row flex-wrap mb-2 ml-2">
            <span className = "card bg-gray m-0 px-3 py-2 rounded-top reviewInfo">Accessibility: {x.accessibility}</span>
            <span className = "card bg-gray m-0 px-3 py-2 rounded-top reviewInfo">: {x.atmosphere}</span>
            <span className = "card bg-gray m-0 px-3 py-2 rounded-top reviewInfo">Cleanliness: {x.cleanliness}</span>
            <span className = "card bg-gray m-0 px-3 py-2 rounded-top reviewInfo">Crowd: {x.crowd}</span>
            <span className = "card bg-gray m-0 px-3 py-2 rounded-top reviewInfo">Equipment: {x.equipment}</span>
            <span className = "card bg-gray m-0 px-3 py-2 rounded-top reviewInfo">Noise: {x.noise}</span>
            <span className = "card bg-gray m-0 px-3 py-2 rounded-top reviewInfo">Pet Friendliness: {x.pet_friendliness}</span>
            {x.shade ? <span className = "card bg-gray m-0 px-3 py-2 rounded-top reviewInfo">Has Shade</span> : ''}
        </div>
    </div>
      ))}

    else{
      list.push(
        <div key = {1}>
          <span>You don't have any Reviews to display</span>
        </div>)}

   return list;
 }

    displayFavorites() {
       const list = [];
       console.log("HERE LOOK HERE");
       console.log(this.state.myFavorites);
       if(this.state.myFavorites != "You have no saved favorites")
       {
      this.state.myFavorites.map((fave, i) => 
       list.push(
          <div key = {i} className="card d-flex flex-row flex-wrap mr-2">
              <h5 className="m-3"> {fave.park_name }</h5 > 
              <button type = "button" className="" onClick = {e => this.deleteFavorite(this.props.location.state.userID, fave.park_id) }>X</button>
          </div>
  
       ) 
      )
       }
       else{
         list.push(
           <div key = {0}>
             <span>You don't have any favorites</span>
           </div>
         )
       }
      return list;
    }


    render()
    {
        return(
          <div className=" overflow-auto background">
                <img className="bgImg" src={require("../assets/ParkBg4.jpg")}></img>
          {/* <div>           */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand">Play Safe</a>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link to = {{pathname: '/HomePage',
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

            <div className = "jumbotron container">
              <h2 className = "center">Your Profile</h2>
              <div className = "">
                <div className = "w-100 text-center">
                  {/* <img id = "userCard" className = "rounded center"
                      src="data:image/jpeg;base64,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" alt="profile picture"/> */}
                    <img className="m-4 profileImg" src={require("../assets/profPic.jpg")} alt="userPic"/>
                </div>
                <div className = "w-100 d-flex flex-row flex-wrap">
                  <h5 className=" mt-7 mr-2">Favorites: </h5>
                  {this.displayFavorites()}
                </div>
              </div>
              <h4>My Incidents:</h4>
              {this.displayIncidents()}
              <h4 className = "mt-4">My Reviews:</h4>
              {this.displayMyReviews()}

              <div className = "card w-100 mt-4 p-3">
                <h5 className="">{this.state.userInfo.f_name} {this.state.userInfo.l_name}</h5>
                {/* <span className = "">First Name: {this.state.userInfo.f_name}</span>
                <span> Last Name: {this.state.userInfo.l_name}</span> */}
                <div className="">
                  <form className = "">
                    <label className="editLabel">Edit Username:</label>
                    <label className="">Edit Password:</label>
                    <div className="d-flex flex-row flex-wrap">
                      <input type="text"
                          id="userName"
                          name="userName"
                          value = {this.state.userName}
                          className="form-control border-dark w-25 text-left"
                          // onChange = {
                          //   e => this.setState({ : e.target.value }) }
                          // value={this.state.userName}
                          onChange={e => this.setState({userName: e.target.value})}
                      />
                        <button type = "button" className = "btn btn-primary ml-2" onClick = {() => this.changeUsername()}>
                                Save
                            </button>

                            <input type="text"
                              id="password"
                              name="password"
                              value = {this.state.password}
                              className="form-control border-dark w-25 text-left ml-5"
                              // onChange = {
                              //   e => this.setState({ : e.target.value }) }
                              // value={this.state.userName}
                              onChange={e => this.setState({password: e.target.value})}
                            />
                            <button type = "button" className = "btn btn-primary ml-2" onClick = {() => this.changePassword()}>
                                Save
                            </button> 
                      </div>
                         {/* <button type = "button" className = "btn btn-primary" onClick = {e => this.changeUsername()}>
                               Save Username
                          </button> */}

                    </form> 
                  </div>      
                </div>
              </div>
            </div>
        ) 
    }

    componentDidMount() {
      let userIdBody = {userID: this.props.location.state.userID}

      this.userRepo.getUser(userIdBody)
      .then(x => {
          // nsole.log("here")
          console.log("boom bitch get out the wayx")
          console.log(x[0])
          this.setState({
            userInfo: x[0],
            userName: x[0].username
        });
          // console.log(arr[0].park_id)
      })


      let userObj = {userID: this.props.location.state.userID}
      this.userRepo.getFavorites(userObj)
      .then(x => {
        this.setState({
          myFavorites: x
        });
       console.log(this.state.myFavorites)
     })

      this.userRepo.getMyIncidents(userObj)
      .then(x => {
        this.setState({
          myIncidents: x
        });
        console.log("Incidents:")
        console.log(this.state.myIncidents)
      })

      this.userRepo.getMyReviews(userObj)
      .then(x => {
        this.setState({
          myReviews: x
        });
      })





     
     
      // console.log(this.props)

      //let id = {userID: this.props.location.state.userID}

      // this.userRepo.getUser(id)
      // .then(arr => {
      //     console.log("here")
      //     console.log(arr)
      //     // console.log(arr[0].park_id)
      //     // this.setState({
      //     //     parks: arr
      //     // });
      // })
  }

}

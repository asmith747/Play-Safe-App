import React from 'react';//first thing have to do on every compone
import { ParkRepo } from '../api/ParkRepo'
import { UserRepo } from '../api/UserRepo'
import { Link } from 'react-router-dom';
import { Filter } from './filter'

export class HomePage extends React.Component{

    parkRepo = new ParkRepo();
    userRepo = new UserRepo();

    state = { 
        parks: [],
        showFilter: false,
        tennis: 0,
        basketball: 0,
        soccer: 0,
        pool: 0,
        skate: 0,
        bikeFriendly: 0,
        playground: 0,
        dogsAllowed: 0,
        doggieBags: 0,
        water: 0,
        trashcans: 0,
        fencedArea: 0,
        leashRequired: 0,
        shade: 0,
        filterNames: ["Tennis Court","Basketball Court","Soccer Field","Pool","Skate Park","Bike Friendly","Playground","Dog Friendly","Doggie Bags","Water","Trash Cans","Fenced Area","Leash Required","Shade"],
        filter: -1,
        filterRatings: ["colorRank","accessibilityAVG","atmosphereAVG","noiseAVG","cleanlinessAVG","equipmentAVG"],
        //"pet_freindlinessAVG",
        // isFavorite: [0,0,0,0,0,0,0,0,0,0,0],
        favorites: []
    };

    onSelect(park_id) {
        this.props.history.push({
            pathname: '/ParkPage',
            state: {id: park_id, userID: this.props.location.state.userID}
        });
        let id = {userID: this.props.location.state.userID}
    }

    // logout() {
    //     localStorage.clear();
    //     window.location.href = '/';
    // }

    addToFavorites(useID, park_id)
    {
        let bod = {userID: useID};
        this.userRepo.updateFavorites(park_id, bod)
        .then(arr => {
            window.location.reload(false);
            console.log("Add to favorites here")
            console.log(this.state.favorites)
            this.setState({
                favorites: arr
            });
            // window.location.reload(false);
        })
    }

    isFavorite(id){
        // console.log("hello")
        // console.log(this.state.favorites)
        for(let i = 0; i < this.state.favorites.length; i++){
            if(this.state.favorites[i].park_id == id){
                // console.log("yes")
                return true
            }
        }
            
        return false
    }

    displayParks() {
        const list = [];
        this.state.parks.map((park, i) => 
            list.push(
                <div id="boxy-card" className="overflow-auto rounded mb-4" key={i}>
                    {console.log(park.park_id)}
                    {/* <img className="float-left m-4"src="https://via.placeholder.com/150" alt="parkPic"/> */}
                    <img className="float-left m-3  homeParkImg" src={require("../assets/ParkBg2.jpg")} alt="parkPic"/>
                    <h4 className="float-left w-50 mt-3">{park.park_name}</h4>
                    {/* <button type="button" 
                            className="float-right mt-3 mx-3 bg-info text-light rounded buttonPadding"
                            onClick={() => this.addToFavorites(this.props.location.state.userID, park.park_id)}
                            >Add to Favorites</button> */}
                    <div className="d-flex flex-column flex-wrap float-right">
                        {/* {this.isFavorite(park.park_id) ? console.log("yes") : console.log("no")} */}
                        {/* {console.log(this.isFavorite(park.park_id))} */}
                        
                        <button type="button" 
                                className="float-right mt-3 mx-3 bg-secondary text-light rounded buttonPadding"
                                onClick={() => this.onSelect(park.park_id)}
                                >Basic Information</button>
                        {!this.isFavorite(park.park_id) ? 
                            <button type="button" 
                                className="float-right mt-3 mx-3 bg-primary text-light rounded buttonPadding"
                                onClick={() => this.addToFavorites(this.props.location.state.userID, park.park_id)}
                                >Add to Favorites</button>
                        : ''}
                    </div>
                    <p className="float-left w-50 text-secondary">{park.address}</p>
                     {/* <button type="button" className="float-right mx-3 bg-secondary text-light rounded buttonPadding">Add Favorite</button> */}
                     
                     {/* <p className="float-right">Open Time: {park.open_time}</p>
                    <p className="float-right">Close Time: {park.close_time}</p> */}
                    <p className="float-left w-50">Hours: {park.open_time} - {park.close_time}</p>
                    <p className="float-left w-50 card text-center">Maximum Occupancy: {park.capacity}</p>
                </div>
            )
        )
        return list;
    }

    showFilter(){
        this.setState({
            showFilter: !this.state.showFilter
        })
    }

    handleChange(name,val){
        console.log(name)
        if(name == "Tennis Court"){
            console.log(val)
            this.setState({
                tennis: val
            });
            console.log(this.state.tennis)
        }
        if(name == "Basketball Court"){
            console.log(val)
            this.setState({
                basketball: val
            });
            console.log(this.state.basketball)
        }
        if(name == "Soccer Field"){
            console.log(val)
            this.setState({
                soccer: val
            });
            console.log(this.state.soccer)
        }
        if(name == "Pool"){
            console.log(val)
            this.setState({
                pool: val
            });
            console.log(this.state.pool)
        }
        if(name == "Skate Park"){
            console.log(val)
            this.setState({
                skate: val
            });
            console.log(this.state.skate)
        }
        if(name == "Bike Friendly"){
            console.log(val)
            this.setState({
                bikeFriendly: val
            });
            console.log(this.state.bikeFriendly)
        }
        if(name == "Playground"){
            console.log(val)
            this.setState({
                playground: val
            });
            console.log(this.state.playground)
        }
        if(name == "Dog Friendly"){
            console.log(val)
            this.setState({
                dogsAllowed: val
            });
            console.log(this.state.dogsAllowed)
        }
        if(name == "Doggie Bags"){
            console.log(val)
            this.setState({
                doggieBags: val
            });
            console.log(this.state.doggieBags)
        }
        if(name == "Water"){
            console.log(val)
            this.setState({
                water: val
            });
            console.log(this.state.water)
        }
        if(name == "Trash Cans"){
            console.log(val)
            this.setState({
                trashcans: val
            });
            console.log(this.state.trashcans)
        }
        if(name == "Fenced Area"){
            console.log(val)
            this.setState({
                fencedArea: val
            });
            console.log(this.state.fencedArea)
        }
        if(name == "Leash Required"){
            console.log(val)
            this.setState({
                leashRequired: val
            });
            console.log(this.state.leashRequired)
        }
        if(name == "Shade"){
            console.log(val)
            this.setState({
                shade: val
            });
            console.log(this.state.shade)
        }
    }

    // updateFilter(i){
    //     // console.log(this.state.filterRatings[i])
    //     this.setState({
    //         filter: this.state.filterRatings[i]
    //     });
    //     console.log(this.state.filter)
    // }

    applyFilter(){
        //name: "Harry Moss",

        let f = this.state.filter
        if(f > 0){
            f = this.state.filterRatings[f]
        }
        
        let param = {tennis: this.state.tennis, basketball: this.state.basketball, soccer: this.state.soccer, pool: this.state.pool, skate: this.state.skate, bikeFriendly: this.state.bikeFriendly, playground: this.state.playground, dogsAllowed: this.state.dogsAllowed, doggieBags: this.state.doggieBags, water: this.state.water, fencedArea: this.state.fencedArea, leashRequired: this.state.leashRequired, shade: this.state.shade, filter: f}
        console.log(this.state.filterRatings[this.state.filter])
        
        this.parkRepo.search(param)
        .then(arr => {
            //console.log("here")
            console.log(arr)
            this.setState({
                parks: arr
            });
        })
    }

    clearFilter(){
        this.setState({
            tennis: 0,
            basketball: 0,
            soccer: 0,
            pool: 0,
            skate: 0,
            bikeFriendly: 0,
            playground: 0,
            dogsAllowed: 0,
            doggieBags: 0,
            water: 0,
            trashcans: 0,
            fencedArea: 0,
            leashRequired: 0,
            shade: 0,
            filter: -1,
            showFilter: false,
        });

        this.parkRepo.getParks()
        .then(arr => {
            //console.log("here 1")
            console.log(arr)
            // console.log(arr[0].park_id)
            this.setState({
                parks: arr
            });
        })
    }

    displayFilter(){
        if(this.state.showFilter == true){
            return (
                <form className="bg-primary">
                    <div className="bg-light">
                        <div className="d-flex flex-row flex-wrap">
                            {this.state.filterNames.map(x =>
                                <div key={x} className="checkFilter mr-3">
                                    <Filter name={x} key={x} handleChange={this.handleChange.bind(this)}/>
                                </div>
                            )}
                        </div>
                        <label htmlFor="filterRating" className="mx-2">Sort by: </label>
                        <select type="text"
                                id="filterRating"
                                name="filterRating"
                                className="mb-2"
                                value={this.state.filter}
                                onChange={e => this.setState({filter: e.target.value})} 
                                //onChange={e => this.updateFilter(e.target.value)} 
                                >
                                <option></option>
                                {//"Pet Friendliness",
                                    ["Color Rank","Accessibility","Atmosphere","Noise","Cleanliness","Equipment"].map(
                                        (x, i) => <option key={x} value={i}>{x}</option>
                                    )
                                }
                        </select>
                        <button type="button" className="mx-3 bg-primary text-light rounded buttonPadding buttonLength mb-2" onClick={() => this.applyFilter()}>Apply Filter</button>
                        <button type="button" className="mx-3 bg-light text-dark rounded buttonPadding buttonLength mb-2" onClick={() => this.clearFilter()}>Clear Filter</button>
                    </div>
                </form>
            )
        }
        else{
            return ''
        }
    }

    render(){
 
        return(
            <div className=" overflow-auto background">
                <img className="bgImg" src={require("../assets/ParkBg4.jpg")}></img>
              
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand">Play Safe</a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to={{pathname: '/HomePage', 
                                    state: {userID: this.props.location.state.userID}}} className="nav-link"> Home </Link>
                            </li>
                            <li className="nav-item">
                                {/* <Link to = {'/UserPage'} className="nav-link"> User Page</Link> */}
                                <Link to={{pathname: '/UserPage', 
                                    state: {userID: this.props.location.state.userID}}} 
                                    className="nav-link"> 
                                    User Page
                                </Link>
                            </li>
                        
                        </ul>
                        <button type="button" className="filterButton" onClick={() => this.showFilter()}>
                            Filter
                        </button>
                        <Link id="signOut"
                            to={{pathname: '/'}} 
                            className="nav-link"> 
                            Sign Out
                        </Link>
                    </div>
                </nav>


                <div className = "container">
                    {this.displayFilter()}
                    <h2 id = "homeTitle" className = "bg-success text-white text-center font-weight-bold mx-4 mb-4 mt-0 p-5">Parks in your Area</h2>
                    {/* {this.displayParkingList()} */}
                    {this.displayParks()}
                </div>
            </div>
          
        )   
    }


    componentDidMount() {
        let userIdBody = {userID: this.props.location.state.userID}
        this.parkRepo.getParks()
        .then(arr => {
            //console.log("here 1")

            console.log(arr)
            // console.log(arr[0].park_id)
            this.setState({
                parks: arr
            });
        })

        this.userRepo.getFavorites(userIdBody)
            .then(arr => {
                console.log("this the favorites bitch")
                console.log(arr)
                this.setState({
                    favorites: arr
                });
            })

        // let id = {userID: this.props.location.state.userID}
        // console.log(this.props)

        

        this.userRepo.getUser(userIdBody)
        .then(arr => {
            //console.log("here")
            console.log(arr)
            // console.log(arr[0].park_id)
            // this.setState({
            //     parks: arr
            // });
        })

        //let param = "soccer"
        //checkbox - 0,1 and filter: -1 or word
        //let param = {soccer: 1, filter: -1, name: "Harry"}
        // let param = {tennis: this.state.tennis, basketball: this.state.basketball, soccer: this.state.soccer, pool: this.state.pool, skate: this.state.skate, bikeFriendly: this.state.bikeFriendly, playground: this.state.playground, dogsAllowed: this.state.dogsAllowed, doggieBags: this.state.doggieBags, water: this.state.water, fencedArea: this.state.fencedArea, leashRequired: this.state.leashRequired, shade: this.state.shade, filter: this.state.filter}

        // this.parkRepo.search(param)
        // .then(arr => {
        //     console.log("here")
        //     console.log(arr)
        // })

        // this.userRepo.getFavorites()
        // .then(arr => {
        //     console.log("here")
        //     console.log(arr)
        //     // console.log(arr[0].park_id)
        // })
    }

}

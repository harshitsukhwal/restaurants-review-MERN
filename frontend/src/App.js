//this is the main file which will be link to others this is the main file for react frontend

import React from "react";                                //importing react
import {Switch, Route, Link } from "react-router-dom";    //import react router
import "bootstrap/dist/css/bootstrap.min.css";            //importing bootstrap

//Importing other components to the main file :-
import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";


function App() {
  const [user, setUser] = React.useState(null);   //create a state variable with initial value to null //set user update user variable later

  async function login( user = null) {   //login function
    setUser(user);                      //passing user function
  
  }

  async function logout() {
    setUser(null)
  }


  return (
    <div>
      <nav class="navbar navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/restaurants">Restaurants Review</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
        <Link to={"/restaurants"} className="nav-link">
              Restaurants
        </Link>
        </li>
        <li class="nav-item">
        
          { user ? (                              
            <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
              Logout {user.name}
            </a>
          ) : (            
          <Link to={"/login"} className="nav-link">
            Login
          </Link>
          )}        



        </li>
        
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown link
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

<div className="container mt-3">
  <Switch>
          <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
          <Route 
            path="/restaurants/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route 
            path="/restaurants/:id"
            render={(props) => (
              <Restaurant {...props} user={user} />
            )}
          />
          <Route 
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
  </Switch>
</div>
  

</div>
  );
}

export default App;

import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Home from './components/Home/Home';
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Shipment from "./components/Shipment/Shipment";
import Signup from "./components/SignUp/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';
import Details from "./components/Details/Details";
import { Navbar, Nav } from 'react-bootstrap';

export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  console.log('loggedinuser', loggedInUser)
  
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
       <Router>
        <div>
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand>City Riders</Navbar.Brand>
            <Nav style={{marginLeft:'860px'}} className="mr-auto">
              <Link style={{color:'white', textDecoration:'none',}} to="/home"> Home </Link>
              <Nav style={{marginLeft:"20px", color:'white'}} to="Detail">Detail</Nav>
              <Link style={{backgroundColor:'tomato',color:'white', textDecoration:'none', borderRadius:'2px',marginLeft:"20px", padding:'3px'}} to="/login">Log in</Link>
              {loggedInUser.email && <span style={{ color:'black', fontWeight:'bold', marginLeft:"20px", padding:'3px'}}>{loggedInUser.name}</span>}
            </Nav>
          </Navbar>

        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment />
          </PrivateRoute>
          <PrivateRoute path="/detail/:id">
            <Details />
          </PrivateRoute>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="*">
            <h1>No results were found</h1>
          </Route>
        </Switch>
      </div>
    </Router>
      
    </UserContext.Provider>
  );
}

export default App;

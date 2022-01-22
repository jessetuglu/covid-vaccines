import './scss/App.scss';
import React from 'react';
import './components/Navbar';
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Remove from "./components/Remove";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Data from "./components/Data";
import Login from './components/Login';
import Account from './components/Account';
import PrivateRoute from "./components/PrivateRoute";
import {BrowserRouter,Switch, Route} from "react-router-dom";

class App extends React.Component{
    render(){
      return (
        <div className="homepage">
           <Navbar/>
           <BrowserRouter>
               <Switch>
                   <Route exact path={"/register"} component={Register}></Route>
                   <Route exact path={"/login"} component={Login}></Route>
                   <Route exact path={"/about"} component={About}></Route>
                   <Route exact path={"/data-policy"} component={Data}></Route>
                   <Route exact path={"/contact"} component={Contact}></Route>
                   <Route exact path={"/user:"} component={Remove}></Route>
                   <PrivateRoute path={"/account"} component={Account}/>
                   <Route exact path={"/"} component={Home}></Route>
               </Switch>
           </BrowserRouter>
        </div>
      )
    }
}

export default App;

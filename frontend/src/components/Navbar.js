import React from "react";
import Covid from '../assets/covid.png';
import { connect } from 'react-redux';
import {logoutAction} from '../features/user/actions';
import {logoutUser} from "../utils/userRequests";
class Navbar extends React.Component{
    constructor(props) {
        super(props);
        this.expandBurger = this.expandBurger.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {mobileBurger:false};
    }
    componentDidMount() {
        if (window.innerWidth < 760){
            this.setState({mobileBurger:true});
        }
    }

    handleLogout(e){
        e.preventDefault();
        logoutUser().then((response)=>{
            if (response === true){
                this.props.history.push('/');
                console.log("User logged out successfully.")
            }
            else{
                console.log(response);
            }
        }).catch((e)=>{
            console.log(e);
        })
    }
    expandBurger(e){
        if (e.target.classList.contains("is-active")){
            e.target.classList.remove("is-active");
            document.getElementById("navbar-navigation").classList.remove("is-active");
        }
        else{
            e.target.classList.add("is-active");
            document.getElementById("navbar-navigation").classList.add("is-active");
        }

    }
    render() {
        return (
            <div className="homepage">
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="/">
                            C<img className="brand-image" src={Covid}/>VID
                        </a>

                        <a role="button" className="navbar-burger" aria-label="menu" onClick={this.expandBurger} aria-expanded="false"
                           data-target="navbar-navigation">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                            {this.state.mobileBurger ? (
                                <div id="navbar-navigation" className="navbar-menu">
                                    <div className="navbar-start">
                                        {this.props.user != null ?<a className="navbar-item" href="/account">
                                            Your Account
                                        </a>:null}
                                        <div className="navbar-item has-dropdown is-hoverable">
                                            <a className="navbar-item"href={"/about"}>
                                                About
                                            </a>
                                            <a className="navbar-item"  href={"/contact"}>
                                                Contact
                                            </a>
                                            {this.props.user != null ? (
                                                    <a className="button navbar__login-button" onClick={this.handleLogout}>
                                                        Log out
                                                    </a>) :
                                                <div>
                                                    <a className="button navbar__sign-up-button" href={'/register'}>
                                                        <strong>Sign up</strong>
                                                    </a>
                                                    <a className="button navbar__login-button" href={'/login'}>
                                                        Log in
                                                    </a>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div id="navbar-navigation" className="navbar-menu">
                                    <div className="navbar-start">
                                        <div className="navbar-item has-dropdown is-hoverable">
                                            <a className="navbar-link">
                                                More
                                            </a>

                                            <div className="navbar-dropdown">
                                                <a className="navbar-item"href={"/about"}>
                                                    About
                                                </a>
                                                <a className="navbar-item"  href={"/contact"}>
                                                    Contact
                                                </a>
                                            </div>
                                        </div>
                                        <div className="navbar-end">
                                            <div className="navbar-item">
                                                <div className="buttons">
                                                    {this.props.user != null ? (
                                                        <div>
                                                            <a className="button navbar__sign-up-button" href={"/account"}>
                                                                Your Account
                                                            </a>
                                                            <a className="button navbar__login-button" onClick={this.handleLogout}>
                                                                Log out
                                                            </a>
                                                        </div>):
                                                        <div>
                                                            <a className="button navbar__sign-up-button" href={'/register'}>
                                                                <strong>Sign up</strong>
                                                            </a>
                                                            <a className="button navbar__login-button" href={'/login'}>
                                                                Log in
                                                            </a>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                </nav>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return state.user;
};
export default connect(mapStateToProps, { logoutAction })(Navbar);

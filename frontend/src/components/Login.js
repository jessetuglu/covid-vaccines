import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginAction } from '../features/user/actions';
import {loginUser} from "../utils/userRequests";
import ReactGA from "react-ga";


class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {hasLoggedIn: false, isChecked:false, email:'',password:'', errors:""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePassword = this.togglePassword.bind(this);
    }
    handleChange(e){
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value});
    }
    componentDidMount() {
        ReactGA.initialize('UA-192649741-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    handleSubmit(e){
        e.preventDefault();
        loginUser(this.state.email,this.state.password).then((response)=>{
            if(response === true){
                this.setState({hasLoggedIn:true});
            }
            else{
                this.setState({errors:response,email:'',password:''});
            }
        })
    }
    togglePassword(e){
        this.setState({isChecked:!this.state.isChecked});
        const passwordInput = document.getElementById("password-field");
        passwordInput.setAttribute("type",passwordInput.getAttribute("type") == "password" ? "text":"password");
        console.log(passwordInput.getAttribute("type"));
    }
    render(){
        return(
            <div className={"login container is-max-desktop"}>
                {this.state.hasLoggedIn ? <Redirect to={"/account"}/> :
                    <div className={"login__form"}>
                        <div className={"field"}>
                            <label className={"label register-form__label"}>Email</label>
                            <div className={'control'}>
                                <input name="email" onChange={this.handleChange} value={this.state.email} placeholder={"Email"} className={"input"} type={"email"}/>
                            </div>
                        </div>
                        <div className={"field"}>
                            <label className={"label register-form__label"} >Password</label>
                            <div className={'control'}>
                                <input id="password-field" name="password" onChange={this.handleChange} value={this.state.password} placeholder={"Password"} className={"input"} type={"password"}/>
                            </div>
                        </div>
                        <label className="checkbox">
                            <input type="checkbox" checked={this.state.isChecked} onChange={this.togglePassword}/>
                            {' '}Show password
                        </label>
                        <br/>
                        <button className={"button button-submit button-submit-primary"} onClick={this.handleSubmit}>Login</button>
                        <br/>
                        <p>{this.state.errors == null ? "": this.state.errors}</p>
                    </div>
                }
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return state.user;
};
export default connect(mapStateToProps, { loginAction })(Login);
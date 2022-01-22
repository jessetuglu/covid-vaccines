import React from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { registrationAction } from '../features/user/actions';
import {registerUser} from '../utils/userRequests';
import ReactGA from "react-ga";

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {hasRegistered: false,first_name:"",last_name:"",email:"",state:"",password:"", zip:"",message:"", isChecked:false}
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
        registerUser(this.state.first_name,this.state.last_name,this.state.email,this.state.password,this.state.zip, this.state.state).then((response)=>{
            if(response === true){
                this.setState({hasRegistered:true});
            }
            else{
                this.setState({message:response, first_name:"",last_name:"",email:"",state:"",password:"", zip:"", isChecked:false});
            }
        })
    }
    togglePassword(e){
        this.setState({isChecked:!this.state.isChecked});
        const passwordInput = document.getElementById("password-field");
        passwordInput.setAttribute("type",passwordInput.getAttribute("type") == "password" ? "text":"password");
        console.log(passwordInput.getAttribute("type"));
    }
    render() {
        return (

            <div className={"register container is-max-desktop"}>
                {this.state.hasRegistered ? (<Redirect to={"/account"}/>) :
                    <div>
                <div className={"field"}>
                    <label className={"label register-form__label"} >First Name</label>
                    <div className={'control'}>
                        <input name="first_name" onChange={this.handleChange} value={this.state.first_name} placeholder={"First Name"} className={"input"} type={"text"}/>
                    </div>
                </div>
                <div className={"field"}>
                    <label className={"label register-form__label"} >Last Name</label>
                    <div className={'control'}>
                        <input name="last_name" onChange={this.handleChange} value={this.state.last_name} placeholder={"Last Name"} className={"input"} type={"text"}/>
                    </div>
                </div>

                <div className={"field"}>
                    <label className={"label register-form__label"} >Enter the email you would like to be contacted at.</label>
                    <div className={'control'}>
                        <input name="email" onChange={this.handleChange} placeholder={"Email"} value={this.state.email} className={"input"} type={"email"}/>
                    </div>
                </div>

                <div className={"field"}>
                    <label className={"label register-form__label"} >Enter a secure password.</label>
                    <div className={"control"}>
                        <input id="password-field" name="password" onChange={this.handleChange} placeholder={"Password"} value={this.state.password} className={"input"} type={"password"}/>
                    </div>
                </div>

                <div className={"field"}>
                    <label className={"label register-form__label"} >Confirm password.</label>
                    <div className={"control"}>
                        <input name="password_confirmation" onChange={this.handleChange} placeholder={"Confirm password"} value={this.state.password_confirmation} className={"input"} type={"password"}/>
                    </div>
                </div>

                <label className="checkbox">
                    <input type="checkbox" checked={this.state.isChecked} onChange={this.togglePassword}/>
                    {' '}Show password
                </label>
                <div className={"field"}>
                    <label className={"label register-form__label"} >State</label>
                    <div className={"control"}>
                        <select name="state" defaultValue={"AL"} onChange={this.handleChange} value={this.state.state} className={"select"}>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                    </div>
                </div>
                <div className={"field"}>
                    <label className={"label register-form__label"} >ZIP (Optional)</label>
                    <div className={"control"}>
                        <input name="zip" onChange={this.handleChange} placeholder={"Zip"} value={this.state.zip} className={"input"} type={"text"}/>
                    </div>
                </div>
                <button className={"button button-submit button-submit-primary"} onClick={this.handleSubmit}>Register</button>
                <br/>
                {this.state.message === null ? null:<small>{this.state.message}</small>}
                    </div>
                }
            </div>

        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return state.user;
};
export default connect(mapStateToProps, { registrationAction })(Register);
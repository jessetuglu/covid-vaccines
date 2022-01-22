import React from 'react';
import { connect } from 'react-redux';
import {updateAction} from "../features/user/actions";
import {getVaccines, zipToLatLong} from "../utils/vaccineRequests";
import {deleteUser, updateUser} from "../utils/userRequests";
import {Redirect} from "react-router-dom";
import ReactGA from "react-ga";
let medicationGuidsDefault = ["779bfe52-0dd8-4023-a183-457eb100fccc","a84fb9ed-deb4-461c-b785-e17c782ef88b","784db609-dc1f-45a5-bad6-8db02e79d44f"];
var zipcodes = require('zipcodes');
class Account extends React.Component{
    componentDidMount() {
        ReactGA.initialize('UA-192649741-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoggedOut:false,
            first_name:this.props.user.first_name,
            last_name:this.props.user.last_name,
            email:this.props.user.email,
            wants_mail:this.props.user.wants_mail,
            zip:this.props.user.zip,
            state:this.props.user.state,
            useCurrentLocation:false,
            vaccine_one: false,
            vaccine_two: false,
            vaccine_three: false,
            vaccineLocationData:null,
            didSubmitVaccineForm:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleVaccineSearch = this.handleVaccineSearch.bind(this);
        this.updateAccount = this.updateAccount.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }
    handleChange(e){
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value});
    }

    handleCheckbox(e){
        this.setState({[e.target.name]:e.target.checked ? true: false});
    }

    updateAccount(e){
        e.preventDefault();
        let user = {
            user:{
                first_name: this.state.first_name,
                last_name:this.state.last_name,
                email:this.state.email,
                state:this.state.state,
                wants_mail: this.state.wants_mail,
                zip:this.state.zip
            }
        };
        updateUser(user).then((response)=>{
            console.log("Successfully updated user.");
        }).catch((e)=>{
            console.log(e,"ERROR updating user.");
        });

    }

    handleVaccineSearch(e){
        e.preventDefault();
        this.setState({vaccineLocationData:null, didSubmitVaccineForm:true})
        let medicationGuids = [];
        if (this.state.vaccine_one){
            medicationGuids.push(medicationGuidsDefault[0]);
        }
        if (this.state.vaccine_two){
            medicationGuids.push(medicationGuidsDefault[1]);
        }
        if(this.state.vaccine_three){
            medicationGuids.push(medicationGuidsDefault[2]);
        }
        var lat, long;
        let locationList = zipcodes.lookup(this.state.zip);
        lat = locationList.latitude;
        long = locationList.longitude;
        getVaccines(lat,long,medicationGuids).then((response)=>{
            this.setState({vaccineLocationData:response, didSubmitVaccineForm:true})
        });
    }
    deleteAccount(e){
        e.preventDefault();
        deleteUser(this.props.user).then((response)=>{
            this.props.history.push('/');
        }).catch((e)=>{
            console.log("Error deleting account.");
        })
    }

    render(){
        return(<div className={"container is-max-desktop"}>
            {this.props.user === null ? <Redirect to={"/"}/>:(<div>
            <section className={'hero'}>
                <div className={'hero-body '}>
                    <h1 className={'title is-size-1'}>Welcome, {this.state.first_name}.</h1>
                    <p className={"subtitle has-background-info-light p-2"}>Your account is where you can update your email preferences, account details, and search for vaccines near you.</p>
                </div>
            </section>
            <section className={'hero'}>
                <div className={'hero-body'}>
                    <h1 className={'title is-size-3'}>Your Account Details</h1>
                    <input className={"input"} onChange={this.handleChange} defaultValue={this.props.user.first_name} type={"text"} value={this.state.first_name} name={"first_name"}/>
                    <input className={"input"} onChange={this.handleChange} defaultValue={this.props.user.last_name} type={"text"} value={this.state.last_name} name={"last_name"}/>
                    <input className={"input"} onChange={this.handleChange} defaultValue={this.props.user.email} type={"email"} value={this.state.email} name={"email"}/>
                    <input className={"input"} onChange={this.handleChange} defaultValue={this.props.user.zip} type={"text"} value={this.state.zip} name={"zip"}/>
                    <div className={"select"}>
                        <select name="state" defaultValue={this.state.state} onChange={this.handleChange} value={this.state.state}>
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
                    <br/>
                    <label className="checkbox">
                        <input type="checkbox" name={"wants_mail"} checked={this.state.wants_mail} onChange={this.handleCheckbox}/>
                        {' '}Yes, I want to be notified immediately when there <b>are</b> vaccines in my area.
                    </label>
                    <br/>
                    <span>
                        <button className={"button account__update-button m-2"} onClick={this.updateAccount}>Update Details</button>
                        <button className={"button is-danger m-2 is-disabled"} onClick={this.deleteAccount}>Delete Account</button>
                    </span>

                </div>
            </section>
            <section className={'hero'}>
                <div className={'hero-body'}>
                    <h1 className={'title is-size-3'}>Search for Vaccines.</h1>
                    <p className={"subtitle has-background-info-light p-2"}>Simply select which vaccines you are looking for.</p>
                </div>
                <div className={"content container has-background-info-light mx-6"}>
                    <span>
                        <label className="checkbox account__vaccine-box">
                            <input type="checkbox" name={"vaccine_one"} checked={this.state.vaccine_one} onChange={this.handleCheckbox}/>
                            {' '} Moderna COVID Vaccine
                        </label>
                        <label className="checkbox account__vaccine-box">
                            <input type="checkbox" name={"vaccine_two"} checked={this.state.vaccine_two} onChange={this.handleCheckbox}/>
                            {' '} Pfizer-BioNTech COVID Vaccine
                        </label>
                        <label className="checkbox account__vaccine-box">
                            <input type="checkbox" name={"vaccine_three"} checked={this.state.vaccine_three} onChange={this.handleCheckbox}/>
                            {' '} Johnson & Johnson's COVID Vaccine
                        </label>
                    </span>
                    <br/>
                    <button className={"button is-danger m-4"} onClick={this.handleVaccineSearch}>Search</button>
                    <br/>
                    {this.state.didSubmitVaccineForm && this.state.vaccineLocationData === null ? <progress class="progress is-small is-primary" max="100">15%</progress>:null}
                    <br/>
                </div>
                </section>
                    {this.state.vaccineLocationData === null ? null: (
                        this.state.vaccineLocationData.map((location,key)=>{
                            return (
                                <div className={"card account__vaccine-location-card mx-6 p-1"}>
                                    <div className={"content"}>
                                        <h4>{location.name}</h4>
                                        <p>{location.address1}, {location.city}, {location.state}, {location.zip}</p>
                                        <p>{location.phone}</p>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
                )}
        </div>)
    }
}
const mapStateToProps = (state, ownProps) => {
    return state.user;
};
export default connect(mapStateToProps, { updateAction })(Account);
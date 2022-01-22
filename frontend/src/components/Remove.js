import React from "react";
import axios from 'axios';

class Remove extends React.Component{
    constructor(props) {
        super(props);
        this.state = {email:"", message:null};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    handleSubmit(e){
        e.preventDefault();
        let user = {email:this.state.email};
        axios.post("https://frozen-escarpment-92667.herokuapp.com/remove",{user:user},{withCredentials: true}).then((response)=>{
            this.setState({email:"", message:response.data.status});
            return response;
        }).catch((e)=>{
            return e;
        })

    }
    render() {
        return(
            <div className={"form-container container mx-auto"}>
                <form className={"remove-form"}>
                    <label className={"remove-form__label"} >Please enter your email.</label>
                    <input name="email" value={this.state.email} onChange={this.handleChange} placeholder={"Email"} className={"form-control remove-form__input"} type={"email"}/>
                    <button onClick={this.handleSubmit}className={"btn btn-dark"}>Remove</button>
                    <br/>
                    {this.state.message === null ? null:<small>{this.state.message}</small>}
                </form>
            </div>
        )
    }
}
export default Remove;
import React from 'react'
import {getCVSVaccines} from "../utils/vaccineRequests";
import ReactGA from 'react-ga';
class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data: null, showPanels: false};
        this.showPanels = this.showPanels.bind(this);
    }

    componentDidMount() {
        ReactGA.initialize('UA-192649741-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
        getCVSVaccines().then((response) => {
            this.setState({data: response});
        }).catch((e) => {
            console.log(e);
        })
    }

    showPanels(e) {
        e.preventDefault();
        this.setState({showPanels: this.state.showPanels ? false : true});
    }

    render() {

        return (
            <div className={"homepage mx-4"}>
                <section className={"hero"}>
                    <div className={"hero-body"}>
                        <h1 className={"title is-size-1"}>Welcome.</h1>
                        <h1 className={"subtitle"}>
                            This website is built for you. Please use it as a tool for yourself, friends, or family.
                            <br/>
                            Consider giving this website a share.
                        </h1>
                    </div>
                </section>
                <section className={"hero"}>
                    <div className={"hero-body"}>
                        <h1 className={"title is-size-3"}>How does it work?</h1>
                        <h1 className={"subtitle"}>
                            Great question. Two simple steps:
                            <br/>
                            <ul>
                                <li>
                                    1. Register a <i>free</i> account.
                                </li>
                                <li>
                                    2. Wait for emails!
                                </li>
                            </ul>
                            For more questions, check out the <a href={'/about'}>About</a> page.
                        </h1>
                    </div>
                </section>

                <section className={"hero"}>
                    <div className={"hero-body"}>
                        <h1 className={"title is-size-3"}>How is My Data Stored?</h1>
                        <h1 className={"subtitle"}>
                            Another great question. Check out the <a href={'/data-policy'}>Data Policy</a> page.
                        </h1>
                    </div>
                </section>

                <section className={'hero'}>
                    <div className={'hero-body '}>
                        <h1 className={'title is-size-3'}>CVS Vaccines</h1>
                        <p className={"subtitle has-background-info-light p-2"}>Below, you'll find a list of CVS
                            vaccines in every state.</p>
                        <button className={"button is-light is-info"} onClick={this.showPanels}>{this.state.showPanels ? "Hide Vaccines":"Show Vaccines"}</button>
                    </div>
                </section>
                <div className={"container is-centered is-max-desktop"}>
                {this.state.data != null && this.state.showPanels ?
                    <table className={"table is-hoverable is-fullwidth\n"}>
                        <thead>
                        <th>State</th>
                        <th>City</th>
                        <th>Status</th>
                        </thead>
                    <tbody>
                        {this.state.data.map((state)=>{
                            console.log(state);
                            return (
                                state.map((city)=>{
                                console.log(city);
                                return (
                                    <tr>
                                        <td>{city.state}</td>
                                        <td>{city.city}</td>
                                        <td>{city.status}</td>
                                    </tr>
                                )
                            })
                        )})}
                    </tbody>
                    </table>
                    :null

                }
                </div>
            </div>
        )
    }

}
export default Home;

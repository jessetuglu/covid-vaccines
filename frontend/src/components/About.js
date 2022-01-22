import React from 'react';
import ReactGA from "react-ga";

class About extends React.Component{
    componentDidMount() {
        ReactGA.initialize('UA-192649741-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    render(){
        return(
            <div className={"about mx-6"}>
                <section className={"hero"}>
                    <div className={"hero-body"}>
                        <h1 className={"title is-size-1"}>About</h1>
                        <h1 className={"subtitle is-centered "}>
                            This website is meant to serve as a multi-functioning vaccine information hub. While you can just receieve emails on it, the developer is planning to put maps functionality, as well as vaccine registration in the near future.
                        </h1>
                    </div>
                </section>
            </div>
        )
    }
}
export default About;
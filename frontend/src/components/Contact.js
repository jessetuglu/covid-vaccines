import React from 'react';
import ReactGA from "react-ga";

class Contact extends React.Component{
    componentDidMount() {
        ReactGA.initialize('UA-192649741-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    render(){
        return(
            <div className={"contact"}>
                <section className={"hero"}>
                    <div className={"hero-body"}>
                        <h1 className={"title is-size-1"}>Contact</h1>
                        <h1 className={"subtitle is-centered "}>
                            This website was developed by Jesse Tuglu. You can contact me or report any bugs at <a href={"mailto:tuglu@bc.edu"}>tuglu@bc.edu</a>.
                        </h1>
                    </div>
                </section>
            </div>
        )
    }
}
export default Contact;
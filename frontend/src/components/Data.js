import React from 'react';

class Data extends React.Component{
    render(){
        return(
            <div className={"about mx-6"}>
                <section className={"hero"}>
                    <div className={"hero-body"}>
                        <h1 className={"title is-size-1"}>Data Policy</h1>
                        <h1 className={"subtitle is-centered "}>
                            Sensitive user data is hashed, salted, and stored in our secure database. If you have questions, please contact me: <a href={"mailto:tuglu@bc.edu"}>tuglu@bc.edu</a>.
                        </h1>
                    </div>
                </section>
            </div>
        )
    }
}
export default Data;
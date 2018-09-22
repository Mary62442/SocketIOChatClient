import React, { Component } from 'react';

class UserWindow extends Component {
    constructor(props) {
        super(props);
    }


    submitUsernameToParent = () => {
        let usr = this.refs.username.value;
        if (usr==="") return;
        this.props.callbackToParent(this.refs.username.value, true);
    }

    render() {
        return(
            <div>
            <p>Choose a username</p>
            <input ref = "username" type="text"/>
            <button onClick={this.submitUsernameToParent}>Submit username</button>
            </div>
        )
    }
}
export default UserWindow;
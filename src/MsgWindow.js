import React, { Component } from 'react';
import './App.css';

class MsgWindow extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        let messages = this.props.messages.map((message, index) => {
            return(
                <div className = "msg-container" key={index}>
                    <div className = "single-msg">
                        <h4>{message.username}</h4>
                        <p>{message.text}</p>
                    </div>                        
                    <span>{message.time}</span>
                </div>
            )
        })
        return(
            <div className ="all-msgs">
            {messages}
            </div>
        )
    }
}
export default MsgWindow;
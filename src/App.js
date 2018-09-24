import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import MsgWindow from './MsgWindow';
import UserWindow from './UserWindow';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint : "http://localhost:8080/",    
      username: "",
      isLogged: false,
      messages: []
    };    
  }

  componentWillUnmount() {
    if (this.socket) this.socket.close()
  }
  

  usernameFromChild = (usr, logged) => {    
    this.setState({
      username:usr,
      isLogged:logged
    });   
    this.socket = socketIOClient(this.state.endpoint); 
    this.socket.on("new message from server", (msg) => {
        
      this.setState({
        messages: [...this.state.messages, msg]
      });
      
    }); 
  };

  logOut = () => {
    this.setState({
      username:"",
      isLogged:false,
      messages: []
    });

    this.socket.close()
  }

  sendMessage = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let newMsg = {username:this.state.username, time: new Date()};
      newMsg.text = e.target.value; 
      e.target.value = "";
      this.socket.emit("new message from client", newMsg);
      console.log(newMsg);
    }
    else return;
  }
  

   render() {   

    const SocketChat = (props) => {    
      if (this.state.isLogged) {
        return (
          <div>
            <div className = "user-welcome">
              <h2>Hello {this.state.username}!</h2>
              <button onClick={this.logOut}>Log Out</button>
            </div>          
            <textarea onKeyPress={this.sendMessage} rows ="5" placeholder="Write your message here..."></textarea>          
            <MsgWindow messages = {this.state.messages}/>
            </div>
        ) 
      }
      else return <UserWindow callbackToParent = {this.usernameFromChild}/>
    }
   

    return (
      <div className="App">
        <div className ="socket-chat">
          <h1>Socket Project</h1>
          <SocketChat />   
        </div>          
      </div>
    );
  }
}

export default App;

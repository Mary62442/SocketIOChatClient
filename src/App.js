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
      messages: [{username:"mary", text:"The prime minister is sticking by her Chequers plan for future co-operation despite European leaders attacking it. She is meeting senior ministers as pressure grows on her to ditch it in favour of a Canada-style trade accord. Hello there!", time: new Date()}, {username:"diego", text:"Hello", time: new Date()}]
    };
    
  }

  componentDidMount() {    
    
  }

  componentWillUnmount() {
    if (this.socket) this.socket.close()
  }
  

  usernameFromChild = (usr, logged) => {    
    this.setState({
      username:usr,
      isLogged:logged
    });   
    //this.socket = socketIOClient(this.state.endpoint); 
  };

  logOut = () => {
    this.setState({
      username:"",
      isLogged:false
    });

    //this.socket.close()
  }

  sendMessage = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let newMsg = {username:this.state.username, time: new Date()};
      newMsg.message = e.target.value; 
      e.target.value = "";
    }

    else return;
  }
  

   render() {   

    if (this.socket) {
      this.socket.on('change time', (socketTime) => {
        this.setState({time:socketTime});
      }); 
    }


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

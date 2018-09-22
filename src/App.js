import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import ChatWindow from './ChatWindow';
import UserWindow from './UserWindow';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint : "http://localhost:8080/",    
      username: "",
      isLogged: false
    };
    //this.socket = socketIOClient(this.state.endpoint);
  }

  componentDidMount() {    
    /* this.socket.on('change time', (socketTime) => {
      this.setState({time:socketTime});
    }); */
  }

  componentWillUnmount() {
    //this.socket.close()
  }
  

  usernameFromChild = (usr, logged) => {    
    this.setState({
      username:usr,
      isLogged:logged
    });    
  };
  

   render() {   
     console.log(this.state.username);

    const SocketChat = (props) => {    
      if (this.state.isLogged) {
        return <ChatWindow />;
      }
      return <UserWindow callbackToParent = {this.usernameFromChild}/> ;
    }
   

    return (
      <div className="App">
        <h1>Socket Project</h1>
        <SocketChat />      
        
      </div>
    );
  }
}

export default App;

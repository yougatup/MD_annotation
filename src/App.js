import React, { Component } from 'react';
import './App.css';

import { ChatRoom } from "./components/ChatRoom/ChatRoom.js";
import { LeftSideBar } from "./components/LeftSideBar/LeftSideBar.js";
import { RightSideBar } from "./components/RightSideBar/RightSideBar.js";

class App extends Component{

  // this.state = {
  //   endConversation: false,
  //   nextConversation: false,
  // }


  // this.controlStatus = (dataFromChild) => {
  //   const { endConversation } = this.state;
  //   this.setState({
  //     endConversation: dataFromChild,
  //     nextConversation: dataFromChild,
  //   })
  //   this.updateRenderUntilSysBot();
  // }

  render(){
      return (
        <div class="backGround">
          <div class="leftSideBar">
            <LeftSideBar />
          </div>
          <main class="chatGrid chatStyle">
            <ChatRoom />
          </main>
          <div class="rightSideBar">
            <RightSideBar />
          </div>
        </div>
      );
    }
  }

  

export default App;

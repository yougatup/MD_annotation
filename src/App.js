import React, { Component } from 'react';
import './App.css';
import { fire } from './shared/Firebase';

import { ChatRoom } from "./components/ChatRoom/ChatRoom.js";
import { LeftSideBar } from "./components/LeftSideBar/LeftSideBar.js";
import { RightSideBar } from "./components/RightSideBar/RightSideBar.js";

class App extends Component{

  constructor(props) {
    super(props);
    fire();
    this.state = {
      // Check the conversation status
      end: false,
      start: false,

      // Control each button's disabled status
      endButtonStatus: false,
      nextButtonStatus: false,
    };
    this.controlEndButtonStatus = this.controlEndButtonStatus.bind(this);
    this.controlNextButtonStatus = this.controlNextButtonStatus.bind(this);
    this.controlEndStatus = this.controlEndStatus.bind(this);
    this.controlStartStatus = this.controlStartStatus.bind(this);
  }

  // Control the 'endButtonStatus'
  controlEndButtonStatus = () => {
    this.setState(prevState => ({
      endButtonStatus: !prevState.endButtonStatus,
    }));
  }

  // Control the 'nextButtonStatus'
  controlNextButtonStatus = () => {
    this.setState(prevState => ({
      nextButtonStatus: !prevState.nextButtonStatus,
    }));
  }

  // When each conversation is ended, this function can check the status
  controlEndStatus = () => {
    this.setState(prevState => ({
      end: !prevState.end,
    }));
  }

  // When each conversation is started, this function can check the status
  controlStartStatus = () => {
    this.setState(prevState => ({
      start: !prevState.start
    }));
  }

  render(){
    const { end, start, endButtonStatus, nextButtonStatus } = this.state;
    const { controlEndButtonStatus, controlNextButtonStatus, controlEndStatus, controlStartStatus } = this;
    
    return (
      <div class="backGround">
        <div class="leftSideBar">
          <LeftSideBar />
        </div>
        <main class="chatGrid chatStyle">
          <ChatRoom 
            end={end}
            start={start}
            controlEndButtonStatus={controlEndButtonStatus}
            controlEndStatus={controlEndStatus}
            controlStartStatus={controlStartStatus}
          />
        </main>
        <div class="rightSideBar">
          <RightSideBar 
            endButtonStatus={endButtonStatus}
            nextButtonStatus={nextButtonStatus}
            controlEndButtonStatus={controlEndButtonStatus}
            controlNextButtonStatus={controlNextButtonStatus}
            controlEndStatus={controlEndStatus} 
            controlStartStatus={controlStartStatus}
          />
        </div>
      </div>
    );
  }
}

export default App;

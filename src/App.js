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
      u_id: '',

      // Check the conversation status
      end: false,
      start: false,
      
      // Control the device
      devicePath: '',
      botTurnStatus: false,
      targetDevice: '',
      click_state: 0,

      // Control each button's disabled status
      endButtonStatus: false,
      nextButtonStatus: false,
    };
    this.deviceListConvey = this.deviceListConvey.bind(this);
    this.initializeDevicePath = this.initializeDevicePath.bind(this);
    this.changeBotTurnStatus = this.changeBotTurnStatus.bind(this);
    this.setTargetDevice = this.setTargetDevice.bind(this);
    this.controlEndButtonStatus = this.controlEndButtonStatus.bind(this);
    this.controlNextButtonStatus = this.controlNextButtonStatus.bind(this);
    this.controlEndStatus = this.controlEndStatus.bind(this);
    this.controlStartStatus = this.controlStartStatus.bind(this);
  }

  componentDidMount() {
    this.idGeneration();
  }

  idGeneration = () => {
    let string = ''

    for (var i=0; i<2; i++){
      string = string + Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1)
    }

    this.setState({
      u_id: string
    })
  }

  deviceListConvey = (path) => {
    this.setState({
      devicePath: path
    })
  }

  initializeDevicePath = () => {
    this.setState({
      devicePath: '',
    })
  }

  changeBotTurnStatus = (bool) => {
    this.setState({
      botTurnStatus: bool,
    })
  }

  setTargetDevice = (target, state) => {
    this.setState({
      targetDevice: target,
      click_state: state,
    })
  }

  // Control the 'endButtonStatus'
  controlEndButtonStatus = () => {
    this.setState(prevState => ({
      endButtonStatus: !prevState.endButtonStatus,
    }));
  }

  // Control the 'endButtonStatus'
  blockEndButtonStatus = () => {
    this.setState({
      endButtonStatus: false,
    })
  }

  // Control the 'endButtonStatus'
  unblockEndButtonStatus = () => {
    this.setState({
      endButtonStatus: true,
    })
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
    const { end, start, endButtonStatus, nextButtonStatus, devicePath, botTurnStatus, targetDevice, u_id, click_state } = this.state;
    const { controlEndButtonStatus, initializeDevicePath, blockEndButtonStatus, unblockEndButtonStatus,
      controlNextButtonStatus, controlEndStatus, controlStartStatus, deviceListConvey, changeBotTurnStatus, setTargetDevice } = this;
    
    return (
      <div class="backGround">
        <div class="leftSideBar">
          <LeftSideBar 
            u_id={u_id}
          />
        </div>
        <main class="chatGrid chatStyle">
          <ChatRoom 
            end={end}
            start={start}
            u_id={u_id}
            deviceListConvey={deviceListConvey}
            blockEndButtonStatus={blockEndButtonStatus}
            unblockEndButtonStatus={unblockEndButtonStatus}
            controlEndButtonStatus={controlEndButtonStatus}
            controlEndStatus={controlEndStatus}
            controlStartStatus={controlStartStatus}
            controlNextButtonStatus={controlNextButtonStatus}
            changeBotTurnStatus={changeBotTurnStatus}
            targetDevice={targetDevice}
            click_state={click_state}
          />
        </main>
        <div class="rightSideBar">
          <RightSideBar
            initializeDevicePath={initializeDevicePath}
            end={end}
            devicePath={devicePath}
            endButtonStatus={endButtonStatus}
            nextButtonStatus={nextButtonStatus}
            controlEndButtonStatus={controlEndButtonStatus}
            controlNextButtonStatus={controlNextButtonStatus}
            controlEndStatus={controlEndStatus} 
            controlStartStatus={controlStartStatus}
            botTurnStatus={botTurnStatus}
            setTargetDevice={setTargetDevice}
          />
        </div>
      </div>
    );
  }
}

export default App;

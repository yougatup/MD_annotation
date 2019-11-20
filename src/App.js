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
      curConversationIndex: -1,
      totalNumConversations: -1,

      annotationTarget: "",
      annotationActionList: [],

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

      prevConversationStatus: false,
      nextConversationStatus: false,

      currentConversationStatus: false,
      currentConversation: []
    };

    this.deviceListConvey = this.deviceListConvey.bind(this);
    this.initializeDevicePath = this.initializeDevicePath.bind(this);
    this.changeBotTurnStatus = this.changeBotTurnStatus.bind(this);
    this.setTargetDevice = this.setTargetDevice.bind(this);
    this.controlEndButtonStatus = this.controlEndButtonStatus.bind(this);
    this.controlNextButtonStatus = this.controlNextButtonStatus.bind(this);
    this.controlEndStatus = this.controlEndStatus.bind(this);
    this.controlStartStatus = this.controlStartStatus.bind(this);
    this.controlPrevConversationStatus = this.controlPrevConversationStatus.bind(this);
    this.controlNextConversationStatus = this.controlNextConversationStatus.bind(this);
    this.setCurrentConversation = this.setCurrentConversation.bind(this);
    this.controlCurrentConversationStatus = this.controlCurrentConversationStatus.bind(this);
    this.setCurrentAnnotationTargetDevice = this.setCurrentAnnotationTargetDevice.bind(this);

    this.setCurrentConversationIndex = this.setCurrentConversationIndex.bind(this);
    this.setTotalConversationNumbers = this.setTotalConversationNumbers.bind(this);
  }

  componentDidMount() {
    this.idGeneration();
  }

  setCurrentAnnotationTargetDevice = (t, actionList) => {
      console.log("Hi");
      console.log(t);
      console.log(actionList);


      this.setState( {
	  annotationTarget: t,
	  annotationActionList: actionList
      }); 
  }

  setCurrentConversationIndex = (num) => {
      this.setState( {
	  curConversationIndex: num
      });

      console.log(num);
  }

  setTotalConversationNumbers = (num) => {
      console.log(num);

      this.setState( {
	  totalNumConversations: num
      });
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

  controlPrevConversationStatus = () => {
    this.setState(prevState => ({
      prevConversationStatus: !prevState.prevConversationStatus,
    }));
  }

  controlNextConversationStatus = () => {
    this.setState(prevState => ({
      nextConversationStatus: !prevState.nextConversationStatus,
    }));
  }

  controlCurrentConversationStatus = () => {
    this.setState(prevState => ({
      currentConversationStatus : false
    }));
  }

  setCurrentConversation = (conv) => {
    this.setState(prevState => ({
	currentConversationStatus: true,
	currentConversation: conv
    }));
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
    const { end, start, endButtonStatus, nextButtonStatus, devicePath, botTurnStatus, targetDevice, u_id, click_state, prevConversationStatus, nextConversationStatus, currentConversation, currentConversationStatus, curConversationIndex, totalNumConversations, annotationTarget, annotationActionList } = this.state;
    const { controlEndButtonStatus, initializeDevicePath, blockEndButtonStatus, unblockEndButtonStatus,
      controlNextButtonStatus, controlEndStatus, controlStartStatus, deviceListConvey, changeBotTurnStatus, setTargetDevice,
      controlPrevConversationStatus, controlNextConversationStatus, setCurrentConversation, controlCurrentConversationStatus, setCurrentConversationIndex, setTotalConversationNumbers, setCurrentAnnotationTargetDevice
    } = this;
    
    return (
      <div class="backGround">
        <div class="leftSideBar">
          <LeftSideBar 
            u_id={u_id}
	    annotationTarget={annotationTarget}
	    annotationActionList={annotationActionList}
          />
        </div>
        <main class="chatGrid chatStyle">
          <ChatRoom 
            end={end}
            start={start}
            u_id={u_id}
	    prevConversationStatus={prevConversationStatus}
	    nextConversationStatus={nextConversationStatus}
	    currentConversation={currentConversation}
	    currentConversationStatus={currentConversationStatus}
            deviceListConvey={deviceListConvey}
            blockEndButtonStatus={blockEndButtonStatus}
            unblockEndButtonStatus={unblockEndButtonStatus}
            controlEndButtonStatus={controlEndButtonStatus}
            controlPrevConversationStatus={controlPrevConversationStatus}
            controlNextConversationStatus={controlNextConversationStatus}
            setCurrentConversation={setCurrentConversation}
            controlEndStatus={controlEndStatus}
            controlStartStatus={controlStartStatus}
            controlNextButtonStatus={controlNextButtonStatus}
            changeBotTurnStatus={changeBotTurnStatus}
            targetDevice={targetDevice}
            click_state={click_state}
	    setCurrentConversationIndex={setCurrentConversationIndex}
	    setTotalConversationNumbers={setTotalConversationNumbers}
          />
        </main>
        <div class="rightSideBar">
          <RightSideBar
            initializeDevicePath={initializeDevicePath}
            end={end}
            devicePath={devicePath}
            endButtonStatus={endButtonStatus}
            nextButtonStatus={nextButtonStatus}
	    currentConversation={currentConversation}
	    currentConversationStatus={currentConversationStatus}
            controlEndButtonStatus={controlEndButtonStatus}
            controlPrevConversationStatus={controlPrevConversationStatus}
            controlNextConversationStatus={controlNextConversationStatus}
            setCurrentConversation={setCurrentConversation}
            controlCurrentConversationStatus={controlCurrentConversationStatus}
            controlNextButtonStatus={controlNextButtonStatus}
            controlEndStatus={controlEndStatus} 
            controlStartStatus={controlStartStatus}
            botTurnStatus={botTurnStatus}
            setTargetDevice={setTargetDevice}
	    totalNumConversations={totalNumConversations}
	    curConversationIndex={curConversationIndex}
	    setCurrentAnnotationTargetDevice={setCurrentAnnotationTargetDevice}
          />
        </div>
      </div>
    );
  }
}

export default App;

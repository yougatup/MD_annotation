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
      topicPath: '',
      
      // Control the requirementList
      requirement: [],

      // Control the annotation session
      annotation: false,

      // Control each button's disabled status
      endButtonStatus: false,
      nextButtonStatus: false,
    };
    this.setStateRequirment = this.setStateRequirment.bind(this);
    this.controlAnnotation = this.controlAnnotation.bind(this);
    this.topicConvey = this.topicConvey.bind(this);
    this.controlEndButtonStatus = this.controlEndButtonStatus.bind(this);
    this.controlNextButtonStatus = this.controlNextButtonStatus.bind(this);
    this.controlEndStatus = this.controlEndStatus.bind(this);
    this.controlStartStatus = this.controlStartStatus.bind(this);
  }

  setStateRequirment = (requirement) => {
    this.setState({
        requirement: requirement
    })
  }

  controlAnnotation = (bool) => {
    this.setState({
      annotation: bool
    })
  }

  topicConvey = (path) => {
    this.setState({
      topicPath: path
    })
  }

  initializeTopicPath = () => {
    this.setState({
      topicPath: '',
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
    const { end, start, endButtonStatus, nextButtonStatus, requirement, annotation, topicPath } = this.state;
    const { controlEndButtonStatus, initializeTopicPath, blockEndButtonStatus, unblockEndButtonStatus,
      controlNextButtonStatus, controlEndStatus, controlStartStatus, setStateRequirment, controlAnnotation, topicConvey } = this;
    
    return (
      <div class="backGround">
        <div class="leftSideBar">
          <LeftSideBar 
            requirement={requirement}
            initializeTopicPath={initializeTopicPath}
            end={end}
            start={start}
            annotation={annotation}
            topicPath={topicPath}
          />
        </div>
        <main class="chatGrid chatStyle">
          <ChatRoom 
            end={end}
            start={start}
            annotation={annotation}
            topicConvey={topicConvey}
            controlAnnotation={controlAnnotation}
            blockEndButtonStatus={blockEndButtonStatus}
            unblockEndButtonStatus={unblockEndButtonStatus}
            controlEndButtonStatus={controlEndButtonStatus}
            controlEndStatus={controlEndStatus}
            controlStartStatus={controlStartStatus}
            setStateRequirment={setStateRequirment}
            controlNextButtonStatus={controlNextButtonStatus}
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
            annotation={annotation}
          />
        </div>
      </div>
    );
  }
}

export default App;

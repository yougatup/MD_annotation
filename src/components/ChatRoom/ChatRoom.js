import React, { Component } from 'react';
// import axios from 'axios';
import { Button, Input, Label, Image } from 'semantic-ui-react'
import './ChatRoom.css';

import user from './../MessageList/Message/images/avatar.png';

// import { exampletree } from './../../treeExample.js';

import { MessageList } from "./../MessageList/MessageList.js";
import { SystemTopicButton } from "./../MessageList/SystemButton/SystemTopicButton/SystemTopicButton.js";
import { SystemBotButton } from "./../MessageList/SystemButton/SystemBotButton/SystemBotButton.js";
import { SystemUserButton } from "./../MessageList/SystemButton/SystemUserButton/SystemUserButton.js";

export class ChatRoom extends Component {
    id = 0;
    num_experiment = 1;
    curPath = [];
    conversationTree = require("./../../treeExample.js").default[0];
    curNode = null;

    constructor(props) {
        super(props);
        this.state = {
            topic: '',
            time: new Date(),
            input: '',
            type: 'user',
            originResponse: '',
            messageList: [
                { id: 0, type: 'system', time: null, text: 'Lets start ' + this.num_experiment + ' conversation!'},
            ],

            // Data lists for conversation flow
            AnswerList: [
	    	{text: "haha"}, 
	    	{text: "blahblah"}
	    ],

	    otherResponseList: [
	    	{text: "Hello"}, 
	    	{text: "World!"}
	    ],

            // Status for controlling chatflow
            startSession: true,
            turnNotice: false,
            startConversationStatus: false,
            selectBotStatus: true,
            similarUserStatus: true,
            depth: 0,
        };
        
	    this.curNode = this.conversationTree;
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.changeTurnNotice = this.changeTurnNotice.bind(this);
        this.resetMessageList = this.resetMessageList.bind(this);
        this.startConversation = this.startConversation.bind(this);
        this.updateRenderUntilSysBot = this.updateRenderUntilSysBot.bind(this);
        this.updateRenderUntilUserBot = this.updateRenderUntilUserBot.bind(this);
        this.selectTopic = this.selectTopic.bind(this);
        this.selectAnswer = this.selectAnswer.bind(this);
        this.similarResponse = this.similarResponse.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    
    /* A. Lifecycle Function */

    componentDidMount() {
        // this.scrollToBottom();
    }
    
    componentDidUpdate() {
        const { end, start, controlEndStatus, controlStartStatus } = this.props;
        if ( end === true ) {
            this.resetMessageList();
            this.setState({
                similarUserStatus: true,
                selectBotStatus: true,
                turnNotice: false,
            })
            controlEndStatus();
        }
        if( start === true ) {
            this.startConversation();
            controlStartStatus();
        }

        this.scrollToBottom();
    }

    /* B. Data import  */
    //-----------------------
    // function for tree data import
    // ----------------------



    /* C. Controlling Functions */

    // Auto scrolling to bottom
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    // Notice the turn of user to user
    changeTurnNotice = () => {
        const { controlEndButtonStatus } = this.props;
        controlEndButtonStatus();
        setTimeout(() => {
            this.setState(prevState => ({
                turnNotice: !prevState.turnNotice,
            }));
            controlEndButtonStatus();
        }, 900);
    }

    // Reset the messageList when the conversation is ended
    resetMessageList = () => {
        this.setState({
            messageList: [
                { id: 0, type: 'system', time: null, text: 'End the '+ this.num_experiment + ' conversation!'},
                { id: 1, type: 'system', time: null, text: 'Click the [Next Conversation] Button in below'}
            ],
        })
        this.id = 0
    }

    // Initialize the messageList when a new conversation starts
    startConversation = () => {
        this.num_experiment ++;
	    this.curNode = this.conversationTree;
        this.setState({
            messageList: [
                { id: 0, type: 'system', time: null, text: 'Lets start '+ this.num_experiment + ' conversation!'}
            ],
            startSession: true,
        })
    }

    // Set interval btw user response and SystemBotButton
    // For preventing the message ordering, block the endbutton during 1000ms through 'controlEndButtonStatus'
    updateRenderUntilSysBot(){
        const { controlEndButtonStatus } = this.props;
        controlEndButtonStatus();
        setTimeout(() => {
            this.setState(prevState => ({
                selectBotStatus: !prevState.selectBotStatus
            }));
            controlEndButtonStatus();
        }, 1000);
    }

    // Set interval btw user response and SystemUserButton
    // For preventing the message ordering, block the endbutton during 1000ms through 'controlEndButtonStatus' function
    updateRenderUntilUserBot(){
        const { controlEndButtonStatus } = this.props;
        controlEndButtonStatus();
        setTimeout(() => {
	    this.setOtherResponseList();
            this.setState(prevState => ({
                similarUserStatus: !prevState.similarUserStatus
            }));
            controlEndButtonStatus();
        }, 1000);
    }

    // Putting topic from the SystemTopicButton
    // And start the conversation with user's utterance (selected Topic)
    // Also unblock the endbutton through 'controlEndButtonStatus' function
    selectTopic = (dataFromChild, i) => {
        const { messageList, time } = this.state;
        const { controlEndButtonStatus } = this.props;
        this.setState({
            topic: dataFromChild,
            startSession: false,
            startConversationStatus: true,
            messageList: messageList.concat({
                id: this.id++,
                type: 'user',
                time: time.toLocaleTimeString(),
                text: dataFromChild,
            })
        })
	this.curPath.push(i);
	this.setAnswerList(i);

        controlEndButtonStatus();
        this.updateRenderUntilSysBot();
    }

    setOtherResponseList = () => {
	    console.log(this.curNode);

        var answerList = [];

        if(this.curNode.children != null) {
            for(var i=0;i<this.curNode.children.length;i++) {
            answerList.push({text: this.curNode.children[i].value});
            }
        }

        console.log(answerList);

        this.setState({
            otherResponseList: answerList,
        });
    }

    setAnswerList = () => {
        var answerList = [];

        if(this.curNode.children != null) {
            for(var i=0;i<this.curNode.children.length;i++) {
            answerList.push({text: this.curNode.children[i].value});
            }
        }

        this.setState({
            AnswerList: answerList,
        });
    }

    makeId = () => {
        var length = 10;
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    // Putting selected answer from the SystemBotButton
    selectAnswer = (dataFromChild, order) => {
        const { messageList, time } = this.state;
        this.setState({
            messageList: messageList.concat({
                id: this.id++,
                type: 'bot',
                time: time.toLocaleDateString(),
                text: dataFromChild,
            }),
            selectBotStatus: true,
        })

        if(order == null) {
            this.curNode.children.push({
            bot: true,
            children: [],
            name: this.makeId(),
            parent: this.curNode.name,
            value: dataFromChild
            });

            order = this.curNode.children.length-1;
        }

        this.curPath.push(order);
        this.curNode = this.curNode.children[order];
            this.changeTurnNotice();
    }

    // Putting similar response which user is selected from the SystemUserButton
    similarResponse = (dataFromChild, order) => {
        const { messageList, time } = this.state;
        
        // 나중에 수정으로 대체
        this.setState({
            messageList: this.state.messageList.splice(-1, 1)
        })

        this.setState({
            messageList: messageList.concat({
                id: this.id++,
                type: 'user',
                time: time.toLocaleDateString(),
                text: dataFromChild,
            }),
            similarUserStatus: true,
        })

        if(order == null) {
            this.curNode.children.push({
            bot: false,
            children: [],
            name: this.makeId(),
            parent: this.curNode.name,
            value: dataFromChild
            });

            order = this.curNode.children.length-1;
        }

        this.curPath.push(order);
        this.curNode = this.curNode.children[order];

        this.setAnswerList();

        this.updateRenderUntilSysBot();
    }

    /* D. Event Handler */

    // save the input text of each utterance
    handleChangeText = (e) => {
        this.setState({
            input: e.target.value
        });
    }

    // add the input utterance with text, time, type to messageList 
    handleCreate = () => {
        const { input, type, time, messageList } = this.state;
        this.setState({
            input: '',
            turnNotice: false,
            originResponse: input,
            messageList: messageList.concat({
                id: this.id++,
                type: type,
                time: time.toLocaleTimeString(),
                text: input,
            }),
        })
        this.updateRenderUntilUserBot();
        this.scrollToBottom();
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.handleCreate();
        }
    }

    render() {
        const { input, originResponse, messageList, AnswerList, otherResponseList, turnNotice, startSession, startConversationStatus, selectBotStatus, similarUserStatus } = this.state;
        const {
            handleChangeText,
            handleCreate,
            handleKeyPress,
            selectTopic,
            selectAnswer,
            similarResponse,
        } = this;

        const sysNotice = [
            { id: 0, type: 'system', time: null, text: "Now, it's User turn!"},
            { id: 1, type: 'loading', time: null, text: "  "},
        ];

        return (
                <div class="chatOuterBox">
                    <div class="chatInnerBox">
                        <main class="chatRoom">
                            <div class="dateSection">
                                <span>Wednesday, July 23, 2019</span>
                            </div>
                            <MessageList messageList={messageList}/>
                            {startSession ? <SystemTopicButton selectTopic={selectTopic}/> : null}
                            {similarUserStatus ? null : <SystemUserButton similarResponse={similarResponse} originResponse={originResponse} otherResponseList={otherResponseList}/>}
                            {selectBotStatus ? null : <SystemBotButton selectAnswer={selectAnswer} AnswerList={AnswerList}/>}
                            {turnNotice ? <MessageList messageList={sysNotice}/> : null}
                            <div style={{float:'left', clear:'both', height:'150px'}} ref={(el) => { this.messagesEnd = el; }}></div>
                        </main>
                        <div class="textInputBox">
                            <div class="textInputBoxInput">
                                {(similarUserStatus && selectBotStatus && startConversationStatus)
                                    ?   <Input fluid type='text' placeholder='Type...' action>
                                            <Label color={'violet'}>
                                                <Image avatar spaced='right' src={user} />
                                                User
                                            </Label>
                                            <input style={{marginLeft:'3px'}} value={input} onChange={handleChangeText} onKeyPress={handleKeyPress}/>
                                            <Button type='submit' onClick={handleCreate}>Send</Button>
                                        </Input>
                                    :   <Input fluid disabled type='text' placeholder='Type...' action>
                                            <input value={input} onChange={handleChangeText} onKeyPress={handleKeyPress}/>
                                            <Button type='submit' onClick={handleCreate}>Send</Button>
                                        </Input>
                                }
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

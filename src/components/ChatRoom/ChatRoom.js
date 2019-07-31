import React, { Component } from 'react';
import { Button, Select, Input } from 'semantic-ui-react'
import './ChatRoom.css';

import { MessageList } from "./../MessageList/MessageList.js";

const options = [
    { key: 'system', text: 'system', value: 'system' },
    { key: 'bot', text: 'bot', value: 'bot' },
    { key: 'user', text: 'user', value: 'user' },
  ]

export class ChatRoom extends Component {
    id = 1

    constructor(props) {
        super(props);
        this.state = {
            topic: '',
            time: new Date(),
            input: '',
            type: 'user',
            messageList: [
                // { id: 0, type: 'system', time: null, text: 'Lets start 1st conversation!'},
                // { id: 0, type: 'user', time: '오전 9:33:51', text: 'Hello! This is a test message.'},
                // { id: 2, type: 'bot', time: '오전 9:34:42', text: 'And this is an answer.'}
            ] 
        };
    }
    
    /* Lifecycle Function */

    componentDidMount() {
        this.scrollToBottom();
    }
    
    componentDidUpdate() {
        this.scrollToBottom();
    }

    // Auto scrolling to bottom
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    // Putting topic from the SystemTopicButton
    // And start the conversation with user's utterance (selected Topic)
    selectTopic = (dataFromChild) => {
        const { messageList, time } = this.state;
        this.setState({
            topic: dataFromChild,
            messageList: messageList.concat({
                id: this.id++,
                type: 'user',
                time: time.toLocaleTimeString(),
                text: dataFromChild,
            })
        })
    }

    /* Event Handler */
    // save the input text of each utterance
    handleChangeText = (e) => {
        this.setState({
            input: e.target.value
        });
    }

    // save the type of each utterance
    handleChangeStatus = (e, { value }) => {
        this.setState({
            type: value
        })
    }

    // add the input utterance with text, time, type to messageList 
    handleCreate = () => {
        const { input, type, time, messageList } = this.state;
        this.setState({
            input: '',
            messageList: messageList.concat({
                id: this.id++,
                type: type,
                time: time.toLocaleTimeString(),
                text: input,
            })
        })
        this.scrollToBottom();
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.handleCreate();
        }
    }

    render() {
        const { input, messageList } = this.state;
        const {
            handleChangeText,
            handleChangeStatus,
            handleCreate,
            handleKeyPress,
            selectTopic
        } = this;

        return (
            <div class="chatOuterBox">
                <div class="chatInnerBox">
                    <main class="chatRoom">
                        <div class="dateSection">
                            <span>Wednesday, July 23, 2019</span>
                        </div>
                        <MessageList conveyTopic={selectTopic} messageList={messageList}/>
                        <div style={{float:'left', clear:'both', height:'50px'}} ref={(el) => { this.messagesEnd = el; }}></div>
                    </main>
                    <div class="textInputBox">
                        <div class="textInputBoxInput">
                            <Input fluid type='text' placeholder='Type...' action>
                                <input value={input} onChange={handleChangeText} onKeyPress={handleKeyPress}/>
                                <Select compact placeholder='Type' options={options} defaultValue='user' onChange={handleChangeStatus}/>
                                <Button type='submit' onClick={handleCreate}>Send</Button>
                            </Input>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
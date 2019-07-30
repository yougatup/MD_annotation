import React, { Component, ReactDOM } from 'react';
import { Button, Select, Input } from 'semantic-ui-react'
import './ChatRoom.css';

import { MessageList } from "./../MessageList/MessageList.js";

const options = [
    { key: 'system', text: 'system', value: 'system' },
    { key: 'bot', text: 'bot', value: 'bot' },
    { key: 'user', text: 'user', value: 'user' },
  ]

export class ChatRoom extends Component {
    id = 3

    state = {
        time: new Date(),
        input: '',
        type: 'user',
        messageList: [
            { id: 0, type: 'system', time: '오전 9:33:20', text: 'Lets start 1st conversation!'},
            { id: 1, type: 'user', time: '오전 9:33:51', text: 'Hello! This is a test message.'},
            { id: 2, type: 'bot', time: '오전 9:34:42', text: 'And this is an answer.'}
        ]
    };
    
    // Lifecycle Function
    componentDidMount() {
        this.scrollToBottom();
    }
    
    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    // Event Handler
    handleChangeText = (e) => {
        this.setState({
            input: e.target.value
        });
    }

    handleChangeStatus = (e, { value }) => {
        this.setState({
            type: value
        })
    }

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
            handleKeyPress
        } = this;

        return (
            <div class="chatOuterBox">
                <div class="chatInnerBox">
                    <main class="chatRoom">
                        <div class="dateSection">
                            <span>Wednesday, July 23, 2019</span>
                        </div>
                        <MessageList messageList={messageList}/>
                        <div style={{float:'left', clear:'both'}} ref={(el) => { this.messagesEnd = el; }}></div>
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
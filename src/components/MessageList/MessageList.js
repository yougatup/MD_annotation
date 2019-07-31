import React, { Component } from 'react';
import { Message } from "./Message/Message.js";
import { SystemButton } from "./SystemButton/SystemButton.js";

export class MessageList extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            systemStartMessage: [
                { id: 0, type: 'system', time: null, text: 'Lets start 1st conversation!'},
            ],
            start: true,
            topic: '',
        };
    }

    startStatusCallback = (dataFromChild) => {
        this.setState({
            start: false,
            topic: dataFromChild,
        })
    }

    render() {
        const { messageList } = this.props;
        const { systemStartMessage, start, topic } = this.state;
        const messages = messageList.map(
            ({id, type, time, text}) => (
                <Message
                    id={id}
                    type={type}
                    time={time}
                    text={text}
                />
            )
        );
        const startmessage = systemStartMessage.map(
            ({id, type, time, text}) => (
                <Message 
                    id={id}
                    type={type}
                    time={time}
                    text={text}
                />
            )
        );

        return (
            <div>
                {startmessage}
                {start 
                    ? <SystemButton changeStartStatus={this.startStatusCallback}/>
                    : <Message 
                        id={1}
                        type={'user'}
                        time={new Date().toLocaleTimeString()}
                        text={topic}
                    />
                }
                {messages}
            </div>
        );
    }
}
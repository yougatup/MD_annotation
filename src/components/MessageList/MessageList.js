import React, { Component } from 'react';
import { Message } from "./Message/Message.js";
import { SystemTopicButton } from "./SystemButton/SystemTopicButton/SystemTopicButton.js";

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

    // Control the topic and start status of each conversation
    selectTopic = (dataFromChild) => {
        const { conveyTopic } = this.props;
        this.setState({
            start: false,
            topic: dataFromChild,
        })
        conveyTopic(dataFromChild);
    }

    render() {
        const { messageList } = this.props;
        const { systemStartMessage, start, topic } = this.state;
        
        // system message when the conversation starts
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
        
        // whole messages during conversation
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

        return (
            <div>
                {startmessage}
                {start 
                    ? <SystemTopicButton selectTopic={this.selectTopic}/>
                    : null
                }
                {messages}
            </div>
        );
    }
}
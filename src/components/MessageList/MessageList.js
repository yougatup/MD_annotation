import React, { Component } from 'react';
import { Message } from "./Message/Message.js";

export class MessageList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { messageList } = this.props;
        
        // render whole messages during conversation
        const messages = messageList.map(
            ({id, type, time, text, actionList}) => (
                <Message
                    id={id}
                    type={type}
                    time={time}
                    text={text}
                    actionList={actionList}
                />
            )
        );
        return (
            <div>
                {messages}
            </div>
        );
    }
}
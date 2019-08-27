import React, { Component } from 'react';
import { Message } from "./Message/Message.js";
import { A_Message } from "./Message/A_Message.js";

export class MessageList extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { messageList, annotation } = this.props;
        
        // render whole messages during conversation
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

        const a_messages = messageList.map(
            ({id, type, time, text, tag, path}) => (
                <A_Message
                    id={id}
                    type={type}
                    time={time}
                    text={text}
                    tag={tag}
                    path={path}
                    reduceNumAnnotation={this.props.reduceNumAnnotation}
                />
            )
        );

        return (
            <div>
                { annotation
                    ? a_messages
                    : messages
                }
            </div>
        );
    }
}
import React, { Component } from 'react';
import './Message.css';

import user from './images/avatar.png';
import bot from './images/bot.png';

export class Message extends Component {

    render() {
        const { id, type, time, text } = this.props;
        return (
            <div>
                {
                    (() => {
                        if (type === 'system') 
                            return (<div class="messageSectionSystem">
                                        <span style={{fontWeight: "bold", fontSize: "13px"}}>System : </span>
                                        <span>{text}</span>
                                    </div>);
                        if (type === 'bot')
                            return  (<div class="messageSection messageSectionBot">
                                        <span class="messageSectionTime">{time}</span>
                                        <span class="messageSectionBody">{text}</span>
                                        <img src={bot} alt="Bot"/>
                                    </div>);
                        if (type === 'user')
                            return (<div class="messageSection messageSectionUser">
                                        <img src={user} alt="User"/>
                                        <div class="messageSectionCenter">
                                            <span class="messageSectionBody">{text}</span>
                                        </div>
                                        <span class="messageSectionTime">{time}</span>
                                    </div>);
                    })()
                }
            </div>
        );
    }
}
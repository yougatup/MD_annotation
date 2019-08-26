import React, { Component } from 'react';
import './Message.css';

import user from './images/avatar.png';
import bot from './images/bot.png';
import loading from './images/loading.gif';

export class Message extends Component {

    render() {
        const { type, time, text } = this.props;
        return (
            <div>
                {
                    (() => {
                        if (type === 'system') 
                            return (<div class="messageSectionSystem">
                                        <span style={{fontWeight: "bold", whiteSpace: 'pre-wrap'}}>{text}</span>
                                    </div>);
                        if (type === 'bot')
                            return  (<div class="messageSection messageSectionBot">
                                        <img src={bot} alt="Bot"/>
                                        <span class="messageSectionBody">{text}</span>
                                        <span class="messageSectionTime">{time}</span>
                                    </div>);
                        if (type === 'user')
                            return (<div class="messageSection messageSectionUser">
                                        <span class="messageSectionTime">{time}</span>
                                        <div class="messageSectionCenter">
                                            <span class="messageSectionBody">{text}</span>
                                        </div>
                                        <img src={user} alt="User"/>
                                    </div>);
                        if (type === 'loading')
                            return (<div class="messageSection messageSectionUser">
                                        <div class="messageSectionCenter">
                                            <span class="messageSectionBody"><img src={loading} alt="Bot"/></span>
                                        </div>
                                        <img src={user} alt="User"/>
                                    </div>);
                    })()
                }
            </div>
        );
    }
}
import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'
import './Message.css';

import user from './images/avatar.png';
import bot from './images/bot.png';
import loading from './images/loading.gif';

export class Message extends Component {

    render() {
        const { type, time, text, actionList } = this.props;
        return (
            <div>
                {
                    (() => {
                        if (type === 'system') 
                            return (<div class="messageSectionSystem">
                                        <span style={{fontWeight: "bold", whiteSpace: 'pre-wrap'}}>{text}</span>
                                    </div>);
                        if (type === 'bot')
                            return  (
                                <div style={{marginBottom: '25px'}}>
                                    <div class="messageSection messageSectionBot">
                                        <img src={bot} alt="Bot"/>
                                        <span class="messageSectionBody">{text}</span>
                                        <span class="messageSectionTime">{time}</span>
                                    </div>
                                    { Object.keys(actionList).length === 0
                                        ? null
                                        :   <Table compact size='small' color={'black'}>
                                                <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell>Device</Table.HeaderCell>
                                                    <Table.HeaderCell>Action</Table.HeaderCell>
                                                </Table.Row>
                                                </Table.Header>
                                                <Table.Body>
                                                {
                                                    actionList.map(action => {
                                                        return (
                                                            <Table.Row>
                                                                <Table.Cell>{action.device}</Table.Cell>
                                                                <Table.Cell>{action.action}</Table.Cell>
                                                            </Table.Row>
                                                        )
                                                    })
                                                }
                                                </Table.Body>
                                            </Table>
                                    }
                                </div>
                                );
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

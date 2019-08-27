import React, { Component } from 'react';
import { Button, Label, Modal, Input} from 'semantic-ui-react';

import './Message.css';

import user from './images/avatar.png';
import bot from './images/bot.png';

const databaseURL = "https://protobot-rawdata.firebaseio.com/";

export class A_Message extends Component {
    extension = '.json';

    constructor(props) {
        super(props);
        this.state = { 
            open: false,
            input: '',
            tag: this.props.tag,
        };
        this._patch = this._patch.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
    }

    _patch(tag) {
        return fetch(`${databaseURL+this.props.path+this.extension}`, {
            method: 'PATCH',
            body: JSON.stringify(tag)
        }).then(res => {
            if(res.status !== 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            // console.log(tag);
        });
    }

    handleChangeText = (e) => {
        this.setState({
            input: e.target.value
        });
    }

    handleCreate = (path) => {
        const { input } = this.state;
        const newTag = {tag: input}
        this.setState({
            input: '',
            open: false,
            tag: input,
        })
        this.props.reduceNumAnnotation();
        this._patch(newTag)
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.handleCreate();
        }
    }

    show = () => this.setState({open: true})
    close = () => this.setState({open: false})

    render() {
        const { open, input, tag } = this.state;
        const { type, text } = this.props;
        const { show, close, handleChangeText, handleCreate, handleKeyPress } = this;

        return (
            <div>
                {
                    (() => {
                        if (type === 'system') 
                            return null;
                        if (type === 'bot')
                            return  tag === null
                                    ?   <div class="messageSection messageSectionBot">
                                            <img src={bot} alt="Bot"/>
                                            <span class="messageSectionBody">{text}</span>
                                            <Label as='a' color={"blue"} key={'blue'} onClick={show}>Add tag</Label>
                                        </div>
                                    :   <div class="messageSection messageSectionBot">
                                            <img src={bot} alt="Bot"/>
                                            <span class="messageSectionBody">{text}</span>
                                            { tag === undefined
                                                ?   null
                                                :   <Label color={"grey"} key={'grey'}>{tag}</Label>
                                            }
                                        </div>
                        if (type === 'user')
                            return  tag === null
                                    ?   <div class="messageSection messageSectionUser">
                                            <Label as='a' color={"blue"} key={'blue'} onClick={show}>Add tag</Label>
                                            <div class="messageSectionCenter">
                                                <span class="messageSectionBody">{text}</span>
                                            </div>
                                            <img src={user} alt="User"/>
                                        </div>
                                    :   <div class="messageSection messageSectionUser">
                                            { tag === undefined
                                                ?   null
                                                :   <Label color={"grey"} key={'grey'}>{tag}</Label>
                                            }
                                            <div class="messageSectionCenter">
                                                <span class="messageSectionBody">{text}</span>
                                            </div>
                                            <img src={user} alt="User"/>
                                        </div>
                        if (type === 'loading')
                            return null;
                    })()
                }
                <Modal size={'tiny'} open={open} onClose={close}>
                    <Modal.Header>Add new tag</Modal.Header>
                    <Modal.Content>
                        <div style={{marginBottom: '15px'}}>
                            <span style={{fontWeight:'bold', fontSize: '15px'}}>Response : </span>
                            <span style={{fontSize: '12px'}}>{text}</span>
                        </div>
                        <Input 
                            fluid label='topic' placeholder='typing...' 
                            value={input} onChange={handleChangeText} onKeyPress={handleKeyPress}    
                        />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={close}>Cancle</Button>
                        <Button
                        positive
                        content='Add'
                        onClick={handleCreate}
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}
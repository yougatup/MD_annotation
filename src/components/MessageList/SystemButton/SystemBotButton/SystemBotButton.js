import React, { Component } from 'react';
import { Segment, Button, Input, Label, Image } from 'semantic-ui-react';
import './SystemBotButton.css';

import bot from './../../Message/images/bot.png';

const databaseURL = "https://bixby-rawdata.firebaseio.com/";

export class SystemBotButton extends Component {
    extension = '.json';
    addedpath = '';
    actionpath = '/actions'

    constructor(props) {
        super(props);
        this.state = { 
            response: '',
            actionList: [],
            deviceList: this.props.deviceList,
            usedDeviceList: [],
        };
        this._postBotResponse = this._postBotResponse.bind(this);
        this.sendAnswer = this.sendAnswer.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.changeDeviceStatus = this.changeDeviceStatus.bind(this);
        this.removeUsedDevice = this.removeUsedDevice.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.targetDevice !== this.props.targetDevice){
            this.changeDeviceStatus(this.props.targetDevice);
        }
    }

    _postBotResponse(answer) {
        return fetch(`${databaseURL+this.props.curPath+this.extension}`, {
            method: 'POST',
            body: JSON.stringify(answer)
        }).then(res => {
            if(res.status !== 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            // Convey to Chatroom the path and answer
            this.sendAnswer(answer, this.addedpath + data.name, true);
        });
    }

    // Send the answer which the user is selected to parent component
    sendAnswer = (answer, id, state) => {
        const { selectAnswer } = this.props;
        selectAnswer(answer, id, state);
    }

    handleChangeText = (e) => {
        this.setState({
            response: e.target.value
        });
    }

    handleChangeAction = (name, id, e) => {
        const { actionList } = this.state;
        const newActionList = actionList.map((action, a_id) => {
            if (id !== a_id) return action;
            return {...action, action: e.target.value, device: name}
        })

        this.setState({
            actionList: newActionList
        })
    }

    // Add New answer of Bot, state: true
    handleCreate = () => {
        const { response, actionList } = this.state;
        const newAnswer = {value: response, type: 'bot', u_id: this.props.u_id, actionList: actionList, children: {}}
        this.setState({
            response: '',
        })

        // Adding new answer(Bot)
        this._postBotResponse(newAnswer);
    }

    changeDeviceStatus = (device) => {
        const { usedDeviceList, actionList, deviceList } = this.state;
        const newDeviceList = deviceList.map((d) => {
            if (d.name !== device.name) return d;
            return {...d, name: d.name, selected: true}
        })
        this.setState({
            deviceList: newDeviceList,
            usedDeviceList: usedDeviceList.concat({
                name: device.name
            }),
            actionList: actionList.concat({
                action: ''
            })
        })
    }

    removeUsedDevice = (name, id) => {
        const { usedDeviceList, actionList, deviceList } = this.state;
        const newDeviceList = deviceList.map((d) => {
            if (d.name !== name) return d;
            return {...d, name: d.name, selected: false}
        })
        this.setState({
            deviceList: newDeviceList,
            actionList: actionList.filter((action, a_ids) => id !== a_ids),
            usedDeviceList: usedDeviceList.filter((device, d_idx) => device.name !== name),
        })
    }

    render() {
        const { response, usedDeviceList, actionList } = this.state;
        const { handleChangeText, handleCreate, handleChangeAction, removeUsedDevice } = this;

        return (
            <div class="systemBotButtonBox">
                <span class="systemBotText">Add new response and actions</span>
                <div style={{width: '100%', marginTop:"10px" ,maxHeight: '250px'}}>
                    <Segment.Group>
                        <Segment textAlign='center'>
                            <Input fluid type='text' placeholder="Type bot's response..." action>
                                <Label>
                                    <Image avatar spaced='right' src={bot} />
                                    Bot Response
                                </Label>    
                                <input value={response} onChange={handleChangeText}/>
                            </Input>
                            {usedDeviceList.map((device, id) => {
                                return(
                                    <div className="action" key={id}>
                                        <div style={{height: '10px'}}></div>
                                        <div class="ui fluid labeled input">
                                            <div class="ui label label">{device.name}</div>
                                            <input value={actionList.name} placeholder="type device's action" onChange={(e) => handleChangeAction(device.name, id, e)}/>
                                            <Button negative type='cancle' onClick={(e) => removeUsedDevice(device.name, id)}>Cancel</Button>
                                        </div>
                                    </div>
                                    )
                                })
                            }
                            <div style={{height: '15px'}}></div>
                            { response !== ''
                                ?   <Button fluid positive type='submit' onClick={handleCreate}>Add new response</Button>
                                :   <Button disabled fluid positive type='submit' onClick={handleCreate}>Add new response</Button>
                            }
                        </Segment>
                    </Segment.Group>
                    {/* <Segment.Group>
                            <Segment textAlign='center' color='teal'>
                                <div class="systemBotText">Available Devices</div>
                                {deviceList.map((device, id) => {
                                    return(
                                        <div key={id}>
                                            <div style={{height: '10px'}}></div>
                                            { device.selected
                                                ?   <Button disabled fluid color='teal'>{device.name}</Button>
                                                :   <Button fluid color='teal' onClick={changeDeviceStatus.bind(this, device)}>{device.name}</Button>
                                            }
                                        </div>
                                        )
                                    })
                                }
                            </Segment>
                    </Segment.Group> */}
                </div>
            </div>
        );
    }
}
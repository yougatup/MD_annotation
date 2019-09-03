import React, { Component } from 'react';
import { Segment, Button, Input, Label, Image } from 'semantic-ui-react';
import './SystemBotButton.css';

import bot from './../../Message/images/bot.png';

const databaseURL = "https://bixby-rawdata.firebaseio.com/";

export class SystemBotButton extends Component {
    extension = '.json';
    addedpath = '';
    actionpath = '/actions'
    action_order = 0;

    constructor(props) {
        super(props);
        this.state = { 
            response: '',
            actionList: [],
            usedDeviceList: [],
        };
        this._postBotResponse = this._postBotResponse.bind(this);
        this.sendAnswer = this.sendAnswer.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.changeDeviceStatus = this.changeDeviceStatus.bind(this);
        this.removeUsedDevice = this.removeUsedDevice.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.click_state !== this.props.click_state){
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
            this.sendAnswer(answer, this.addedpath + data.name);
        });
    }

    // Send the answer which the user is selected to parent component
    sendAnswer = (answer, id) => {
        const { selectAnswer } = this.props;
        selectAnswer(answer, id);
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

    changeDeviceStatus = (device) => {
        const { usedDeviceList, actionList } = this.state;
        this.setState({
            usedDeviceList: usedDeviceList.concat({
                name: device.name,
            }),
            actionList: actionList.concat({
                action: ''
            })
        })
    }

    removeUsedDevice = (name, id) => {
        const { usedDeviceList, actionList } = this.state;
        this.setState({
            actionList: actionList.filter((action, a_ids) => id !== a_ids),
            usedDeviceList: usedDeviceList.filter((device, d_idx) => id !== d_idx),
        })
    }

    handleCreate = () => {
        const { response, actionList } = this.state;

        const newAnswer = {
            value: response, 
            type: 'bot', 
            u_id: this.props.u_id, 
            actionList: actionList.filter((action) => action.action !== ''), 
        }
        this.setState({
            response: '',
        })

        // Adding new answer(Bot)
        this._postBotResponse(newAnswer);
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.handleCreate();
        }
    }

    render() {
        const { response, usedDeviceList, actionList } = this.state;
        const { handleChangeText, handleCreate, handleChangeAction, removeUsedDevice, handleKeyPress } = this;

        return (
            <div class="systemBotButtonBox">
                <span class="systemBotText">에이전트의 발화와, 작동되길 원하는 장치들의 액션을 입력하세요.</span>
                <br></br>
                <span class="systemBotNotice">오른쪽에서 사용 가능한 장치를 추가할 수 있습니다.</span>
                <div style={{width: '100%', marginTop:"10px"}}>
                    <Segment.Group>
                        <Segment textAlign='center'>
                            <Input fluid type='text' placeholder="type the Agent's response..." action>
                                <Label>
                                    <Image avatar spaced='right' src={bot} />
                                    에이전트 발화
                                </Label>
                                <input value={response} onChange={handleChangeText} onKeyPress={handleKeyPress}/>
                            </Input>
                            {usedDeviceList.map((device, id) => {
                                return(
                                    <div className="action" key={id}>
                                        <div style={{height: '10px'}}></div>
                                        <div class="ui fluid labeled input">
                                            <div class="ui label label" style={{fontSize: '13px'}}>{device.name}</div>
                                            <input value={actionList.name} placeholder="type the device's action" onKeyPress={handleKeyPress} onChange={(e) => handleChangeAction(device.name, id, e)}/>
                                            <Button color={'google plus'} type='cancle' onClick={(e) => removeUsedDevice(device.name, id)}><span style={{fontSize:'11px'}}>삭제</span></Button>
                                        </div>
                                    </div>
                                    )
                                })
                            }
                            <div style={{height: '15px'}}></div>
                            { response !== ''
                                ?   <Button fluid positive type='submit' onClick={handleCreate}>새로운 발화 추가</Button>
                                :   <Button disabled fluid positive type='submit' onClick={handleCreate}>새로운 발화 추가</Button>
                            }
                        </Segment>
                    </Segment.Group>
                </div>
            </div>
        );
    }
}
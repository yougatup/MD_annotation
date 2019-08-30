import React, { Component } from 'react';
import { Segment, Button, Input, Label, Image } from 'semantic-ui-react';
import './SystemBotButton.css';

import bot from './../../Message/images/bot.png';

const databaseURL = "https://bixby-rawdata.firebaseio.com/";

export class SystemBotButton extends Component {
    extension = '.json';
    addedpath = '';
    overflowCondition: '';

    constructor(props) {
        super(props);
        this.state = { 
            input: '',
            inputState: true,
            // requirementList: [],
        };
        // this._get = this._get.bind(this);
        this._post = this._post.bind(this);
        this.sendAnswer = this.sendAnswer.bind(this);
        this.changeInputState = this.changeInputState.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleRequirement = this.handleRequirement.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    _post(answer) {
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
            // this.sendAnswer(answer, this.addedpath + data.name + '/children', true);
            this.sendAnswer(answer, this.addedpath + data.name, true);
        });
    }

    // Send the answer which the user is selected to parent component
    sendAnswer = (answer, id, state) => {
        const { selectAnswer } = this.props;
        selectAnswer(answer, id, state);
    }

    changeInputState = () => {
        this.setState(prevState => ({
            inputState: !prevState.inputState
        }));
    }

    handleChangeText = (e) => {
        this.setState({
            input: e.target.value
        });
    }

    // Select origin answer of Bot, state: false
    handleSelect = (answer, id) => {
        // const selectedPath = id + '/children';
        const selectedPath = id;
        this.sendAnswer(answer, selectedPath, false);
    }

    // Add New answer of Bot, state: true
    handleCreate = () => {
        const { input } = this.state;
        const newAnswer = {value: input, type: 'bot', tag: null, children: {}}
        this.setState({
            input: '',
        })

        // Adding new answer(Bot)
        this._post(newAnswer);
    }

    handleRequirement = (requirement) => {
        const { AnswerList } = this.props;
        let present = false;
        let p_id = null;
        let p_answer = null;

        Object.keys(AnswerList).map(id => {
            const answer = AnswerList[id];
            if(answer.type === requirement.requirement){
                present = true;
                p_id = id
                p_answer = answer
            }
        })

        if(present === true){
            this.handleSelect(p_answer, p_id);
        } else {
            const newAnswer = {value: requirement.text, type: requirement.requirement, tag: requirement.requirement, children:{}}
            this._post(newAnswer);
        }
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.handleCreate();
        }
    }

    render() {
        const { inputState, input } = this.state;
        const { AnswerList, requirementList } = this.props;
        const { handleSelect, changeInputState, handleChangeText, handleCreate, handleKeyPress, handleRequirement } = this;
        if (Object.keys(AnswerList).length > 4){
            this.overflowCondition = 'scroll'
        }

        return (
            <div class="systemBotButtonBox">
                <span class="systemBotText">
                    {(AnswerList === 0)
                        ?   'Add new answer!'
                        :   'Select the appropriate answer or add new answer of the bot!'
                    }
                </span>
                <div style={{width: '100%', marginTop:"10px" ,maxHeight: '250px', overflowY:  this.overflowCondition}}>
                    <Segment.Group>
                        <Segment textAlign='center'>
                            { inputState
                                ? <Button fluid positive onClick={changeInputState}>Add new answer</Button>
                                : <Input fluid type='text' placeholder='Type your answer...' action>
                                    <Label color={'green'}>
                                        <Image avatar spaced='right' src={bot} />
                                        Bot
                                    </Label>    
                                    <input value={input} onChange={handleChangeText} onKeyPress={handleKeyPress}/>
                                    <Button positive type='submit' onClick={handleCreate}>Add</Button>
                                </Input>
                            }
                            {Object.keys(AnswerList).map(id => {
                                const answer = AnswerList[id];
                                return answer.type === 'bot' ? 
                                    <div key={id}>
                                        <div style={{height: '10px'}}></div>
                                        <Button fluid onClick={handleSelect.bind(this, answer, id)}>{answer.value}</Button>
                                    </div>
                                    : null
                            })}
                        </Segment>
                    </Segment.Group>
                    { requirementList.length === 0
                        ? null
                        : <Segment.Group>
                            <Segment textAlign='center' color='teal'>
                                <div class="systemBotText">Requirement List</div>
                                {requirementList.map((requirement, id) => {
                                    return(
                                        <div key={id}>
                                            <div style={{height: '10px'}}></div>
                                            <Button fluid color='teal' onClick={handleRequirement.bind(this, requirement, id)}>{requirement.text}</Button>
                                        </div>
                                        )
                                    })
                                }
                            </Segment>
                        </Segment.Group>
                    }
                </div>
            </div>
        );
    }
}

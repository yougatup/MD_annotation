import React, { Component } from 'react';
import { Segment, Button, Input, Label, Image } from 'semantic-ui-react';
import './SystemBotButton.css';

import bot from './../../Message/images/bot.png';

export class SystemBotButton extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            AnswerList: [
                { text: '어디까지 갈 예정이야?' },
                { text: '현재 위치 알려줘' },
            ],
            input: '',
            inputState: true,
        };
        this.sendAnswer = this.sendAnswer.bind(this);
        this.changeInputState = this.changeInputState.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    sendAnswer = (answer) => {
        const { selectAnswer } = this.props;
        selectAnswer(answer);
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

    handleCreate = () => {
        const { input } = this.state;
        this.setState({
            input: '',
        })

        // Adding new answer(Bot)

        this.sendAnswer(input);
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.handleCreate();
        }
    }

    render() {
        const { inputState, AnswerList, input } = this.state;
        const { sendAnswer, changeInputState, handleChangeText, handleCreate, handleKeyPress } = this;

        return (
            <div class="systemBotButtonBox">
                <span style={{fontWeight: "bold", fontSize: "13px"}}>System : </span>
                <span>
                    {(AnswerList.length === 0)
                        ?   'Add new answer!'
                        :   'Select the appropriate answer!'
                    }
                </span>
                <Segment.Group>
                    <Segment textAlign='center'>
                        {AnswerList.map((answer, i) => {
                            return (
                                <div>
                                <Button fluid onClick={sendAnswer.bind(this, answer.text)}>{answer.text}</Button>
                                <div style={{height: '10px'}}></div> 
                                </div>
                            );
                        })}
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
                    </Segment>
                </Segment.Group>
            </div>
        );
    }
}
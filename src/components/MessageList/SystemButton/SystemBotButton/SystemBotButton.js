import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import './SystemBotButton.css';

export class SystemBotButton extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            AnswerList: [
                '어디까지 갈 예정이야?', 
                '현재 위치 알려줘', 
            ],
        };
    }

    handleCreate = (answer) => {
        const { selectAnswer } = this.props;
        selectAnswer(answer);
    }

    render() {
        const { AnswerList } = this.state;
        const { handleCreate } = this;

        return (
            <div class="systemBotButtonBox">
                <span style={{fontWeight: "bold", fontSize: "13px"}}>System : </span>
                <span>Select the appropriate answer!</span>
                <Segment.Group>
                    <Segment textAlign='center'>
                        <Button fluid onClick={handleCreate.bind(this, AnswerList[0])}>{AnswerList[0]}</Button>
                            <div style={{height: '10px'}}></div>
                        <Button fluid onClick={handleCreate.bind(this,AnswerList[1])}>{AnswerList[1]}</Button>
                            <div style={{height: '10px'}}></div>
                        <Button fluid positive>Add new answer</Button>
                    </Segment>
                </Segment.Group>
            </div>
        );
    }
}
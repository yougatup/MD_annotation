import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import './SystemUserButton.css';

export class SystemUserButton extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            OtherResponseList: [
                '언제 출발할 예정이야?', 
                '혹시 몇 명이 탈거야?',
                '언제 필요해?',
            ],
        };
    }

    handleCreate = (response) => {
        const { similarResponse } = this.props;
        similarResponse(response);
    }

    render() {
        const { OtherResponseList } = this.state;
        const { handleCreate } = this;

        return (
            <div class="systemUserButtonBox">
                <span style={{fontWeight: "bold", fontSize: "13px"}}>System : </span>
                <span>Select the similar response!</span>
                <Segment.Group>
                    <Segment textAlign='center'>
                        <Button fluid onClick={handleCreate.bind(this, OtherResponseList[0])}>{OtherResponseList[0]}</Button>
                            <div style={{height: '10px'}}></div>
                        <Button fluid onClick={handleCreate.bind(this,OtherResponseList[1])}>{OtherResponseList[1]}</Button>
                            <div style={{height: '10px'}}></div>
                        <Button fluid onClick={handleCreate.bind(this,OtherResponseList[2])}>{OtherResponseList[2]}</Button>
                            <div style={{height: '10px'}}></div>
                        <Button fluid negative onClick={handleCreate.bind('no')}>해당 없음</Button>
                    </Segment>
                </Segment.Group>
            </div>
        );
    }
}
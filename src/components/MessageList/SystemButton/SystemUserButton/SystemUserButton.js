import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import './SystemUserButton.css';

export class SystemUserButton extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            otherResponseList: [
                { text: "언제 출발할 예정이야?" },
                { text: "혹시 몇 명이 탈거야?" },
                { text: "언제 필요해?" },
            ],
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleNotapplicable = this.handleNotapplicable.bind(this);
    }

    handleCreate = (response) => {
        const { similarResponse } = this.props;
        similarResponse(response);
    }

    handleNotapplicable = () => {
        const { originResponse, similarResponse } = this.props;
        
        // Adding new response(User)

        similarResponse(originResponse);
    }

    render() {
        const { otherResponseList } = this.state;
        const { handleCreate, handleNotapplicable } = this;

        return (
            <div class="systemUserButtonBox">
                <span style={{fontWeight: "bold", fontSize: "13px"}}>System : </span>
                <span>Select the similar response!</span>
                <Segment.Group>
                    <Segment textAlign='center'>
                        {otherResponseList.map((response, i) => {
                            return ( 
                                <div>
                                <Button fluid onClick={handleCreate.bind(this, response.text)}>{response.text}</Button>
                                <div style={{height: '10px'}}></div>
                                </div>
                            );
                        })}
                        <Button fluid negative onClick={handleNotapplicable}>해당 없음</Button>
                    </Segment>
                </Segment.Group>
            </div>
        );
    }
}
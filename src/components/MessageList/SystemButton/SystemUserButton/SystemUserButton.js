import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import './SystemUserButton.css';

const databaseURL = "https://protobot-rawdata.firebaseio.com/";

export class SystemUserButton extends Component {
    extension = '.json';
    addedpath = '';
    overflowCondition: '';

    constructor(props) {
        super(props);
        this.state = { 
            otherResponseList: [],
        };
        this._post = this._post.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleNotapplicable = this.handleNotapplicable.bind(this);
    }


    _post(response) {
        return fetch(`${databaseURL+this.props.curPath+this.extension}`, {
            method: 'POST',
            body: JSON.stringify(response)
        }).then(res => {
            if(res.status !== 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            // Convey to Chatroom the path and response
            this.handleCreate(response, data.name);
        });
    }

    handleCreate = (response, i) => {
        const { similarResponse } = this.props;
        similarResponse(response, i);
    }

    handleNotapplicable = () => {
        const { originResponse } = this.props;
        const newResponse = {value: originResponse, children: {}}
        
        this._post(newResponse);
    }

    render() {
        const { otherResponseList } = this.props;
        const { handleCreate, handleNotapplicable } = this;
        if (Object.keys(otherResponseList).length > 5){
            this.overflowCondition = 'scroll'
        }

        return (
            <div class="systemUserButtonBox">
                <span class="systemUserText">
                    Select the similar response with your response!
                </span>
                <div style={{width: '100%', marginTop: "10px", maxHeight: '250px', overflowY: this.overflowCondition}}>
                    <Segment.Group>
                        <Segment textAlign='center'>
                            <Button fluid negative onClick={handleNotapplicable}>Nothing to select</Button>
                            {Object.keys(otherResponseList).map(id => {
                                const response = otherResponseList[id];
                                return (
                                    <div key={id}>
                                    <div style={{height: '10px'}}></div> 
                                    <Button fluid onClick={handleCreate.bind(this, response, id)}>{response.value}</Button>
                                    </div>
                                );
                            })}
                        </Segment>
                    </Segment.Group>
                </div>
            </div>
        );
    }
}

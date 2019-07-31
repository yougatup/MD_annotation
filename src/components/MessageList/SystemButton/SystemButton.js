import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import './SystemButton.css';

export class SystemButton extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            TopicList: [
                'Topic A', 
                'Topic B', 
                'Topic C'
            ],
        };
    }

    handleCreate = (topic) => {
        const { changeStartStatus } = this.props;
        changeStartStatus(topic);
    }

    render() {
        const { TopicList } = this.state;
        const { handleCreate } = this;

        return (
            <div class="systemButtonBox">
                <span style={{fontWeight: "bold", fontSize: "13px"}}>System : </span>
                <span>Select the topic!</span>
                <Segment.Group>
                    <Segment textAlign='center'>
                        <Button fluid onClick={handleCreate.bind(this, TopicList[0])}>{TopicList[0]}</Button>
                            <div style={{height: '10px'}}></div>
                        <Button fluid onClick={handleCreate.bind(this,TopicList[1])}>{TopicList[1]}</Button>
                            <div style={{height: '10px'}}></div>
                        <Button fluid onClick={handleCreate.bind(this,TopicList[2])}>{TopicList[2]}</Button>
                    </Segment>
                </Segment.Group>
            </div>
        );
    }
}
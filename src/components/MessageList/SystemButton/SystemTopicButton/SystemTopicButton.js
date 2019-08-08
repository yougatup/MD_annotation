import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import './SystemTopicButton.css';

export class SystemTopicButton extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            TopicList: [
                '택시 불러줘', 
                'Topic B', 
                'Topic C'
            ],
        };
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleCreate = (topic, order) => {
        const { selectTopic } = this.props;
        selectTopic(topic, order);
    }

    render() {
        const { TopicList } = this.state;
        const { handleCreate } = this;

        return (
            <div class="systemTopicButtonBox">
                <span style={{fontWeight: "bold", fontSize: "13px"}}>System : </span>
                <span>Select the topic!</span>
                <Segment.Group>
                    <Segment textAlign='center'>
                        <Button fluid onClick={handleCreate.bind(this, TopicList[0], 0)}>{TopicList[0]}</Button>
                            <div style={{height: '10px'}}></div>
                        <Button disabled fluid onClick={handleCreate.bind(this,TopicList[1], 1)}>{TopicList[1]}</Button>
                            <div style={{height: '10px'}}></div>
                        <Button disabled fluid onClick={handleCreate.bind(this,TopicList[2], 2)}>{TopicList[2]}</Button>
                    </Segment>
                </Segment.Group>
            </div>
        );
    }
}

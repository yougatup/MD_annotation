import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import './SystemTopicButton.css';

export class SystemTopicButton extends Component {
    overflowCondition = ''

    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleCreate = (topic, id) => {
        const { selectTopic } = this.props;
        selectTopic(topic, id);
    }

    render() {
        const { handleCreate } = this;
        if (Object.keys(this.props.topics).length > 5){
            this.overflowCondition = 'scroll'
        }

        return (
            <div class="systemTopicButtonBox">
                <span class="systemTopicText">Select the topic!</span>
                <div style={{height:'15px'}}></div>
                <div style={{width: '100%', maxHeight: '200px', overflowY: this.overflowCondition}}>
                    <Segment.Group>
                        <Segment textAlign='center'>
                            {Object.keys(this.props.topics).map(id => {
                                const topic = this.props.topics[id];
                                return (
                                    <div key={id}>
                                    { id === '0'
                                        ?   null
                                        :   <div style={{height: '10px'}}></div>
                                    } 
                                    <Button fluid onClick={handleCreate.bind(this, topic, id)}>{topic.value}</Button>
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

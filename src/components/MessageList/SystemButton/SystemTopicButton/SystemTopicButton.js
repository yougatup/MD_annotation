import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import './SystemTopicButton.css';

export class SystemTopicButton extends Component {
    overflowCondition = ''

    //Temporary code
    selected = ''

    constructor(props) {
        super(props);
        this.state = {
            num_experiment : this.props.num_experiment,
        };
        console.log(this.props.num_experiment);
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleCreate = (topic, id) => {
        const { selectTopic } = this.props;
        this.selected = topic.value
        selectTopic(topic, id);
    }

    render() {
        const { handleCreate } = this;
        if (Object.keys(this.props.topics).length > 5){
            this.overflowCondition = 'scroll'
        }

        return (
            <div class="systemTopicButtonBox">
                <span class="systemTopicText">{`${(this.state.num_experiment-1)%3+1} 번째 주제입니다`}</span>
                <div style={{height:'15px'}}></div>
                <div style={{width: '100%', maxHeight: '200px', overflowY: this.overflowCondition}}>
                    <Segment.Group>
                        <Segment textAlign='center'>
                            {Object.keys(this.props.topics).filter(id=>id==(this.state.num_experiment-1)%3).map(id => {
                                const topic = this.props.topics[id];
                                console.log(topic.value, this.selected)
                                return this.selected === topic.value ?
                                    null
                                    :   <div key={id}>
                                        { id === '0'
                                            ?   null
                                            :   <div style={{height: '10px'}}></div>
                                        }
                                        <Button fluid onClick={handleCreate.bind(this, topic, id)} >{topic.value}</Button>
                                        </div>
                            })}
                        </Segment>
                    </Segment.Group>
                </div>
            </div>
        );
    }
}

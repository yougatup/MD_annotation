import React, { Component } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import './RightSideBar.css';

export class RightSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num_experiment: 1,
            colors: [
                'violet',
                'grey',
                'grey',
                'grey',
                'grey',
            ]
        };
        this.sendEndStatus = this.sendEndStatus.bind(this);
        this.sendStartStatus = this.sendStartStatus.bind(this);
        this.endExperiment = this.endExperiment.bind(this);
    }

    // Convey the endstatus to parent component when each conversation is ended
    sendEndStatus = () => {
        const { controlEndStatus, controlEndButtonStatus, controlNextButtonStatus } = this.props;
        // block the 'endbutton'
        controlEndButtonStatus();

        // unblock the 'nextbutton'
        controlNextButtonStatus();

        //change the status
        controlEndStatus();
    }

    // Convey the startstatus to parent component when each conversation starts
    sendStartStatus = () => {
        const { controlStartStatus, controlNextButtonStatus } = this.props;
        const { num_experiment, colors } = this.state;
        this.setState({
            num_experiment: num_experiment + 1,
            colors: [
                ...colors.slice(0, num_experiment),
                'violet',
                ...colors.slice(num_experiment + 1)
            ]
        })
        console.log(num_experiment, colors);
        
        //change the status
        controlStartStatus();

        // block the 'nextbutton'
        controlNextButtonStatus();
    }

    // End the whole experiment
    endExperiment = () => {
        /// End the experiment
        // ---------------------------------------
        //  ??
        // ---------------------------------------
        console.log('End!!!');
    }

    render() {
        const { num_experiment, colors } = this.state;

        // Control each button's disabled status
        const { endButtonStatus, nextButtonStatus } = this.props;

        return (
            <div>
                <div class="rightInsBox">
                    <div class="textCenter">
                        <div style={{ marginBottom: '20px' }}> {num_experiment} / 5 </div>
                        <div>
                            {colors.map(color => (
                            <Label circular color={color}>
                            </Label>
                            ))}
                        </div>
                    </div>
                </div>
                <div class="rightinfoBox">
                    <div class="textCenter">
                        { endButtonStatus
                            ?   <Button fluid icon labelPosition='left' onClick={() => this.sendEndStatus()}>
                                    <Icon name='pause' />
                                    End Conversation
                                </Button>
                            :   <Button disabled fluid icon labelPosition='left' onClick={() => this.sendEndStatus()}>
                                    <Icon name='pause' />
                                    End Conversation
                                </Button>
                        }
                        <div style={{height: '20px'}}></div>
                        { nextButtonStatus
                            ?   <Button fluid icon labelPosition='right' onClick={() => { (num_experiment === 5) ? this.endExperiment() : this.sendStartStatus()}}>
                                    { (num_experiment === 5) 
                                        ? 'End'
                                        : 'Next Conversation'
                                    }
                                    <Icon name='right arrow' />
                                </Button>
                            :   <Button disabled fluid icon labelPosition='right' onClick={() => this.sendStartStatus()}>
                                    Next Conversation
                                    <Icon name='right arrow' />
                                </Button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
import React, { Component } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import './RightSideBar.css';
import { AnnotationList } from "./AnnotationList.js";

const databaseURL = "https://bixby-rawdata.firebaseio.com/";

export class RightSideBar extends Component {
    click_state = 0;

    constructor(props) {
	super(props);
	this.state = {
	    num_experiment: 1,
	    deviceList: [],
	    annotationList: [
		[
		{
		    i: 0,
		    j: 0,
		    device: "haha",
		    action: "I don't know",
		},
		{
		    i: 0,
		    j: 1,
		    device: "haha",
		    action: "I don't know"
		}],
		[
		{
		    i: 0,
		    j: 0,
		    device: "haha",
		    action: "I don't know",
		},
		{
		    i: 0,
		    j: 1,
		    device: "haha",
		    action: "I don't know"
		}],
		[
		{
		    i: 0,
		    j: 0,
		    device: "haha",
		    action: "I don't know",
		},
		{
		    i: 0,
		    j: 1,
		    device: "haha",
		    action: "I don't know"
		}],
		[{
		    i: 1,
		    j: 0,
		    device: "haha",
		    action: "I don't know"
		},
		{
		    i: 1,
		    j: 1,
		    device: "haha",
		    action: "I don't know haha "
		}]
	    ]
	};

    this._getDeviceList = this._getDeviceList.bind(this);
        this.sendTargetDevice = this.sendTargetDevice.bind(this);
        this.sendEndStatus = this.sendEndStatus.bind(this);
        this.sendStartStatus = this.sendStartStatus.bind(this);
        this.endExperiment = this.endExperiment.bind(this);

        this.getPreviousConversation = this.getPreviousConversation.bind(this);
        this.getNextConversation= this.getNextConversation.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.end !== this.props.end){
            if(this.props.end){
                this.setState({
                    deviceList: []
                });
                this.props.initializeDevicePath()
            }
            this.click_state = 0
        }
        if (prevProps.devicePath !== this.props.devicePath){
            this._getDeviceList();
        }
    }

    _getDeviceList() {
        fetch(`${databaseURL+this.props.devicePath}`).then(res => {
            if(res.status !== 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(deviceList => {
            this.setState({
                deviceList: deviceList
            })
        });
    }

    sendTargetDevice = (target) =>{
        this.props.setTargetDevice(target, this.click_state)
        this.click_state += 1
    }

    getPreviousConversation = () => {
        const { controlPrevConversationStatus } = this.props;

	controlPrevConversationStatus();
    }

    getNextConversation = () => {
        const { controlNextConversationStatus } = this.props;

	controlNextConversationStatus();
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
        const { num_experiment } = this.state;
        this.setState({
            num_experiment: num_experiment + 1,
        })

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
        const { num_experiment, deviceList, annotationList } = this.state;
        const { sendTargetDevice } = this;
        // Control each button's disabled status
        const { endButtonStatus, nextButtonStatus, botTurnStatus} = this.props;


        return (
            <div class="rightGrid">
                <div class="rightInsBox">
                    <div class="textLeftAlign">
		    	<h2 style={{marginTop: '10px'}} > Annotations </h2>

			<AnnotationList device={"haha"} actionList={annotationList} />

                        { deviceList.length === 0
                            ?   null
                            :   <Label color={'violet'} size={'large'}>사용 가능한 장치 목록</Label>
                        }
                        <div style={{height: '25px'}}></div>
                        {
                            deviceList.map(
                                (device, id) => (
                                    <div key={id}>
                                        <span style={{fontSize: '13px', color: '#E8EAF6', fontWeight: 'bold', paddingLeft: '9px', marginRight: '15px'}}>{'  -  '+device.name}</span>
                                        { botTurnStatus
                                            ?   null
                                            :   <button class="ui mini button" onClick={sendTargetDevice.bind(this, device)}><span style={{fontSize: '11px'}}>장치 추가</span></button>
                                        }
                                        <div style={{height: '10px'}}></div>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
                <div class="rightInfoBox">
                    <div class="textCenter">
		    <div style={{ marginBottom: '15px', fontSize: '21px' }}> </div>

		    <Button fluid icon labelPosition='left' onClick={() => this.getPreviousConversation()}>
		    이전 대화 보기
		    </Button>

		    <div style={{height: '20px'}}></div>

		    <Button fluid icon labelPosition='left' onClick={() => this.getNextConversation()}>
		    다음 대화 보기
		    </Button>

		    <div style={{height: '20px'}}></div>

		    <div style={{display: 'none'}}> 
		    { endButtonStatus
			?   <Button fluid icon labelPosition='left' onClick={() => this.sendEndStatus()}>
			    <Icon name='pause' />
			    이번 대화 종료
			    </Button>
			    :   <Button disabled fluid icon labelPosition='left' onClick={() => this.sendEndStatus()}>
			    <Icon name='pause' />
			    이번 대화 종료
			    </Button>
		    }

		    <div style={{height: '20px'}}></div>

		    { nextButtonStatus
			?   <Button fluid icon labelPosition='right' onClick={() => { (num_experiment === 6) ? this.endExperiment() : this.sendStartStatus()}}>
			{ (num_experiment === 6) 
			    ? '실험이 종료되었습니다!'
				: '다음 대화 시작'
			}
			<Icon name='right arrow' />
			    </Button>
			    :   <Button disabled fluid icon labelPosition='right' onClick={() => this.sendStartStatus()}>
			    다음 대화 시작
			    <Icon name='right arrow' />
			    </Button>
		    }
		    </div>
                    </div>
                </div>
            </div>
        );
    }
}

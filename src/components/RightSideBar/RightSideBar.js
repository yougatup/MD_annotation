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
	    curContribution: false,
	    num_experiment: 1,
	    curConversationIndex: -1,
	    numConversations:-1,
	    deviceList: [],
	    annotationListUpdated: false,
	    annotationRawDatabase: {},
	    annotationProcessedDatabase: {
		"queryquery": [] 
	    },
	    annotationList: []
	};

    	this._getDeviceList = this._getDeviceList.bind(this);
        this.sendTargetDevice = this.sendTargetDevice.bind(this);
        this.sendEndStatus = this.sendEndStatus.bind(this);
        this.sendStartStatus = this.sendStartStatus.bind(this);
        this.endExperiment = this.endExperiment.bind(this);

        this.getPreviousConversation = this.getPreviousConversation.bind(this);
        this.getNextConversation= this.getNextConversation.bind(this);

	this.controlAnnotationListUpdated = this.controlAnnotationListUpdated.bind(this);
	this.handleButtonClick = this.handleButtonClick.bind(this);
	this.handleRegisterButtonClick= this.handleRegisterButtonClick.bind(this);

	this._setCurrentAnnotationTargetDevice = this._setCurrentAnnotationTargetDevice.bind(this);
    }

    componentDidUpdate(prevProps) {
	const { currentConversation, currentConversationStatus, controlCurrentConversationStatus, curConversationIndex, totalNumConversations } = this.props;
	const { annotationRawDatabase } = this.state;

	console.log(curConversationIndex);
	console.log(totalNumConversations);

	if(curConversationIndex == -1 || totalNumConversations == -1) return;

	if(curConversationIndex != this.state.curConversationIndex || totalNumConversations != this.state.numConversations) {
	    this.setState( {
		curConversationIndex: curConversationIndex,
		numConversations: totalNumConversations
	    });
	}

	console.log(annotationRawDatabase);

	if(currentConversationStatus) { // updated
	    controlCurrentConversationStatus();

	    if(!(curConversationIndex in annotationRawDatabase)) {
		console.log(this.state.annotationList);

		var curAnnotationList = [];

		for(var i=0;i<currentConversation.length;i++) {
		    if(currentConversation[i].type == 'bot' && currentConversation[i].actionList.length > 0) {
			curAnnotationList.push({
			    query: '',
			    queryIndex: curAnnotationList.length,
			    actionList: currentConversation[i].actionList.map((t, i) => {
				return {
				    actionIndex: i,
				    device: t.device,
				    action: t.action
				}
			    })
			});
		    }
		}

		console.log(curAnnotationList);

		annotationRawDatabase[curConversationIndex] = {
		    processed: false,
		    annotation: Array.from(curAnnotationList)
		};

		this.setState({
		    annotationList: annotationRawDatabase[curConversationIndex].annotation, 
		    annotationRawDatabase: annotationRawDatabase,
		    annotationListUpdated: true,
		    curContribution: false
		});
	    }
	    else {
		this.setState({
		    annotationList: annotationRawDatabase[curConversationIndex].annotation, 
		    annotationListUpdated: true,
		    curContribution: annotationRawDatabase[curConversationIndex].processed
		});
	    }
	}
	else {
	    if(this.annotationListUpdated) {
		this.setState({
		    annotationListUpdated: false
		});
	    }
	}
/*
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
	*/
    }

    _setCurrentAnnotationTargetDevice = (t) => {
	const { setCurrentAnnotationTargetDevice, } = this.props;
	const { annotationProcessedDatabase  } = this.state;

	console.log(annotationProcessedDatabase);

	if(!(t in annotationProcessedDatabase)) setCurrentAnnotationTargetDevice(t, []);
	else setCurrentAnnotationTargetDevice(t, annotationProcessedDatabase[t] );
    }

    handleRegisterButtonClick() {
	const { annotationRawDatabase, annotationProcessedDatabase, curConversationIndex } = this.state;
	console.log("yay");

	console.log(annotationRawDatabase);
	console.log(annotationRawDatabase[curConversationIndex].annotation);
	console.log(annotationProcessedDatabase);

	var tmpProcessedDatabase = annotationProcessedDatabase;

	for(var i=0;i<annotationRawDatabase[curConversationIndex].annotation.length;i++) {
	    var queryString = annotationRawDatabase[curConversationIndex].annotation[i].query;

	    if(!(tmpProcessedDatabase["queryquery"].indexOf(queryString) >= 0))
		tmpProcessedDatabase["queryquery"].push(queryString);

	    for(var j=0;j<annotationRawDatabase[curConversationIndex].annotation[i].actionList.length;j++) {
		var acList = annotationRawDatabase[curConversationIndex].annotation[i].actionList[j];

		if(!(acList.device in tmpProcessedDatabase))
		    tmpProcessedDatabase[acList.device] = [];

		console.log(tmpProcessedDatabase[acList.device]);
		console.log(acList.action);
		console.log(tmpProcessedDatabase[acList.device].indexOf(acList.action));

		if(!(tmpProcessedDatabase[acList.device].indexOf(acList.action) >= 0))
		    tmpProcessedDatabase[acList.device].push(acList.action);
	    }
	}

	console.log(tmpProcessedDatabase);

	annotationRawDatabase[curConversationIndex].processed = true;

	this.setState( {
	    curContribution: true,
	    annotationProcessedDatabase: tmpProcessedDatabase
	});
    }

    handleButtonClick() {
	console.log("HI!");

	console.log(this.state.annotationRawDatabase.annotation);
	console.log(JSON.stringify(this.state.annotationRawDatabase.annotation, null, 2));
    }

    controlAnnotationListUpdated() {
	this.setState( {
	    annotationListUpdated: false
	});
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
        const { num_experiment, deviceList, annotationList, annotationListUpdated, numConversations, curConversationIndex, curContribution} = this.state;
        const { sendTargetDevice, controlAnnotationListUpdated, _setCurrentAnnotationTargetDevice  } = this;
        // Control each button's disabled status
        const { endButtonStatus, nextButtonStatus, botTurnStatus} = this.props;


        return (
            <div class="rightGrid">
                <div class="rightInsBox">
                    <div class="textLeftAlign">
		    	<div style={{marginTop: '10px', fontSize: '20px', display: 'inline'}} > Annotations </div> 
			{
			    curContribution ? 
				<div class="ui green label" display='inline'> Done </div>
				:

				<div class="ui red label" display='inline'> Processing </div>
			}

			<div> 
			<button style={{display: 'none'}} onClick={() => this.handleButtonClick()}> export </button>
			<button style={{marginTop: '5px'}} onClick={() => this.handleRegisterButtonClick()}> Submit the current annotations </button>
			</div>

			<AnnotationList 
				device={"haha"}
				actionList={annotationList}
				annotationListUpdated={annotationListUpdated}
				controlAnnotationListUpdated={controlAnnotationListUpdated} 
				setCurrentAnnotationTargetDevice={_setCurrentAnnotationTargetDevice}
				/>

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

		    <div style={{marginBottom: '15px'}} > {curConversationIndex+1} / {numConversations} </div>

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

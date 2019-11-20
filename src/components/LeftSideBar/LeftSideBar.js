import React, { Component } from 'react';
import './LeftSideBar.css';
import { Label } from 'semantic-ui-react';


export class LeftSideBar extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
	const { annotationTarget, annotationActionList } = this.props;

        return (
            <div class="leftGrid">
                <div class="protobotLogo">Conversation Data Annotation</div>
                <div class="sessionBox">Multi Device Interaction</div>
                <div class="uIdBox">
                    <Label color={'violet'}>User Id</Label>
                    <span style={{marginLeft: '10px'}}>{this.props.u_id}</span>
                </div>
                    <div class="leftInsBox">
                        <div class="leftInsBoxText">
			<div class='sessionBox'> Action List </div>
			<div class='deviceBox'>
				device:  {annotationTarget}
			</div>
			<div class='actionBox'>
				actions:
				{
				    annotationActionList.map( t => (
						<div> * {t} </div>
					)
				    )
				}
			</div>

                        </div>
                    </div>
            </div>
        );
    }
}

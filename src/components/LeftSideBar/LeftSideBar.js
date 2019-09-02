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
        return (
            <div class="leftGrid">
                <div class="protobotLogo">Raw Data Collecting</div>
                <div class="sessionBox">Multi Device Interaction</div>
                <div class="uIdBox">
                    <Label color={'violet'}>User Id</Label>
                    <span style={{marginLeft: '10px'}}>{this.props.u_id}</span>
                </div>
                    <div class="leftInsBox">
                        <div class="leftInsBoxText">
                        </div>
                    </div>
            </div>
        );
    }
}
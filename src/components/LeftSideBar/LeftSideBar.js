import React, { Component } from 'react';
import './LeftSideBar.css';

export class LeftSideBar extends Component {
    render() {
        return (
            <div class="leftGrid">
                <div class="protobotLogo">Protobot</div>
                <div class="leftInsBox">
                    <div class="textCenter">
                        Instruction
                    </div>
                </div>
                <div class="leftInfoBox"><div class="textCenter">Section B</div></div>
            </div>
        );
    }
}
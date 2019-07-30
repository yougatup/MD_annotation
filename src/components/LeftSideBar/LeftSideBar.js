import React, { Component } from 'react';
import './LeftSideBar.css';

export class LeftSideBar extends Component {
    render() {
        return (
            <div>
                <div class="protobotLogo">Protobot</div>
                <div class="leftInsBox"><div class="textCenter">Section A</div></div>
                <div class="leftInfoBox"><div class="textCenter">Section B</div></div>
            </div>
        );
    }
}
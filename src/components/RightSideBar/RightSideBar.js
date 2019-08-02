import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import './RightSideBar.css';

export class RightSideBar extends Component {
    render() {
        return (
            <div>
                <div class="rightInsBox"><div class="textCenter">Section C</div></div>
                <div class="rightinfoBox">
                    <div class="textCenter">
                        <Button fluid icon labelPosition='left'>
                            <Icon name='pause' />
                            End Conversation
                        </Button>
                        <div style={{height: '20px'}}></div>
                        <Button fluid icon labelPosition='right'>
                            Next Conversation
                            <Icon name='right arrow' />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
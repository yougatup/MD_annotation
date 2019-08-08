import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import './SystemUserButton.css';

export class SystemUserButton extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            otherResponseList: [],
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleNotapplicable = this.handleNotapplicable.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // 여기서는 setState 를 하는 것이 아니라
        // 특정 props 가 바뀔 때 설정하고 설정하고 싶은 state 값을 리턴하는 형태로
        // 사용됩니다.
        if (nextProps.otherResponseList !== prevState.otherResponseList) {
          return { otherResponseList: nextProps.otherResponseList};
        }
        return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
    }

    handleCreate = (response, i) => {
        const { similarResponse } = this.props;
        similarResponse(response, i);
    }

    handleNotapplicable = () => {
        const { originResponse, similarResponse } = this.props;
        
        // Adding new response(User)

        similarResponse(originResponse);
    }

    render() {
        const { otherResponseList } = this.state;
        const { handleCreate, handleNotapplicable } = this;

        return (
            <div class="systemUserButtonBox">
                <span style={{fontWeight: "bold", fontSize: "13px"}}>System : </span>
                <span>Select the similar response with your response!</span>
                <Segment.Group>
                    <Segment textAlign='center'>
                        {otherResponseList.map((response, i) => {
                            return ( 
                                <div>
                                <Button fluid onClick={handleCreate.bind(this, response.text, i)}>{response.text}</Button>
                                <div style={{height: '10px'}}></div>
                                </div>
                            );
                        })}
                        <Button fluid negative onClick={handleNotapplicable}>해당 없음</Button>
                    </Segment>
                </Segment.Group>
            </div>
        );
    }
}

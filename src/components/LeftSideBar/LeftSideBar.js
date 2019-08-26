import React, { Component } from 'react';
import './LeftSideBar.css';

const databaseURL = "https://protobot-rawdata.firebaseio.com/";

export class LeftSideBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            input: '',
            r_List: [],
        }
	    this._getRequirements = this._getRequirements.bind(this);
	    this.changeCheckedRequirement = this.changeCheckedRequirement.bind(this);
    }

    componentDidMount() {
        this._getRequirements();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.start === true){
            this._getRequirements();
        }
        if (prevProps.requirement !== this.props.requirement){
            this.changeCheckedRequirement()
        }
    }

    _getRequirements() {
        fetch(`${databaseURL}/topics/1/requirementList.json`).then(res => {
            if(res.status !== 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(requirementList => {
            this.setState({
                r_List: requirementList
            })
        });
    }

    changeCheckedRequirement = () => {
        const {r_List} = this.state
        const {requirement} = this.props
        this.setState({
            r_List: r_List.map(r => r.requirement === requirement.requirement
                ? { requirement: requirement.requirement, checked: true}
                : r
            )
        })
    }

    handleChangeText = (e) => {
        this.setState({
            input: e.target.value
        });
    }

    render() {
        const {r_List} = this.state
        return (
            <div class="leftGrid">
                <div class="protobotLogo">Protobot</div>
                <div class="leftInsBox">
                    <div class="textCenter">
                        <span style={{fontSize: '20px', color: '#E8EAF6'}}>Requirement List</span>
                        <div style={{height:'25px'}}></div>
                        {r_List.map((requirement, i) => {
                            return requirement.checked
                                ?   <div>
                                        <div style={{height:'10px'}}></div>
                                        <div class="ui checked checkbox">
                                            <input type="checkbox" checked="true" class="hidden" readonly="" tabindex={i}/>
                                            <label style={{color:'white'}}>{requirement.requirement}</label>
                                        </div>
                                    </div>
                                :   <div>
                                        <div style={{height:'10px'}}></div>
                                        <div class="ui checked checkbox">
                                            <input type="checkbox" class="hidden" readonly="" tabindex={i}/>
                                            <label style={{color:'white'}}>{requirement.requirement}</label>
                                        </div>
                                    </div>
                            })
                        }
                    </div>
                </div>
                <div class="leftInfoBox">
                    <div class="textCenter">
                    </div>
                </div>
            </div>
        );
    }
}
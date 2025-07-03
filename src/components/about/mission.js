import React from "react";

class MissionComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list : []
        }


    }

    componentWillReceiveProps(curP, prevP){
        // console.log(curP, 'curP')
        let data = [
            {
                nameA : 'Neha Singh',
                nameB : 'banti Shaw'
            }
        ]
        if(curP.toggleMission === true){
            this.setState({list : data});
            // console.log('componentWillReceiveProps', curP, 'curP', prevP, 'prevP', this.state.list, 'this.state.list')
        }
    }

    render(){
        return(
            <>
                <h6>Our Mission</h6>
                {
                    !this.props.toggleMission ?
                    <p>{this.props.content}</p>
                    : null
                }

                {
                    this.state.list.length > 0 ?
                    <div>
                        {
                            this.state.list.map((item, k) => {
                                return <p key={k}>{item.nameA}, {item.nameB}</p>
                            })
                        }
                    </div> 
                    : <p>Loading ...</p>
                }

                <button onClick={this.props.toggleSwitch} className="btn btn-primary mb-3">Show / Hide</button>
                
            </>
        )
    }
}

export default MissionComponent;
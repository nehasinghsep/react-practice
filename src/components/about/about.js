import React, {Suspense} from "react";
import { connect } from 'react-redux';
import VisionComponent from './vision';
// const VisionComponent = React.lazy(() => import('./vision'));
import MissionComponent from './mission';
import ButtonContent from './button-content';
import { changeThemeLight, changeThemeDark } from '../../redux/action/themeAction';


class AboutComponent extends React.Component {
    constructor(props){
        super(props);
        this.divRef =   React.createRef();
        this.state = {
            count : 0,
            inHtmlData : `lorem <b onmouseover="alert('mouseover');">ipsum</b>`,
            toggleMission : false,
            missionContent : "React Testing Library is a great tool for testing React components. It’s a set of helpers that let you test React components without relying on their implementation details.",
        }

        this.setCount = this.setCount.bind(this);
    }

    shouldComponentUpdate(nextP, nextS){
        if(nextS.toggleMission !== this.state.toggleMission){
            if(this.state.count < 1){
                // console.log('shouldComponentUpdate false', nextP, 'curS', nextS, 'nextS');
                return true;
            } else {
                return false;
                // console.log('df');
            }
        } else {
            return true
        }
    }

    setCount () {
        this.setState({count : this.state.count + 1})
    }

    showMission = () => {
        this.setState({ toggleMission : !this.state.toggleMission })
    }

    componentDidMount(){
        /* setInterval(() => {
            this.setCount()
        },1000) */
    }

    handlchangeTheme = () => {
        if(this.props.curTheme == 'light'){
            this.props.changeThemeDark();
        } else {
            this.props.changeThemeLight();
        }
    }

    handleClickWithParams (e, param) {
        console.log(e, param);
        e.stopPropagation();
    }

    parentClick = () => {
        console.log('Parent Clicked');
        console.log(this.divRef.current.getAttribute('id'))
    }

    render(){
        // console.log('about us')
        return(
            <>
                <section className="p-5 mt-4">
                    <h6>About us</h6>
                    <p>Theme : {this.props.curTheme}</p>
                    <button className="mb-3 btn btn-primary" onClick={this.handlchangeTheme}>Change Theme</button>
                    <p>HTML Content : <span dangerouslySetInnerHTML={{__html:this.state.inHtmlData}}></span></p>
                    <p>Stopwatch : {this.state.count}</p>
                    <button className="mb-3 btn btn-primary" onClick={this.setCount}>Increase</button>
                    <div ref={this.divRef} id='test' style={{width: '300px', height: '100px', border: '1px solid #ccc'}} onClick={this.parentClick}><button onClick={(e) => this.handleClickWithParams(e, 'test')}>Click With Params</button></div>

                    {/* <Suspense fallback={<div>Loading...</div>}> */}
                        <VisionComponent />
                    {/* </Suspense> */}
                    
                    <MissionComponent toggleMission={this.state.toggleMission} toggleSwitch={this.showMission} content={this.state.missionContent} />

                    <ButtonContent />
                </section>
            </>
        )
    }

}

function mapStateToProps(state) {
    return {
        curTheme: state.themeReducer.theme
    }
}

function mapDispatchToProps (dispatch) {
    return {
        changeThemeLight: () => dispatch(changeThemeLight()),
        changeThemeDark: () => dispatch(changeThemeDark())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutComponent);

/* function mapStateToProps(state){
    return {
        curTheme : state.themeReducer.theme
    };
}

const mapDispatchToProps = dispatch => ({
    changeThemeLight: () => dispatch(changeThemeLight()),
    changeThemeDark: () => dispatch(changeThemeDark())
})

export default connect(mapStateToProps, mapDispatchToProps)(AboutComponent); */
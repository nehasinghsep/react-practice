import React from "react";
import ButtonHoc from './button';

class ButtonContent extends React.Component {
    constructor(){
        super()

    }

    render(){
        return(
            <>
                <hr/>

                <button className="btn btn-danger">HOC</button>

            </>
        )
    }
}

 ButtonContent = ButtonHoc(ButtonContent);

export default ButtonContent;
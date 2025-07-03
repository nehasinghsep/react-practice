import React, { Component } from "react";

export default function ButtonHoc(ButtonContent) {
    return class extends Component {
        render(){
            let theme = 'red';

            return(
                <>
                    {
                        (theme === 'green')? <ButtonContent /> : null
                    }
                    
                </>
            )
        }
    }

}
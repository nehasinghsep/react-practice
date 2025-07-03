import React, {Component, useEffect} from 'react';
export default function ControlledInput(props) {
    return (
        <input type="text" value={props.address} onChange={props.handleInput}/>
    )
}
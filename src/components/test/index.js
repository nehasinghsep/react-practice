import React, { Component, useState, useEffect, useCallback } from 'react';
import ControlledInput from './controlled-input';
  
function Test() {
  let [name, setName] = useState('Neha');
  let [address, setAddress] = useState('Kolkata');
  let [time, setTime] = useState(new Date().getTime());

  useEffect(() => {
    let interval = startTimer();
    document.getElementById("submitBttn").addEventListener('click', handleClickBttn);
    return () => {
      clearInterval(interval);
      document.getElementById("submitBttn").removeEventListener('click', handleClickBttn);
    }
  }, [])
  const startTimer = () => {
    let interval = setInterval(() => {  
      setTime(new Date().getTime());
    }, 1000);
    return interval;
  }
  const handleClick = useCallback(() => {
    console.log('Clicked')
  }, [])
  const handleClickBttn = useCallback(() => {
    console.log('handleClickBttn')
  }, [])

  const handleInput = (e) => {
    console.log(e.target.value);
    setAddress(e.target.value);
  }
  return (
    <div style={{marginTop: '100px'}}>
      Time : {time}
      {/* <input type="text" defaultValue="" onChange={handleInput}/> */}
      <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
      { !!address ? <ControlledInput address={address} handleInput={handleInput}/> : 'Hidden'}
      <button onClick={handleClick}>Click</button>
      <button id="submitBttn">Click By Id</button>
    </div>
  )
}

export default Test;
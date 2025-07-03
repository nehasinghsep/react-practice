import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './login.css';
import {changeThemeLight, changeThemeDark} from '../redux/action/themeAction';
import {increment, decrement, resetCount} from '../redux/action/counterAction';

export default function Login(){
    const history = useHistory();
    const [userList, setUserList] = useState([]);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');
    const [loginErr, setLoginErr] = useState('');
    const [errorData, setErrorData] = useState({});
    const dispatch = useDispatch();
    const curVal = useSelector((state) => state.counterReducer.count);
    const curTheme = useSelector((state) => {
        return state.themeReducer.theme;
    });


    useEffect(() => {
        getUser();
    },[])

    const handleChangeTheme = () => {
        if(curTheme == 'light'){
            dispatch(changeThemeDark());
        } else {
            dispatch(changeThemeLight());
        }
    }

    const handleChangeIncCount = () => {
        if(curVal < 10) {
            dispatch(increment());
        }
    }

    const handleChangeDecCount = () => {
        if(curVal > 0) {
            dispatch(decrement());
        }
    }

    const handleChangeReset = () => {
        dispatch(resetCount());
    }

    async function getUser() {
        try {
          const response = await axios.get('/data.json');
          const res = response.data.data;
          setUserList(res.user)
        //   console.log("res", res.user);
        } catch (error) {
          console.error(error);
        }
    }

    const validateForm = () => {
        let isError = false;
        let errorObj = {...errorData};
        if(!!!userId){
            isError = true;
            errorObj.userId = 'Please enter user id';
        }
        if(!!!password){
            isError = true;
            errorObj.userPass = 'Please enter password';
        }
        setErrorData(errorObj);
        return !isError;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = validateForm();

        if(isValid){
            let data = {
                'userName' :  userId,
                'password' :  password,
            }
            submitLoginForm(data);
            setUserId('');
            setPassword('');
        }
        // console.log(userId, password)
    }

    const submitLoginForm = (loginData) => {
        // console.log(loginData)
        let userId = loginData.userName;
        let userPass = loginData.password;

        if(!!userList){
            let userLoginId = userList[0].loginId
            let userLoginPass = userList[0].password
            // console.log('userList',userListData)
            if (userId === userLoginId && userPass === userLoginPass){
                localStorage.setItem('pocNeha', JSON.stringify(userList[0]));
                setLoginSuccess('Login Successful');
                history.push("/product-list");
                // console.log('Login success')
            }else{
                setLoginErr('Login Failed');
                // console.log('Login fail')
            }
        }  
    }

    return(
        <>
            <div className="container-fluid login-page">  
                {
                    !!loginSuccess ? 
                        <div className="position-absolute m-2 alert-wrap">
                        <div className="alert alert-success m-0" role="alert">
                            {loginSuccess}
                        </div></div> : null
                }
                {
                    !!loginErr ? 
                        <div className="position-absolute m-2 alert-wrap">
                        <div className="alert alert-danger m-0" role="alert">
                            {loginErr}
                        </div></div> : null
                } 
                <div className="row">
                    <div className="col-6 p-0">
                        <div className="left-part">
                            <img src="https://learningmate2.wpenginepowered.com/wp-content/uploads/2020/04/LearningMate-logo.svg" alt="" title="" className="logo"></img>
                            <p>
                                POC <br/>
                                Neha Singhs <br/>
                                {curTheme} <br/>
                                {curVal}
                            </p>
                        </div>
                    </div>
                    <div className="col-6 p-0">
                        <div className="right-part p-2 d-flex align-items-center justify-content-center">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    {
                                        !!errorData.userId ? 
                                            <div className="alert alert-danger m-0" role="alert">
                                                {errorData.userId}
                                            </div> : null
                                    }
                                    <label htmlFor="inputEmail" className="form-label">Email address</label>
                                    <input type="email" onChange={(e) => setUserId(e.target.value)} value={userId} 
                                        className="form-control" id="inputEmail" />
                                </div>
                                <div className="mb-3">
                                    {
                                        !!errorData.userPass ? 
                                            <div className="alert alert-danger m-0" role="alert">
                                                {errorData.userPass}
                                            </div> : null
                                    }
                                    <label htmlFor="inputPassword" className="form-label">Password</label>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} 
                                        className="form-control" id="inputPassword" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <button type="button" onClick={handleChangeTheme} className="btn btn-primary ms-1">Change Theme</button>
                                <button type="button" onClick={handleChangeIncCount} className="btn btn-primary ms-1">Increment</button>
                                <button type="button" onClick={handleChangeDecCount} className="btn btn-primary ms-1">Decrement</button>
                                <button type="button" onClick={handleChangeReset} className="btn btn-primary ms-1">Reset</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
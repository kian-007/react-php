import React, { useState, useEffect, useRef, useContext } from 'react';
import './logIn.css';
import LoginFormComponent from './loginFormComponent'
import RegisterFormComponent from './registerFormComponent'
// import sha1 from 'crypto-js/sha1';
// import CryptoJS from 'crypto-js';
// import cryptoJs from 'crypto-js';
// import Base64 from 'crypto-js/enc-base64';
// import {createHash,update,digest} from 'crypto'

const LogIn = () => {
    const [loginPage, setLoginPage] = useState(true)
    const [registerPage, setRegisterPage] = useState(false)

    const handleRegisterPage = () => {
        setRegisterPage(true)
        setLoginPage(false)
    }

    const handleLoginPage = () => {
        setRegisterPage(false)
        setLoginPage(true)
    }


    return (

        <div className="container">

            <div className="options">
                <ul>
                    <li><button onClick={handleRegisterPage}>Register</button></li>
                    <li><button onClick={handleLoginPage}>LogIn</button></li>
                </ul>
            </div>

            {registerPage ? (
                <div>
                    <RegisterFormComponent />
                </div>
            ):(<></>)}


            {loginPage ? (
                <LoginFormComponent />
            ) : (<></>)}
        </div>

    );
}

export default LogIn;
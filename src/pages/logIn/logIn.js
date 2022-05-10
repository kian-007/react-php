import React, { useState, useEffect, useRef, useContext } from 'react';
import { RestFulApi } from '../../apis/api';
import { ButtonComponent } from '../../components';
import { AuthContext } from '../../contexts/authContext';
import { getCookie } from '../../utils/functions';
import Message from '../../utils/message/message';
import { ValidateUsername, ValidatePassword } from '../../utils/validation';
import './logIn.css';
// import sha1 from 'crypto-js/sha1';
// import CryptoJS from 'crypto-js';
// import cryptoJs from 'crypto-js';
// import Base64 from 'crypto-js/enc-base64';
// import {createHash,update,digest} from 'crypto'

const LogIn = () => {
    const [userInput, setUserInput] = useState("")
    const [passInput, setPassInput] = useState("")
    const [userInputText, setUserInputText] = useState("")
    const [passInputText, setPassInputText] = useState("")
    const [post, setPost] = useState([])
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const inputsform = useRef(null)
    const inputfocus = useRef(null)
    const buttonSubmitRef = useRef(null)
    const { login, currentUserId, currentUserData, catchError } = useContext(AuthContext)

    // console.log("function existense", typeof authentication.is_user_logged_in)

    const handleUserInput = (event) => {
        setUserInputText(event.target.value)
        if (event.target.value.length === 0) {
            setErrors({
                ...errors,
                username: "The Username can not be empty.",
            })
            setUserInput(event.target.value);
        } else if (ValidateUsername(event.target.value)) {
            setErrors({
                ...errors,
                username: null,
            })
            setUserInput(event.target.value);
        } else {
            setErrors({
                ...errors,
                username: 'The Username must be more than 6 characters.'
            })
            setUserInput("")
        }
    }

    const handlePassInput = (event) => {
        setPassInputText(event.target.value)
        if (event.target.value.length === 0) {
            setErrors({
                ...errors,
                password: 'The Password can not be empty.'
            })
        } else if (ValidatePassword(event.target.value)) {
            setErrors({
                ...errors,
                password: null,
            })
            setPassInput(event.target.value);
        } else {
            setErrors({
                ...errors,
                password: 'The Password is not valid!'
            })
            setPassInput("")
        }
    }

    let newUserInput = "";

    const process_inputs = () => {
        if (!userInput) {
            setErrors({
                ...errors,
                username: "Username Validation Error!"
            })
            return false;
        } else {
            setErrors({
                ...errors,
                username: null,
            })
        }

        if (!passInput) {
            setErrors({
                ...errors,
                password: "Password Validation Error!"
            })
            return false;
        } else {
            setErrors({
                ...errors,
                password: null,
            })
        }


        newUserInput = userInput.toLowerCase()

    }

    // const refreshhh = () => {
    //     setRefresh(refresh + 1)

    // }






    const handleSubmit = () => {
        let p = process_inputs()
        if (p == false) {
            return;
        }
        setLoading(true)
        setRefresh(refresh + 1)
        // login(userInput, passInput)

        setUserInputText("")
        setPassInputText("")
        setSubmitted(true)

        buttonSubmitRef.current.classList.add('activeButtonLogin')
    }

    useEffect(() => {
        let lastAccess = getCookie('last_access')
        console.log("lastAccess", lastAccess)
        if (submitted && refresh > 0) {
            login(userInput, passInput)
            if (currentUserId) {
                setLoading(false)
                setPost(currentUserData)
            }
            if (!currentUserId) {
                setLoading(false)
                setPost("Login failed!")
            }
        }
    }, [refresh, submitted, currentUserId])




    let postObjectLenght;
    const checkType = () => {
        if (typeof post == "object" && post != null) {
            postObjectLenght = Object.keys(post).length
            return postObjectLenght;
        }
    }

    if (typeof post == "object") {
        postObjectLenght = checkType();
        // console.log("object length: ", postObjectLenght)
    }


    useEffect(() => {
        if (currentUserId) {
            // window.location.replace('http://localhost:3000/home')
            window.location.href = 'https://kikiq.ir/'
        }
    }, [currentUserId])


    useEffect(() => {
        // inputsform.current.classList.add('formOnLoad')
        // msgref.current.classList.add('msgref')
        inputfocus.current.focus();
    }, [])

    // let message = "King.kian007"
    // useEffect(() => {
    // var shasum = createHash('sha1')
    // shasum.update('King.kian007')
    // shasum.digest('hex')
    // console.log("shasum: ", shasum)

    // }, [passInput])





    return (
        <div className="LogIn" ref={inputsform}>
            {typeof (post) != "object" ? (
                post != null && post.length > 0 && (<Message clas="success" stylee={{ display: "block" }}>Good Luck ^_^</Message>)
            ) : (
                post != null && postObjectLenght > 0 && (<Message clas="success" stylee={{ display: "block" }}>Good Luck ^_^</Message>)
            )}


            <form onSubmit={(e) => { e.preventDefault() }} className="form" id="form1">

                <div className="formInput username">
                    {errors.username && <span className="Errors">{errors.username}</span>}
                    <input ref={inputfocus} type="text" value={userInputText} onChange={handleUserInput} placeholder="test" />
                    <label>Username</label>
                </div>

                <div className="formInput password">
                    {errors.password && <span className="Errors">{errors.password}</span>}
                    <input type="text" value={passInputText} onChange={handlePassInput} placeholder="Test.123" />
                    <label>Password</label>
                </div>


                <div ref={buttonSubmitRef}>
                    <ButtonComponent handleClick={() => { handleSubmit() }} btntype="submit" btnform="form1"  >
                        LogIn
                    </ButtonComponent>
                </div>
            </form>


            <div>
                {post == null && (
                    <span>There is nothing to show!</span>
                )}

                {loading ? (<span style={{ color: "var(--black)" }}>Loading...</span>) : (
                    post != null && typeof (post) == "string" || typeof (post) == "number" ? (
                        <span>{post}</span>
                    ) : post != null && (
                        <div>
                            {Object.keys(post).map(item => (
                                <div>
                                    <span>{item}: {post[item]}</span><br />
                                </div>
                            ))}
                        </div>
                    )
                )}
                {post != null && typeof (post) == "boolean" && (
                    <div>
                        <span>{post == true && "This is a true response"}</span>
                        <span>{post == false && "This is a false response"}</span>
                    </div>
                )}

                {loading ? (<span style={{ color: "var(--black)" }}>Loading...</span>) : (<span>{refresh}</span>)}
                {/* {post} */}
            </div>
        </div>
    );
}

export default LogIn;
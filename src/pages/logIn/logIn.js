import React, { useState, useEffect, useRef, useContext } from 'react';
import { RestFulApi } from '../../apis/api';
import { ButtonComponent } from '../../components';
import AuthContextProvider, { AuthContext } from '../../contexts/authContext';
import Message from '../../utils/message/message';
import { ValidateUsername, ValidatePassword } from '../../utils/validation';
import './logIn.css';

const LogIn = () => {
    const [userInput, setUserInput] = useState("")
    const [passInput, setPassInput] = useState("")
    const inputsform = useRef(null)
    const inputfocus = useRef(null)
    const buttonSubmitRef = useRef(null)
    const [post, setPost] = useState([])
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const { login, currentUserId } = useContext(AuthContext)
    // window.location.replace("http://localhost:3000/");


    // console.log("function existense", typeof authentication.is_user_logged_in)

    const handleUserInput = (event) => {
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


    var a;
    var p;
    const handleSubmit = () => {
        p = process_inputs()
        if(p == false){
            return;
        }
        // console.log("process", process_inputs)
        setLoading(true)
        let finalResponse = RestFulApi(`http://localhost/apis/api.php?fn=user_exists&arg1=${userInput}`)

        finalResponse.then(function (value) {
            a = value
            setPost(a)
            setLoading(false);
            buttonSubmitRef.current.classList.add('activeButtonLogin')
            login("09198361951")
            console.log("userId", currentUserId)
        });

        finalResponse.catch(function (reason) {
            setLoading(false)
        });
    }




    useEffect(() => {
        // inputsform.current.classList.add('formOnLoad')
        // msgref.current.classList.add('msgref')
        inputfocus.current.focus();
    }, [])





    return (
        <div className="LogIn" ref={inputsform}>

            {post != null && post.length > 0 && (<Message clas="success" stylee={{ display: "block" }}>Good Luck ^_^</Message>)}
            <form onSubmit={(e) => { e.preventDefault() }} className="form" id="form1">

                <div className="formInput username">
                    {errors.username && <span className="Errors">{errors.username}</span>}
                    <input ref={inputfocus} type="text" onChange={handleUserInput} placeholder="test" />
                    <label>Username</label>
                </div>

                <div className="formInput password">
                    {errors.password && <span className="Errors">{errors.password}</span>}
                    <input type="text" onChange={handlePassInput} placeholder="Test.123" />
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
                    ) : (
                        <div>
                            {Object.keys(post).map(item => (
                                <div>
                                    <span>{item}: {post[item]}</span><br />
                                </div>
                            ))}
                        </div>
                    )
                )}

                {typeof (post) == "boolean" && (
                    <div>
                        <span>{post == true && "This is a true response"}</span>
                        <span>{post == false && "This is a false response"}</span>
                    </div>
                )}

                {/* {post} */}
            </div>
        </div>
    );
}

export default LogIn;
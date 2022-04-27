import React, { useState, useEffect, useRef } from 'react';
import { ButtonComponent } from '../../components';
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
    // window.location.replace("http://localhost:3000/");

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
        }
    }

    let newUserInput = "";

    const process_inputs = () => {
        if (!userInput) {
            setErrors({
                ...errors,
                username: "Username Validation Error!"
            })
            return;
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
            return;
        } else {
            setErrors({
                ...errors,
                password: null,
            })
        }


        newUserInput = userInput.toLowerCase()

    }


    var a;
    var k;
    const requestApi = async () => {
        process_inputs()
        setLoading(true)
        const responsePosts = await fetch(`https://apis.kikiq.ir/api.php?fn=hey&arg1=${newUserInput}`)
        const posts = await responsePosts.json()
        return posts;
    }

    const handleSubmit = () => {
        let finalResponse = requestApi()

        finalResponse.then(function (value) {
            console.log("sucsessfull respnse: ", JSON.stringify(value));
            // console.log("type of value2: ", typeof (value));
            a = value
            setPost(a)
            setLoading(false);
            buttonSubmitRef.current.classList.add('activeButtonLogin')
        });

        finalResponse.catch(function (reason) {
            console.log("rejected response ", reason);
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

            {post.length > 0 && (<Message clas="success" stylee={{ display: "block" }}>Good Luck ^_^</Message>)}
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
                {loading ? (<span style={{ color: "var(--black)" }}>Loading...</span>) : (
                    typeof (post) == "string" ? (
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

                {/* {post} */}
            </div>
        </div>
    );
}

export default LogIn;
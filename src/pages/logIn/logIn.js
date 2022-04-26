import React, { useState, useEffect, useRef } from 'react';
import { ButtonComponent } from '../../components';
import { ValidateUsername } from '../../utils/validation';
import './logIn.css';

const LogIn = () => {
    const [userInput, setUserInput] = useState("")
    const [passInput, setPassInput] = useState("")
    const inputsform = useRef(null)
    const inputfocus = useRef(null)
    const [post, setPost] = useState([])
    const [errors, setErrors] = useState({})
    // window.location.replace("http://localhost:3000/");

    const handleUserInput = (event) => {
        if (ValidateUsername(event.target.value)) {
            setErrors({
                ...errors,
                username: null,
            })
            setUserInput(event.target.value);
        } else {
            setErrors({
                ...errors,
                username: 'The Username must be more than 6 characters!'
            })
        }
    }

    const handlePassInput = (event) => {
        setPassInput(event.target.value)
    }

    let newUserInput = "";
    const process_inputs = () => {
        newUserInput = userInput.toLowerCase()
    }


    var a;
    var k;
    const requestApi = async () => {
        process_inputs()
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
        });
        finalResponse.catch(function (reason) {
            console.log("rejected response ", reason);
        });

    }



    useEffect(() => {
        // inputsform.current.classList.add('formOnLoad')
        inputfocus.current.focus();
    }, [])


    return (
        <div className="LogIn" ref={inputsform}>
            <form onSubmit={(e) => { e.preventDefault() }} className="form" id="form1">

                <div className="formInput username">
                    {errors.username && <span className="Errors">{errors.username}</span>}
                    <input ref={inputfocus} type="text" onChange={handleUserInput} placeholder="test" />
                    <label>Username</label>
                </div>

                <div className="formInput password">
                    <input type="text" onChange={handlePassInput} placeholder="Test.123" />
                    <label>Password</label>
                </div>
                {/* <input type="submit" /> */}


                <ButtonComponent handleClick={() => { handleSubmit() }} btntype="submit" btnform="form1" >
                    LogIn
                </ButtonComponent>
            </form>


            <div>
                {typeof (post) == "string" ? (
                    <span>{post}</span>
                ) : (
                    <div>
                        {Object.keys(post).map(item => (
                            <div>
                                <span>{item}: {post[item]}</span><br />
                            </div>
                        ))}
                    </div>
                )}

                {/* {post} */}
            </div>
        </div>
    );
}

export default LogIn;
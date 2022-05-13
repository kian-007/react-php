import React, { useState, useEffect, useRef, useContext } from 'react';
import { RestFulApi } from '../../apis/api';
import { ButtonComponent } from '../../components';
import { AuthContext } from '../../contexts/authContext';
import { getCookie } from '../../utils/functions';
import Message from '../../utils/message/message';
import { ValidateUsername, ValidatePassword } from '../../utils/validation';

const LoginFormComponent = () => {
    const [userInput, setUserInput] = useState("")
    const [passInput, setPassInput] = useState("")
    const [passReEnterInput, setPassReEnterInput] = useState("")
    const [nameInput, setNameInput] = useState("")
    const [lastNameInput, setLastNameInput] = useState("")
    const [userInputText, setUserInputText] = useState("")
    const [passInputText, setPassInputText] = useState("")
    const [nameInputText, setNameInputText] = useState("")
    const [lastNameInputText, setLastNameInputText] = useState("")
    const [passReEnterInputText, setPassReEnterInputText] = useState("")
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

    const handleNameInput = (event) => {
        setNameInputText(event.target.value)
        if (event.target.value.length === 0) {
            setErrors({
                ...errors,
                firstName: "The FirstName can not be empty.",
            })
            setNameInput(event.target.value);
        } else {
            setErrors({
                ...errors,
                firstName: null,
            })
            setNameInput(event.target.value);
        }

    }


    const handleLastNameInput = (event) => {
        setLastNameInputText(event.target.value)
        if (event.target.value.length === 0) {
            setErrors({
                ...errors,
                lastName: "The LastName can not be empty.",
            })
            setLastNameInput(event.target.value);
        } else {
            setErrors({
                ...errors,
                lastName: null,
            })
            setLastNameInput(event.target.value);
        }

    }


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

    const handlePassReEnterInput = (event) => {
        setPassReEnterInputText(event.target.value)
        if (event.target.value.length === 0) {
            setErrors({
                ...errors,
                passReEnter: 'The Re-Enter Password can not be empty.'
            })
        } else if (ValidatePassword(event.target.value)) {
            setErrors({
                ...errors,
                passReEnter: null,
            })
            setPassReEnterInput(event.target.value);
        } else {
            setErrors({
                ...errors,
                passReEnter: 'The Re-Enter Password is not valid!'
            })
            setPassReEnterInput("")
        }
    }


    // let newUserInput = "";
    const process_inputs = () => {
        if (!nameInput) {
            setErrors({
                ...errors,
                firstName: "FirstName Validation Error!"
            })
            return false;
        } else {
            setErrors({
                ...errors,
                firstName: null,
            })
        }

        if (!lastNameInput) {
            setErrors({
                ...errors,
                lastName: "LastName Validation Error!"
            })
            return false;
        } else {
            setErrors({
                ...errors,
                lastName: null,
            })
        }

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

        if (!passReEnterInput) {
            setErrors({
                ...errors,
                passReEnter: "Re-enter Password Validation Error!"
            })
            return false;
        } else {
            setErrors({
                ...errors,
                passReEnter: null,
            })
        }

        // newUserInput = userInput.toLowerCase()
    }

    console.log("Errors", errors)

    const handleSubmit = () => {
        let p = process_inputs()
        if (p === false) {
            return;
        }

        if (passInput !== passReEnterInput) {
            setErrors({
                ...errors,
                passReEnter: "Re-enter Password Validation Error!"
            })
            return;
        }

        let userExists = RestFulApi(`https://apis.kikiq.ir/api.php?fn=user_exists&arg1=${userInput}`)
        userExists.then(function (exists) {
            if (exists) {
                setErrors({
                    ...errors,
                    username: "This user name already exists!",
                    // server: null
                })
                return;
                // {<Message clas="error" stylee={{ display: "block" }}>This user name already exists!</Message>}
            } else {
                setErrors({
                    ...errors,
                    username: null
                })
            }
        })

        userExists.catch(function (reason) {
            // <Message clas="error" stylee={{ display: "block" }}>Server Error! {reason}</Message>
            if (reason) {
                setErrors({
                    ...errors,
                    server: "Server Error!"
                })
                return;
            } else {
                setErrors({
                    ...errors,
                    server: null
                })
            }
        })

        let userVolunteer = {
            first_name: nameInput,
            last_name: lastNameInput,
            username: userInput,
            password: passInput
        }

        const myJSON = JSON.stringify(userVolunteer);

        let addUser = RestFulApi(`https://apis.kikiq.ir/api.php?fn=add_user&arg1=${myJSON}`)
        addUser.then(function (response) {
            console.log(response)
        })
        addUser.catch(function (reason) {
            setErrors({
                ...errors,
                server: "Server Error!"
            })
            return;
        })

        



        setLoading(true)
        setRefresh(refresh + 1)
        // // login(userInput, passInput)

        setUserInputText("")
        setPassInputText("")
        setSubmitted(true)

        // buttonSubmitRef.current.classList.add('activeButtonLogin')
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
    let errorObjectLenght;
    const checkTypePost = () => {
        if (typeof post == "object" && post != null) {
            postObjectLenght = Object.keys(post).length
            return postObjectLenght;
        }
    }

    const checkTypeErrors = () => {
        if (typeof errors == "object" && errors != null) {
            errorObjectLenght = Object.keys(errors).length
            return errorObjectLenght;
        }
    }

    if (typeof post == "object") {
        postObjectLenght = checkTypePost();
        errorObjectLenght = checkTypeErrors();
        // console.log("object length: ", postObjectLenght)
    }



    useEffect(() => {
        inputfocus.current.focus();
    }, [])



    return (
        <div className="LogIn" ref={inputsform}>

            {errors.server != null && errorObjectLenght > 0 && (<Message error={errors.server} clas="error" stylee={{ display: "block" }}></Message>)}
            {submitted && (<Message clas="info" stylee={{ display: "block" }}>Registration was successful</Message>)}

            {typeof (post) != "object" ? (
                post != null && post.length > 0 && (<Message clas="success" stylee={{ display: "block" }}>Good Luck ^_^</Message>)
            ) : (
                post != null && postObjectLenght > 0 && (<Message clas="success" stylee={{ display: "block" }}>Good Luck ^_^</Message>)
            )}

            {/* {errors.username != null && errorObjectLenght > 0 &&  (<Message error={errors.username} clas="error" stylee={{ display: "block" }}></Message>)} */}

            <form onSubmit={(e) => { e.preventDefault() }} className="form" id="form2">
                <h2>Register</h2>

                <div className="formInput username">
                    {errors.firstName && <span className="Errors">{errors.firstName}</span>}
                    <input ref={inputfocus} type="text" value={nameInputText} onChange={handleNameInput} placeholder="john" />
                    <label>Your name</label>
                </div>

                <div className="formInput username">
                    {errors.lastName && <span className="Errors">{errors.lastName}</span>}
                    <input type="text" value={lastNameInputText} onChange={handleLastNameInput} placeholder="smith" />
                    <label>Your Last name</label>
                </div>

                <div className="formInput username">
                    {errors.username && <span className="Errors">{errors.username}</span>}
                    <input type="text" value={userInputText} onChange={handleUserInput} placeholder="test_123" />
                    <label>Username</label>
                </div>

                <div className="formInput password">
                    {errors.password && <span className="Errors">{errors.password}</span>}
                    <input type="text" value={passInputText} onChange={handlePassInput} placeholder="Test.123" />
                    <label>Password</label>
                </div>

                <div className="formInput password">
                    {errors.passReEnter && <span className="Errors">{errors.passReEnter}</span>}
                    <input type="text" value={passReEnterInputText} onChange={handlePassReEnterInput} placeholder="Test.123" />
                    <label>Re-enter password</label>
                </div>


                <div ref={buttonSubmitRef}>
                    <ButtonComponent handleClick={() => { handleSubmit() }} btntype="submit" btnform="form2"  >
                        LogIn
                    </ButtonComponent>
                </div>
            </form>


            <div>
                {/* {post == null && (
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

                {loading ? (<span style={{ color: "var(--black)" }}>Loading...</span>) : (<span>{refresh}</span>)} */}
                {/* {post} */}
            </div>
        </div>
    );
}

export default LoginFormComponent;
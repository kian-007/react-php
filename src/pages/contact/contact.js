import React, { useState, useRef, useEffect, useContext } from 'react';
import Button from '../../components/buttons/button';
import { AuthContext } from '../../contexts/authContext';
import { ValidateEmail, ValidateSubject } from '../../utils/validation';
import './contact.css';



const Contact = () => {
    const [subject, setSubject] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState({})
    const inputSubjectRef = useRef(null)
    const inputSubmitRef = useRef(null)
    const { checkAuthentication, currentUserId } = useContext(AuthContext)
    useEffect(() => {
        checkAuthentication(true)
    }, [currentUserId])

    const handleChangeInputSubject = (event) => {
        if (ValidateSubject(event.target.value)) {
            setErrors({
                ...errors,
                subject: null,
            })
            setSubject(event.target.value);
        } else {
            setErrors({
                ...errors,
                subject: 'The subject must be more than 8 characters!'
            })
        }
    }



    const handleChangeInputEmail = (event) => {
        if (ValidateEmail(event.target.value)) {
            setErrors({
                ...errors,
                email: null,
            })
            setEmail(event.target.value);
        } else {
            setErrors({
                ...errors,
                email: 'Email is not valid!'
            })
        }
    }

    const handleChangeTextArea = (event) => {
        setDescription(event.target.value);
    }
    const handleSubmit = () => {
        console.log("subject", subject)
        console.log("email", email)
        console.log("description", description)
        inputSubmitRef.current.classList.add('activeButtonContact')
    }

    useEffect(() => {
        inputSubjectRef.current.focus();
    }, [])

    return (
        <div className="contact container">
            <div className="formControl">
                <input ref={inputSubjectRef} onChange={handleChangeInputSubject} type="text" placeholder="Subject" />
                <br />
                {errors.subject && <span>{errors.subject}</span>}
            </div>
            <div className="formControl">
                <input onChange={handleChangeInputEmail} type="email" placeholder="Email" />
                <br />
                {errors.email && <span>{errors.email}</span>}
            </div>
            <div className="formControl">
                <textarea onChange={handleChangeTextArea} placeholder="Your Request here">
                </textarea>
            </div>
            <div className="formControl" ref={inputSubmitRef}>
                <Button handleClick={handleSubmit}>Submit</Button>
            </div>

        </div>
    )
}

export default Contact;
import React, { useState, useEffect } from 'react';
import './message.css';

const Message = ({ error, children, stylee, clas }) => {
    const [message, setMessage] = useState({})


    useEffect(() => {
        if (!error) {
            setMessage({
                ...message,
                msg: children
            })
        } else {
            setMessage({
                ...message,
                msg: error
            })
        }

    }, [error])



    return (
        <div className={`Message ${clas}`} style={stylee} >
            <div>
                <span>{message.msg}</span>
            </div>
        </div>
    );
}

export default Message;
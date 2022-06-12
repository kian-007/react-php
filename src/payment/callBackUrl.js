import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { RestFulApi } from '../apis/api';
import './callBackUrl.css';
import Message from '../utils/message/message';
import $ from 'jquery'

const CallBackUrl = () => {
    // const par = useParams()
    const loc = useLocation()
    const [successCode, setSuccessCode] = useState("")
    const [message, setMessage] = useState("")
    const [trackId, setTrackId] = useState("")
    const [value, setValue] = useState({})
    const callbackRef = useRef(null)


    const ZIBAL_MERCHANT_KEY = "zibal"
    const parameters = {
        merchant: ZIBAL_MERCHANT_KEY,
        trackId: trackId,
    }
    const data = JSON.stringify(parameters);

    useEffect(() => {
        // var xmlHttp = new XMLHttpRequest();
        // xmlHttp.open("GET", 'https://localhost:3000/callbackurl', true); // false for synchronous request
        // xmlHttp.send(null);
        // console.log(xmlHttp.responseText);

        // console.log("location", loc)
        let myarr = loc.search.split("&")
        // console.log("myarr", myarr)
        setSuccessCode(myarr[0].substring(9))
        // console.log("successCode", successCode)
        setTrackId(myarr[2].substring(8) * 1)
        // console.log("trackId", trackId)
        // console.log("data", data)


        if (successCode == "1") {
            let res = RestFulApi(`https://apis.kikiq.ir/api.php?fn=postToZibal&arg1=verify&arg2=${data}`)
            res.then(function (value) {
                console.log("value: ", value)
                console.log("message: ", value['message'])
                setMessage(value['message'])
                setValue(value)
            });
        }

    }, [successCode, trackId])

    useEffect(() => {
        console.log("successCode", successCode)
    }, [successCode])



    useEffect(() => {
        window.scrollBy(0, 500);
    })




    return (
        <div ref={callbackRef} className="callbackurl">
            {/* {successCode} */}
            {successCode === '1' ? (
                <div>
                    <Message error={message} clas={message == "success" ? "success" : "info"}></Message>
                    {value.status === 1 && value.result === 100 && (
                        <div>
                            <table>
                                <tr>
                                    <td>cardNumber:</td>
                                    <td>{value.cardNumber}</td>
                                </tr>
                                <tr>
                                    <td>amount:</td>
                                    <td>{value.amount}</td>
                                </tr>
                                <tr>
                                    <td>paidAt:</td>
                                    <td>{value.paidAt}</td>
                                </tr>
                                <tr>
                                    <td>refNumber:</td>
                                    <td>{value.refNumber}</td>
                                </tr>
                                <tr>
                                    <td>description:</td>
                                    <td>{value.description}</td>
                                </tr>
                                <tr>
                                    <td>orderId:</td>
                                    <td>{value.orderId}</td>
                                </tr>
                            </table>
                        </div>
                    )}
                </div>
            ) : (
                <Message clas="error">Faild</Message>
            )}
        </div>
    );
}

export default CallBackUrl;
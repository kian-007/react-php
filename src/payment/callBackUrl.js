import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { RestFulApi } from '../apis/api';
import './callBackUrl.css';
import Message from '../utils/message/message';
import $ from 'jquery'
import { MySpinner } from '../components';

const CallBackUrl = () => {
    // const par = useParams()
    const loc = useLocation()
    const [successCode, setSuccessCode] = useState("")
    const [message, setMessage] = useState("")
    const [trackId, setTrackId] = useState("")
    const [value, setValue] = useState({})
    const [result, setResult] = useState({})
    const [loading, setLoading] = useState(false)
    const callbackRef = useRef(null)



    const mystyle = {
        // borderTop: 'red solid 7px',
        // borderBottom: 'pink solid 7px',
        border: '#aaa solid 7px',
        borderLeft: 'brown solid 7px',
        borderRight: 'pink solid 7px',
        width: '70px',
        height: '70px',
        margin: 'auto',
    }

    const loaderholderStyle = {
        // backgroundColor: '#bbb',
        padding: '0',
        margin: '0px auto',
        width: '200px',
        height: '200px',
        flexDirection: 'column',
    }



    const ZIBAL_MERCHANT_KEY = "zibal"
    const parameters = {
        merchant: ZIBAL_MERCHANT_KEY,
        trackId: trackId,
    }
    const data = JSON.stringify(parameters);

    useEffect(() => {
        // console.log("location", loc)
        let myarr = loc.search.split("&")
        // console.log("myarr", myarr)
        setSuccessCode(myarr[0].substring(9))
        // console.log("successCode", successCode)
        setTrackId(myarr[2].substring(8) * 1)
        // console.log("trackId", trackId)
        // console.log("data", data)


        if (successCode == "1") {
            setLoading(true)
            let res = RestFulApi(`https://apis.kikiq.ir/api.php?fn=postToZibal&arg1=verify&arg2=${data}`)
            res.then(function (value) {
                console.log("value: ", value)
                console.log("message: ", value['message'])
                setMessage(value['message'])
                setResult(value['result'])
                setValue(value)
                setLoading(false)
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
                    {loading ? (<MySpinner loaderholderStyle={loaderholderStyle} loaderStyle={mystyle} />):(<></>) }
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
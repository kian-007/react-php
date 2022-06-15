import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
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
    const [orderId, setOrderId] = useState("")
    const [status, setStatus] = useState("")
    const [statusMessage, setStatusMessage] = useState("")
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
        console.log("myarr", myarr)
        setSuccessCode(myarr[0].substring(9))
        // console.log("successCode", successCode)
        setStatus(myarr[1].substring(7))
        setTrackId(myarr[2].substring(8) * 1)
        setOrderId(myarr[3].substring(8))
        // console.log("trackId", trackId)
        // console.log("data", data)


        switch (status) {
            case '-1':
                setStatusMessage("در انتظار پردخت")
                break;
            case '-2':
                setStatusMessage("	خطای داخلی")
                break;
            case '1':
                setStatusMessage("پرداخت شده - تاییدشده")
                break;
            case '2':
                setStatusMessage("پرداخت شده - تاییدنشده")
                break;
            case '3':
                setStatusMessage("لغوشده توسط کاربر")
                break;
            case '4':
                setStatusMessage("‌شماره کارت نامعتبر می‌باشد.")
                break;
            case '5':
                setStatusMessage("‌موجودی حساب کافی نمی‌باشد")
                break;
            case '6':
                setStatusMessage("	رمز واردشده اشتباه می‌باشد.")
                break;
            case '7':
                setStatusMessage("‌تعداد درخواست‌ها بیش از حد مجاز می‌باشد")
                break;
            case '8':
                setStatusMessage("	‌تعداد پرداخت اینترنتی روزانه بیش از حد مجاز می‌باشد.")
                break;
            case '9':
                setStatusMessage("مبلغ پرداخت اینترنتی روزانه بیش از حد مجاز می‌باشد.")
                break;
            case '10':
                setStatusMessage("صادرکننده‌ی کارت نامعتبر می‌باشد.")
                break;
            case '11':
                setStatusMessage("‌خطای سوییچ")
                break;
            case '12':
                setStatusMessage("	کارت قابل دسترسی نمی‌باشد.")
                break;
            default:
            // code block
        }


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
        console.log("trackId", trackId)
    }, [successCode])



    useEffect(() => {
        window.scrollBy(0, 500);
    })




    return (
        <div ref={callbackRef} className="callbackurl">
            {successCode === '1' ? (
                <div>
                    <Message error={message} clas={message == "success" ? "success" : "info"}></Message>
                    {loading ? (<MySpinner loaderholderStyle={loaderholderStyle} loaderStyle={mystyle} />) : (<></>)}
                    {value.status === 1 && value.result === 100 && (
                        <div>
                            <table>
                                <tr>
                                    <td>cardNumber:</td>
                                    <td>{value.cardNumber}</td>
                                </tr>
                                <tr>
                                    <td>status:</td>
                                    <td>{value.status == 1? "پرداخت شده - تاییدشده": statusMessage}</td>
                                </tr>
                                <tr>
                                    <td>amount:</td>
                                    <td>{value.amount} &#65020;</td>
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
                                    <td>trackId:</td>
                                    <td>{trackId}</td>
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
                <div>
                    <Message clas="error">The transaction failed</Message>
                    {loading ? (<MySpinner loaderholderStyle={loaderholderStyle} loaderStyle={mystyle} />) : (<></>)}
                    <div>
                        <table>
                            <tr>
                                <td>status:</td>
                                <td>{statusMessage}</td>
                            </tr>
                            <tr>
                                <td>cardNumber:</td>
                                <td>{value.cardNumber}</td>
                            </tr>
                            <tr>
                                <td>amount:</td>
                                <td>{value.amount}</td>
                            </tr>
                            <tr>
                                <td>refNumber:</td>
                                <td>{value.refNumber}</td>
                            </tr>
                            <tr>
                                <td>trackId:</td>
                                <td>{trackId}</td>
                            </tr>
                            <tr>
                                <td>description:</td>
                                <td>{value.description}</td>
                            </tr>
                            <tr>
                                <td>orderId:</td>
                                <td>
                                    <Link to={orderId}>
                                        {orderId}
                                    </Link>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CallBackUrl;
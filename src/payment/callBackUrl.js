import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { RestFulApi } from '../apis/api';
import './callBackUrl.css';

const CallBackUrl = () => {
    // const par = useParams()
    const loc = useLocation()
    const [successCode, setSuccessCode] = useState("")
    const [trackId, setTrackId] = useState("")


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
        console.log("successCode", successCode)
        setTrackId(myarr[2].substring(8)*1)
        console.log("trackId", trackId)
        console.log("data", data)


        if (successCode == "1") {
            let res = RestFulApi(`https://apis.kikiq.ir/api.php?fn=postToZibal&arg1=verify&arg2=${data}`)
            res.then(function (value) {
                console.log("value", value)
            });
        }

    }, [successCode, trackId])



    return (
        <div className="callbackurl">
            callBackUrl <br />
            {/* {successCode} <br/> */}
            {/* {successCode == '1'? "successful": "failed"} */}
        </div>
    );
}

export default CallBackUrl;
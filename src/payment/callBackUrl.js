import React,{useEffect, useState} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import './callBackUrl.css';

const CallBackUrl = () => {
    const par = useParams()
    const loc = useLocation()
    const [result, setResult] = useState("")

    useEffect(() => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", 'https://localhost:3000/callbackurl', true); // false for synchronous request
        xmlHttp.send(null);
        console.log(xmlHttp.responseText);

        console.log("location", loc)
        let myarr = loc.search.split("&")
        console.log("myarr", myarr)
        setResult(myarr[0].substring(9))
        console.log("result", result)

    }, [])



    return (
        <div className="callbackurl">
            callBackUrl <br/>
            {result} <br/>
            {result == '1'? "successful": "failed"}
        </div>
    );
}

export default CallBackUrl;
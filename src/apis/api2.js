import React, { useEffect, useState } from 'react';
import './api.css';
import { Request, RestFulApi } from './api';

const Api = () => {
    const [post, setPost] = useState([])


    var a;
    useEffect(() => {
        let res = RestFulApi('http://localhost/apis/api.php?fn=hey&arg1=kian_se')
        res.then(function (value) {
            console.log("value: ", value)
            a = value
            setPost(a)
        });

    }, [])

    console.log("type of", typeof (post))

    return (
        <div className="api" >
            {typeof (post) == "string" || typeof (post) == "number" ? (
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
            {typeof (post) == "boolean" && (
                <div>
                    <span>{post == true && "This is a true response"}</span>
                    <span>{post == false && "This is a false response"}</span>
                </div>
            )}

            {/* {post} */}
        </div>
    );
}

export default Api;
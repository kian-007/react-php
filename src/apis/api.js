import React, { useEffect, useState } from 'react';
import './api.css';

const Api = () => {
    const [post, setPost] = useState([])

    const loadPosts = async () => {
        const responsePosts = await fetch('https://apis.kikiq.ir/api.php?fn=test')
        const posts = await responsePosts.json()
        // setRes(posts)
        return posts;
    }

    var a;
    var k;
    useEffect(() => {
        let finalResponse = loadPosts();
        finalResponse.then(function (value) {
            console.log("sucsessfull respnse: ", JSON.stringify(value));
            // console.log("type of value1: ", typeof (JSON.stringify(value)));
            console.log("type of value2: ", typeof (value));
            a = value

            setPost(a)

        });
        finalResponse.catch(function (reason) {
            console.log("rejected response ", reason);
        });

    }, [])

    console.log("posts", post)
    console.log("type of", typeof (post))

    return (
        <div className="api" >

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
    );
}

export default Api;
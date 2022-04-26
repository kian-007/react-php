import React, { useState, useEffect, useCallback } from 'react';
import './blog.css';
import Button from '../../components/buttons/button';



const Blog = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [pagesCount, setPagesCount] = useState(0)
    const [activePageNumber, setActivePageNumber] = useState(1)

    const loadPosts = async () => {
        setLoading(true);
        const responsePosts = await fetch('https://run.mocky.io/v3/11977b44-47ac-4d7b-ace2-da9cface9535')
        const posts = await responsePosts.json()
        setPosts(posts);
        setLoading(false);
    }

    useEffect(() => {
        loadPosts();
    }, [])
    useEffect(() => {
        setPagesCount(calculatePagesCount());
    }, [posts])

    const calculatePagesCount = () => {
        if (posts.length % 3 > 0) {
            return parseInt(posts.length / 3 + 1);
        } else {
            return parseInt(posts.length / 3);
        }
    }

    const handleClickOnPages = useCallback((activePageNumber) => {
        setActivePageNumber(activePageNumber);
    }, [])
    

    return (
        <div className="blog container">
            {/* <Button handleClick={handleLoadPosts}>
                {loading? 'Loading': 'Load Posts into State'}
            </Button> */}

            {loading && <div>Loading ...</div>}
            {posts.length === 0 && <div>No Posts!</div>}
            {posts.length > 0 && (
                <ul>
                    {posts.slice((activePageNumber * 3) - 3, activePageNumber * 3).map((post) => (
                        <li className="blogItem"  key={`post-${post.id}`}>
                            <h3 className="fs-5">{post.title}</h3>
                            <p className="blogContent">
                                {post.content}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
            <div>
                <ul className="pagination">
                    {new Array(pagesCount).fill(0).map((item, index) => (
                        <li className={activePageNumber === index + 1 ? 'active' : ''}>
                            <Button  handleClick={() => { handleClickOnPages(index + 1) }}>
                                {index + 1}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Blog;
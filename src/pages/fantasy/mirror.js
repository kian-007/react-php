import React, { useCallback, useEffect, useState } from 'react';
import ITEMS from '../ITEMS.json';
import './mirror.css';
import { MirrorItems } from '../../components';
import Button from '../../components/buttons/button';

const Mirror = () => {
    const items = ITEMS
    const [posts, setPosts] = useState([])
    const [pagesCount, setPagesCount] = useState(0)
    const [activePageNumber, setActivePageNumber] = useState(1)



    useEffect(() => {
        let test;
        items.map((category) => {
            test = category.fantasy.mirror.items
            setPosts(test)
        })
    }, [posts])



    const calculatePagesCount = () => {
        if (posts.length % 7 > 0) {
            return parseInt(posts.length / 7 + 1);
        } else {
            return parseInt(posts.length / 7);
        }
    }



    useEffect(() => {
        setPagesCount(calculatePagesCount());
    }, [posts])




    const handleClickOnPages = useCallback((activePageNumber) => {
        setActivePageNumber(activePageNumber);
    }, [])

    

    return (
        <div className="container">
            <div className="MainMirror">
                <ul className="mirrors">
                    {
                        posts.slice((activePageNumber * 7) - 7, activePageNumber * 7).map((post) => (
                            <MirrorItems key={`post-${post.id}`} item={post} />
                        ))
                    }
                </ul>
                <div>
                    <ul className="pagination">
                        {new Array(pagesCount).fill(0).map((item, index) => (
                            <li className={activePageNumber === index + 1 ? 'active' : ''}>
                                <Button handleClick={() => { handleClickOnPages(index + 1) }}>
                                    {index + 1}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>

    );
}

export default Mirror;
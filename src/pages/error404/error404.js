import React from 'react';
import { useParams } from 'react-router-dom';
import ITEMS from '../ITEMS.json'

const Error404 = () => {
    const { section } = useParams()

    

    return (
        <div>
            {section? "": (
                <div>
                    404 ERROR (PAGE NOT FOUND!)
                </div>
            )}
        </div>
    );
}

export default Error404;
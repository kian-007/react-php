import React from 'react';
import ITEMS from '../../ITEMS.json';
import './handCream.css';
import {HandCreamItems} from '../../../components';

const HandCream = () => {
    const items = ITEMS

    return (
        <div className="container">
            <ul className="handCreams">
                {items.map(category => (
                    category.skin.handcream.items.map(item => (
                        <HandCreamItems item={item} />
                    ))
                ))}
            </ul>
        </div>
    );
}

export default HandCream;
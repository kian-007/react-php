import React from 'react';
import ITEMS from '../../ITEMS.json';
import './bag.css';
import {  BagItems } from '../../../components';

const Bag = () => {
    const items = ITEMS
    

    return (
        <div className="container">
            <ul className="bags">
                {items.map(category => (
                    category.beauty.bag.items.map(item => (
                        <BagItems item={item} />
                    ))
                ))}
            </ul>
        </div>
    );
}

export default Bag;
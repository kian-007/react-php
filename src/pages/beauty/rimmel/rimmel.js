import React from 'react';
import ITEMS from '../../ITEMS.json';
import './rimmel.css';
import {  RimmelItems } from '../../../components';

const Rimmel = () => {
    const items = ITEMS
    

    return (
        <div className="container">
            <ul className="rimmels">
                {items.map(category => (
                    category.beauty.rimmel.items.map(item => (
                        <RimmelItems item={item} />
                    ))
                ))}
            </ul>
        </div>
    );
}

export default Rimmel;
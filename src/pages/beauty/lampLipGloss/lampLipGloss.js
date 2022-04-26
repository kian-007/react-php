import React from 'react';
import ITEMS from '../../ITEMS.json';
import './lampLipGloss.css';
import {  LampLipGlossItems } from '../../../components';

const LampLipGloss = () => {
    const items = ITEMS
    

    return (
        <div className="container">
            <ul className="lampLipGlosses">
                {items.map(category => (
                    category.beauty.lamplipgloss.items.map(item => (
                        <LampLipGlossItems item={item} />
                    ))
                ))}
            </ul>
        </div>
    );
}

export default LampLipGloss;
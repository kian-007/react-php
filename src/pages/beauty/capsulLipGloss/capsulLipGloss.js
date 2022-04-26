import React from 'react';
import ITEMS from '../../ITEMS.json';
import './capsulLipGloss.css';
import {CapsulLipGlossItems} from '../../../components';

const CapsulLipGloss = () => {
    const items = ITEMS

    return (
        <div className="container">
            <ul className="capsulLipGlosses">
                {items.map(category => (
                    category.beauty.capsullipgloss.items.map(item => (
                        <CapsulLipGlossItems item={item} />
                    ))
                ))}
            </ul>
        </div>
    );
}

export default CapsulLipGloss;
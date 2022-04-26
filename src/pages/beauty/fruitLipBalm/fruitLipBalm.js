import React from 'react';
import ITEMS from '../../ITEMS.json';
import './fruitLipBalm.css';
import {FruitLipBalmItems} from '../../../components';

const FruitLipBalm = () => {
    const items = ITEMS

    return (
        <div className="container">
            <ul className="fruitLipBalms">
                {items.map(category => (
                    category.beauty.fruitlipbalm.items.map(item => (
                        <FruitLipBalmItems item={item} />
                    ))
                ))}
            </ul>
        </div>
    );
}

export default FruitLipBalm;
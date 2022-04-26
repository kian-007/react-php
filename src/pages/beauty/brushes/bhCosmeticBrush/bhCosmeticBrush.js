import React from 'react';
import ITEMS from '../../../ITEMS.json';
import './bhCosmeticBrush.css';
import {BhCosmeticBrushItems} from '../../../../components';

const BhCosmeticBrush = () => {
    const items = ITEMS

    return (
        <div className="container">
            <ul className="bhCosmeticBrushes">
                {items.map(category => (
                    category.beauty.bhcosmeticbrush.items.map(item => (
                        <BhCosmeticBrushItems item={item} />
                    ))
                ))}
            </ul>
        </div>
    );
}

export default BhCosmeticBrush;
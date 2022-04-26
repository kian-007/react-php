import React from 'react';
import ITEMS from '../../../ITEMS.json';
import './maskBrush.css';
import {MaskBrushItems} from '../../../../components';

const MaskBrush = () => {
    const items = ITEMS

    return (
        <div className="container">
            <ul className="MaskBrushes">
                {items.map(category => (
                    category.beauty.maskbrush.items.map(item => (
                        <MaskBrushItems item={item} />
                    ))
                ))}
            </ul>
        </div>
    );
}

export default MaskBrush;
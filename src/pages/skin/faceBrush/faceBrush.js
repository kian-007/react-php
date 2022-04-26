import React from 'react';
import ITEMS from '../../ITEMS.json';
import './faceBrush.css';
import {FaceBrushItems} from '../../../components';

const FaceBrush = () => {
    const items = ITEMS

    return (
        <div className="container">
            <ul className="facebrushes">
                {items.map(category => (
                    category.skin.facebrush.items.map(item => (
                        <FaceBrushItems item={item} />
                    ))
                ))}
            </ul>
        </div>
    );
}

export default FaceBrush;
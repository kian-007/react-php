import React from 'react';
import ITEMS from '../../../ITEMS.json';
import './fantasyBrush.css';
import {FantasyBrushItems} from '../../../../components';

const FantasyBrush = () => {
    const items = ITEMS

    return (
        <div className="container">
            <ul className="fantasyBrushes">
                {items.map(category => (
                    category.beauty.fantasybrush.items.map(item => (
                        <FantasyBrushItems item={item} />
                    ))
                ))}
            </ul>
        </div>
    );
}

export default FantasyBrush;
import React, { useEffect, useState } from 'react';
import PRODUCTS from '../../App/PRODUCTS.json'
import { ProductItems, MySpinner, ReactSlick } from '../';
import './products.css';


const Products = () => {
    const [data, setData] = useState([]);

    const mystyle = {
        border: '#aaa solid 7px',
        borderTop: 'purple solid 7px',
        borderBottom: 'purple solid 7px',
        width: '70px',
        height: '70px',
        marginTop: '50%',
        marginLeft: 'auto'
    }

    const loaderholderStyle = {
        backgroundColor: '#bbb',
        padding: '0',
        margin: '10px',
        width: '200px',
        height: '350px',
        flexDirection: 'column',
    }



    useEffect(() => {
        setInterval(() => {
            setData(uselesslist);
        }, 500);
    }, [])

    const uselesslist = []
    for (const [key, value] of Object.entries(PRODUCTS)) {
        for (const [category, value2] of Object.entries(value)) {
            for (const [sectiondata, value3] of Object.entries(value2)) {
                for (const [sectionitem, value4] of Object.entries(value3['items'])) {
                    value4['name'] = value3['name']
                    value4['price'] = value3['price']
                    value4['category'] = category
                    uselesslist.push(value4)
                }
            }
        }
    }

    return (
        <div>
            <ReactSlick item={data} />

            <ul className="products">
                {data.length === 0 && (
                    <div className="placeholder">
                        {[1, 2, 3, 4, 5, 6, 7].map(() => (
                            <div>
                                <MySpinner loaderholderStyle={loaderholderStyle} loaderStyle={mystyle} />
                            </div>
                        ))}
                    </div>
                )}
                {data.map((item) => (
                    <ProductItems item={item} />
                ))}
            </ul>
        </div>
    )
}

export default Products
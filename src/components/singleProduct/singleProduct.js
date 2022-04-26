import React, { useRef, useEffect } from 'react';
import './singleProduct.css';
import { useParams } from 'react-router-dom';
// import PRODUCTS from '../../App/PRODUCTS.json';
import PRODUCTS from '../../pages/ITEMS.json';
import Image from '../images/image';
import { PROJECT_URL } from '../../config/general';




const SingleProduct = () => {
    const { id } = useParams();
    // const product = PRODUCTS.find((item) => item.id === id);

    const product = []
    for (const [key, value] of Object.entries(PRODUCTS)) {
        for (const [category, value2] of Object.entries(value)) {
            for (const [sectiondata, value3] of Object.entries(value2)) {
                for (const [sectionitem, value4] of Object.entries(value3['items'])) {
                    if (value4['id'] === id) {
                        value4['name'] = value3['name']
                        value4['price'] = value3['price']
                        value4['category'] = category
                        product.push(value4)
                    }
                }
            }
        }
    }


    const singleProductRef = useRef(null);

    useEffect(() => {
        singleProductRef.current.classList.add('onLoad');
    }, [])


    return (
        <div className="singleProduct" ref={singleProductRef}>
            <Image myid="singleImg" imageSrc={`${PROJECT_URL}/images/${product[0].category}/${product[0].image}`} />
            <div className="info">
                <div>
                    <h3>Name: </h3>
                    <span> {product[0].name}</span>
                </div>
                <div>
                    <h3>Price: </h3>
                    <span> {product[0].price}</span>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct;
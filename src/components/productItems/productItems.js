import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PROJECT_URL } from '../../config/general';
import { CartContext } from '../../contexts/cartContext';
import { ThemeContext } from '../../contexts/themeContext';
import { ButtonComponent, Image } from '../';
import './productsItems.scss';

const ProductItems = ({ item }) => {

    const productItemsRef = useRef(null);
    const addCart_imgSrc = "../../add_circle3.png";
    const removeCart_imgSrc = "../../cart_remove.png";
    const themeValues = useContext(ThemeContext)
    const { carts, dispatchCart} = useContext(CartContext)
    let { added} = useContext(CartContext)
    const [refresh, setRefresh] = useState(0)
    // const [data, setData] = useState([])
    // const [neww, setNeww] = useState([])

    added = carts.includes(item.id)

    const handleAdd = () => {
        if (added) {
            dispatchCart({
                type: 'REMOVE_FROM_CART',
                id: item.id,
            })
        } else {
            dispatchCart({
                type: "ADD_TO_CART",
                id: item.id,
            })
        }
    }

    useEffect(() => {
        productItemsRef.current.classList.add('visible')
    }, [])


    // const neww = []
    // useEffect(() => {
    //     if (carts.length > 0) {
    //         neww.push.apply(neww, carts)
    //         localStorage.setItem('carts', JSON.stringify(neww))
    //         setRefresh(refresh + 1)
    //     } else {
    //         let storedData = localStorage.getItem('carts')
    //         storedData = JSON.parse(storedData)
    //         carts.push.apply(carts, storedData)
    //         setRefresh(refresh + 1)
    //     }
    // }, [carts, added, refresh])


    return (
        <li key={item.id} className="productItems" ref={productItemsRef}>
            <h4>{item.name}</h4>
            <Link to={`/product/${item.id}`}>
                <Image imageSrc={`${PROJECT_URL}/images/${item.category}/${item.image}`} />
            </Link>
            <span>{item.price}</span>
            <ButtonComponent handleClick={handleAdd} style={{ color: themeValues.theme.color }}
                cl={added ? "added" : ""}>
                {added ? (
                    <>
                        <Image myid="myImg" imageSrc={removeCart_imgSrc} />
                        Remove from Cart
                    </>
                ) : (
                    <>
                        <Image myid="myImg" imageSrc={addCart_imgSrc} />
                        Add to Cart
                    </>
                )}
            </ButtonComponent>
        </li>
    )
}

export default ProductItems
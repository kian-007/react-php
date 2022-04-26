import React, { useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ButtonComponent, Image } from '../../../components';
import { PROJECT_URL } from '../../../config/general';
import { CartContext } from '../../../contexts/cartContext';
import { ThemeContext } from '../../../contexts/themeContext';


const FruitLipBalmItems = ({ item }) => {
    const fruitLipBalmItemsRef = useRef(null)

    const addCart_imgSrc = "../../add_circle3.png";
    const removeCart_imgSrc = "../../cart_remove.png";
    const themeValues = useContext(ThemeContext)
    const { carts, dispatchCart } = useContext(CartContext)
    let { added} = useContext(CartContext)

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
        fruitLipBalmItemsRef.current.classList.add('visible')
    }, [])

    return (
        <li key={item.id} className="fruitLipBalmItems" ref={fruitLipBalmItemsRef}>
            <Link to={`/product/${item.id}`}>
                <Image myid="fruitLipBalmImage" imageSrc={`${PROJECT_URL}/images/beauty/${item.image}`} />
            </Link>
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
    );
}

export default FruitLipBalmItems;
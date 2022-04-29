import React, { useParams, useContext, useEffect, useState } from 'react';
import { CartContext } from '../../contexts/cartContext';
import PRODUCTS from '../../pages/ITEMS.json'
import './cartSelection.css';
import { Link } from 'react-router-dom';
import { PROJECT_URL } from '../../config/general';
import { Image } from '../';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import AuthContextProvider, { AuthContext } from '../../contexts/authContext';

const CartSelection = () => {
    // const selections = useParams()
    const { carts, dispatchCart } = useContext(CartContext)
    const [newSelection, setNewSelection] = useState([])
    const { checkAuthentication } = useContext(AuthContext)



    useEffect(() => {
        checkAuthentication(true)
    }, [])






    let selection = []
    carts.map((cartitem) => {
        for (const [key, value] of Object.entries(PRODUCTS)) {
            for (const [category, value2] of Object.entries(value)) {
                for (const [sectiondata, value3] of Object.entries(value2)) {
                    for (const [sectionitem, value4] of Object.entries(value3['items'])) {
                        if (value4['id'].includes(cartitem)) {
                            value4['name'] = value3['name']
                            value4['price'] = value3['price']
                            value4['category'] = category
                            selection.push(value4)
                        }
                    }
                }
            }
        }
    })

    useEffect(() => {
        setNewSelection(selection)
    }, [selection])

    const handleRemoveShoppingCart = (itemid) => {
        dispatchCart({
            type: 'REMOVE_FROM_CART',
            id: itemid,
        })
    }

    return (
        <ul className="cartselection">
            {newSelection.map((item) => (
                <li key={item.id}>
                    <div>
                        <h4>{item.name}</h4>
                        <button className="RemoveShoppingCartButton" onClick={() => { handleRemoveShoppingCart(item.id) }} >
                            <MdOutlineRemoveShoppingCart className="RemoveShoppingCart" size="25px" />
                        </button>
                    </div>
                    <Link to={`/product/${item.id}`}>
                        <Image myid="mirrorImage" imageSrc={`${PROJECT_URL}/images/${item.category}/${item.image}`} />
                    </Link>
                    <span>{item['price']}</span>
                </li>
            ))}
        </ul>
    )
}

export default CartSelection;



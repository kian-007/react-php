import React, { useParams, useContext, useEffect, useState } from 'react';
import { CartContext } from '../../contexts/cartContext';
import PRODUCTS from '../../pages/ITEMS.json'
import './cartSelection.css';
import { Link } from 'react-router-dom';
import { PROJECT_URL } from '../../config/general';
import { Image } from '../';
import { ButtonComponent } from '../../components'
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import AuthContextProvider, { AuthContext } from '../../contexts/authContext';
import $ from 'jquery';

const CartSelection = () => {
    // const selections = useParams()
    const { carts, dispatchCart } = useContext(CartContext)
    const [newSelection, setNewSelection] = useState([])
    const [cartLength, setCartLength] = useState()
    const [refresh, setRefresh] = useState(0)

    // const { checkAuthentication } = useContext(AuthContext)
    // useEffect(() => {
    //     checkAuthentication(true)
    // }, [])

    const handleItems = () => {
        $('.Button').on('click', function (){
            $('.showAll').hide()
            $('.cartselection--items li').slideDown(400)
        })

        setRefresh(refresh + 1)
    }

    useEffect(() => {
        handleItems()
    }, [refresh])






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


    let data = 0;
    data = carts.length
    useEffect(() => {
        setCartLength(data)
    }, [data, carts])


    let AllPrices = 0;
    useEffect(() => {
        console.log("all", AllPrices)
    }, [AllPrices])

    let count = 0;
    return (
        <div className="cartselection">
            {newSelection.map((item) => (
                <div className="showAll">
                    {count= count + 1}
                    <ButtonComponent cl="showItems" >
                        SHOW Items
                    </ButtonComponent>
                </div>
            ))}
            <ul className="cartselection--items">
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

            <div className="tableHolder">

                {newSelection.map((item) => {
                    AllPrices += item.price
                })}

                <table>
                    <tr>
                        <th>Count</th>
                        <th>Price</th>
                    </tr>
                    <tr>
                        <td>{cartLength}</td>
                        <td>{AllPrices}</td>
                    </tr>
                    <hr></hr>
                    {newSelection.map((item) => (
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                    <tr style={{ width: '100%' }}>
                        <td style={{ float: 'right' }}>
                            <button>Complete</button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default CartSelection;



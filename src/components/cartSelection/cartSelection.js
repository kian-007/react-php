import React, { useParams, useContext, useEffect, useState, useRef } from 'react';
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
import { RestFulApi } from '../../apis/api';

const CartSelection = () => {
    // const selections = useParams()
    const { carts, dispatchCart } = useContext(CartContext)
    const { is_user_logged_in } = useContext(AuthContext)
    const [newSelection, setNewSelection] = useState([])
    const [cartLength, setCartLength] = useState()
    const [refresh, setRefresh] = useState(0)


    // const { checkAuthentication } = useContext(AuthContext)
    // useEffect(() => {
    //     checkAuthentication(true)
    // }, [])


    const handleItems = () => {
        $('.Button').on('click', function () {
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


    const ZIBAL_MERCHANT_KEY = "zibal"
    const ZIBAL_CALLBACK_URL = "http://localhost:1319/callbackurl"
    const d = new Date();
    let ItemsTitle = []
    newSelection.map((item) => {
        ItemsTitle.push(item.name)
    })
    
    ItemsTitle = ItemsTitle.join(", ")

    const process_inputs = () => {

        let parameters = {
            merchant: ZIBAL_MERCHANT_KEY,
            callbackUrl: ZIBAL_CALLBACK_URL,
            amount: AllPrices,//required
            orderId: d.toLocaleString("fa-IR", {timeZone: "Iran", dateStyle: "full", timeStyle: "medium"}),//optional
            // "mobile": $phone_number,//optional for mpg
            description: ItemsTitle,
        }
        const data = JSON.stringify(parameters);
        // let obj = {name: 'kian', age: 23}
        // const arg1 = JSON.stringify("request")

        if (is_user_logged_in()) {
            console.log("data", data)
            let res = RestFulApi(`https://apis.kikiq.ir/api.php?fn=postToZibal&arg1=request&arg2=${data}`)

            res.then(function (value) {
                console.log("value", value)
                console.log("trackId", value['trackId'])
                const trackId = value['trackId'];
                window.location.href = `https://gateway.zibal.ir/start/${trackId}`;

            });


        } else {
            window.location.replace('https://kikiq.ir/login')
        }
    }



    // useEffect(() => {
    //     window.scrollBy(0, 1000)
    // })




    let count = 0;
    return (
        <div className="cartselection">
            {newSelection.map((item) => (
                <div className="showAll">
                    {count = count + 1}
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
                        <td>{AllPrices *= 10000} IRR</td>
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
                            <button className="btnComplete" onClick={() => { process_inputs() }}>Complete</button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default CartSelection;



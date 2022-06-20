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
import Message from '../../utils/message/message';

const CartSelection = () => {
    // const selections = useParams()
    const { carts, dispatchCart } = useContext(CartContext)
    const { currentUserId, currentUserData, setCurrentUserData, is_user_logged_in } = useContext(AuthContext)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [newSelection, setNewSelection] = useState([])
    const [cartLength, setCartLength] = useState()
    const [refresh, setRefresh] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [address, setAddress] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        setIsUserLoggedIn(is_user_logged_in())
    }, [currentUserId])

    // const { checkAuthentication } = useContext(AuthContext)
    // useEffect(() => {
    //     checkAuthentication(true)
    // }, [])


    // const handleItems = () => {
    // $('.Button').on('click', function () {
    //     $('.showAll').hide()
    //     $('.cartselection--items li').slideDown(400)
    // })

    // $('.btnComplete').on('click', function () {
    //     $('.getAddress').show(500).css('display', 'flex')
    // })

    // $('#closeBtn').on('click', function () {
    //     $('.getAddress').hide(300)
    // })

    // setRefresh(refresh + 1)
    // }

    // useEffect(() => {
    //     handleItems()
    // }, [refresh])

    useEffect(() => {
        $('.Button').on('click', function () {
            $('.showAll').hide()
            $('.cartselection--items li').slideDown(400)
        })

        $('.btnComplete').on('click', function () {
            $('.getAddress').show(500).css('display', 'flex')
        })

        $('#closeBtn').on('click', function () {
            $('.getAddress').hide(300)
        })
    })




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
    const ZIBAL_CALLBACK_URL = "http://localhost:4199/callbackurl"
    let ADDRESS = address
    let CITY = city
    let POSTAL_CODE = postalCode
    // let multiplexingInfos = {bankAccount: "IR000000000000000000000000",amount: 50000}
    // multiplexingInfos = JSON.stringify(multiplexingInfos)
    const d = new Date();
    let ItemsTitle = []
    newSelection.map((item) => {
        ItemsTitle.push(item.name)
    })

    ItemsTitle = ItemsTitle.join(", ")


    const handleCity = (e) => {
        setCity(e.target.value)
    }
    const handlePostalCode = (e) => {
        setPostalCode(e.target.value)
    }
    const handleAddress = (e) => {
        setAddress(e.target.value)
    }



    const handleBtnComplete = () => {
        if (!isUserLoggedIn) {
            setMessage("Please login to your account first")
            setTimeout(() => {
                window.location.href = "https://www.kikiq.ir/login"
            }, 1100)
        } else {
            return;
        }
    }



    const process_inputs = () => {
        // console.log("currentUser", currentUserData)

        let user = {
            username: currentUserData['username'],
            // first_name: currentUserData['first_name'],
            // last_name: currentUserData['last_name'],
            // phone_number: currentUserData['phone_number'],
            // password: currentUserData['password'],
            // id: currentUserData['id'],
            address: ADDRESS,
            city: CITY,
            postal_code: POSTAL_CODE
        }

        // setCurrentUserData(user)
        // let username = currentUserData['username']
        const jsonUser = JSON.stringify(user);
        console.log("user", user)
        let addUser = RestFulApi(`https://apis.kikiq.ir/api.php?fn=update_user&arg1=${jsonUser}`)
        addUser.then(function (response) {
            console.log(response)
        })
        addUser.catch(function (reason) {
            console.log(reason)
            // setErrors({
            //     ...errors,
            //     server: "Server Error!"
            // })
            // return;
        })

        let parameters = {
            merchant: ZIBAL_MERCHANT_KEY,
            callbackUrl: ZIBAL_CALLBACK_URL,
            amount: AllPrices,//required
            orderId: d.toLocaleString("fa-IR", { timeZone: "Iran", dateStyle: "full", timeStyle: "medium" }),//optional
            description: ItemsTitle,
            // "mobile": $phone_number,//optional for mpg
            // multiplexingInfos: multiplexingInfos
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
            window.location.replace('https://www.kikiq.ir/login')
        }

        setSubmitted(true)
    }



    // useEffect(() => {
    //     window.scrollBy(0, 1000)
    // })

    useEffect(() => {
        console.log("isUserLoggedIn", isUserLoggedIn)
    }, [isUserLoggedIn])


    let count = 0;
    return (
        <div style={{
            margin: '45px 10%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {message ? (<Message clas="info">{message}</Message>) : (<></>)}
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
                                <button className="btnComplete" onClick={handleBtnComplete} >Complete</button>
                            </td>
                        </tr>
                    </table>
                </div>


            </div>

            {
                isUserLoggedIn ? (
                    // <div className="getAddress--holder">
                    <div id="getAddressId" className="getAddress">
                        <div id="closeBtn"><button>X</button></div>
                        <div className="getAddress--inputDiv">
                            <input type="text" placeholder='City' onChange={handleCity} />
                        </div>
                        <div className="getAddress--inputDiv">
                            <input type="text" placeholder='Postal Code' onChange={handlePostalCode} />
                        </div>
                        <div className="getAddress--inputDiv" style={{ flexGrow: '3' }}>
                            <textarea placeholder='Address' onChange={handleAddress}></textarea>
                        </div>
                        <div className="getAddress--inputDiv" style={{ marginRight: '54px' }}>
                            <ButtonComponent cl="getAddress--button" handleClick={() => { process_inputs() }}>Continue</ButtonComponent>
                        </div>
                    </div>
                    // </div>
                ) : (<></>)
            }
        </div >
    )
}

export default CartSelection;



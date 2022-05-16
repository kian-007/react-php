import React, { useEffect, useState, useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './navbar.css';
import { Link } from 'react-router-dom';
import CATEGORIES from './CATEGORYS.json';
import { MdShoppingCart } from "react-icons/md";
import { MdOutlineExpandMore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import $ from 'jquery';
import { AuthContext } from '../../contexts/authContext';

const Navbar = ({ carts }) => {
    const categories = CATEGORIES;
    const [load, setLoad] = useState()
    const location = useLocation();
    const { is_user_logged_in, currentUserData, logout } = useContext(AuthContext);


    useEffect(() => {

        $('#shopbtn').on('mouseover', function () {
            $('#shoplist').slideDown(270);
            $('.iconExpand').css('transform', "rotate(180deg)");
            $('.iconExpand').css('transition', "350ms");
        })
        $('#shopbtn').on('mouseout', function () {
            $('.iconExpand').css('transform', "rotate(360deg)");
        })



        $('#shopbtn, #shoplist, .mySubNav').on({
            'mouseover': () => {
                $('#shoplist').css('display', "flex")
                $('#shoplist').css('flex-direction', "row")
            },
            'mouseout': () => {
                $('#shoplist').css('display', "none")
            }
        })

        $('.subNav, .mySubNav').find('li').on({
            'mouseover': function () {
                $(this).parent('ul').find('button').css('backgroundColor', "#48dbfb")
                $(this).parent('ul').find('button').css('color', "#fff")
            },
            'mouseout': function () {
                $(this).parent('ul').find('button').css('backgroundColor', "#eee")
                $(this).parent('ul').find('button').css('color', "#000")
            }
        })



    }, [])

    useEffect(() => {
        $('.profile').on('mouseover', function () {
            $('.navbar .profile--data--list').slideDown(150)
        })
        $('.profile--data--list').on('mouseleave', function () {
            $('.navbar .profile--data--list').slideUp(150)
        })
        $('*').not('.profile--data--list').on('click', function () {
            $('.navbar .profile--data--list').slideUp(150)
        })
    }, [is_user_logged_in()])

    let data = 0;
    data = carts.length;

    useEffect(() => {
        setLoad(data)
    }, [data, carts])






    return (
        <div className="navbar" id="nav">
            <ul id="navbarcontent">
                <li className={location.pathname === '/home' && 'MainNavActive'}>
                    <Link to="/home">
                        <button>HOME</button>
                    </Link>
                </li>
                {is_user_logged_in() ? (
                    <li className={location.pathname === '/logout' && 'MainNavActive'}>
                        <Link to="/profile" className="nonono">
                            <button className="profile"><CgProfile size="19"/><span>PROFILE</span></button>
                        </Link>
                        <div className="profile--data">
                            <ul className="profile--data--list">
                                <li><button>{currentUserData['first_name']}</button></li>
                                <li><button><CgProfile /> Dashboard </button></li>
                                <li><button onClick={() => { logout() }}>Logout</button></li>
                            </ul>
                        </div>
                    </li>
                ) : (

                    <li className={location.pathname === '/login' && 'MainNavActive'}>
                        <Link to="/login">
                            <button>LOGIN</button>
                        </Link>
                    </li>
                )}

                <li id="shopbtn" className={location.pathname === '/shop' && 'MainNavActive'}>
                    <Link to="/shop" className="nonono">
                        <button id='shopbtn--icon'><span>SHOP</span>
                            {<MdOutlineExpandMore size="15" className="iconExpand" />}
                        </button>
                    </Link>
                    <ul id="shoplist">
                        {categories.map((category, index) => (
                            <li key={index}>
                                <ul className="subNav mySubNav" id={category.title}>
                                    <button id={`${category.title}Btn`}>{category.title}</button>
                                    {category.section.map((sec, index2) => (
                                        <li className={location.pathname === `/shop/${category.title}/${sec}` && 'SubNavActive'} key={index2}>
                                            <Link to={`shop/${category.title}/${sec}`}>{sec}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}


                    </ul>
                </li>
                <li className={location.pathname === '/blog' && 'MainNavActive'}>
                    <Link to="/blog">
                        <button>BLOG</button>
                    </Link>
                </li>
                <li className={location.pathname === '/about' && 'MainNavActive'}>
                    <Link to="/about">
                        <button>ABOUT</button>
                    </Link>
                </li>
                <li className={location.pathname === '/contact' && 'MainNavActive'}>
                    <Link to="/contact">
                        <button>CONTACT</button>
                    </Link>
                </li>
                <li>
                    <div className="cart">
                        <h4>{load}</h4>
                        <Link to="/cartselection" id="cartselct">
                            <MdShoppingCart className="MdShoppingCart" size="25px" style={{ margin: '-3px 0' }} />
                        </Link>
                        {/* <img src="../../cart_icon.png" alt="cart_icon"/> */}
                    </div>
                </li>
            </ul>
            <br />

            {/* {
                is_user_logged_in() && currentUserData !== null ? (
                    <div id="greeting">
                        <span>Hellow {currentUserData['first_name']}</span>
                    </div>
                ) : (<></>)
            } */}

        </div >
    )
}

export default Navbar
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './navbar.css';
import { Link } from 'react-router-dom';
import CATEGORIES from './CATEGORYS.json';
import { MdShoppingCart } from "react-icons/md";
import { MdOutlineExpandMore } from "react-icons/md";
import $ from 'jquery';

const Navbar = ({ carts }) => {
    const categories = CATEGORIES;
    const [load, setLoad] = useState()
    const location = useLocation();


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
                <li className={location.pathname === '/login' && 'MainNavActive'}>
                    <Link to="/login">
                        <button>LOGIN</button>
                    </Link>
                </li>
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
        </div>
    )
}

export default Navbar
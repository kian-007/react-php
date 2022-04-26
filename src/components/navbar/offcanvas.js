import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './offcanvas.css';
import SubOffcanvas from './subOffcanvas';
import $ from 'jquery';
import { MdShoppingCart } from "react-icons/md";


const Offcanvas = ({ carts }) => {

    useEffect(() => {
        var slct = $('#menuButton')
        slct.on({
            'blur': function () {
                // $('#mySidenav').css('width', '0')
                // $('#main').css('margin-left', '0')
                // document.getElementById("menuButton").style.transform = "rotate(0deg)";
                // // document.body.style.backgroundColor = "white";
                // document.getElementById("mySidenav").classList.remove('open')
            },
            'click': function () {
                $('#mySidenav').toggleClass('open')
                if ($('#mySidenav').hasClass('open')) {
                    document.getElementById("mySidenav").style.width = "270px";
                    document.getElementById("main").style.marginLeft = "270px";
                    document.getElementById("menuButton").style.transform = "rotate(90deg)";
                } else {
                    document.getElementById("mySidenav").style.width = "0";
                    document.getElementById("main").style.marginLeft = "0";
                    document.getElementById("menuButton").style.transform = "rotate(0deg)";
                    $('.subSideNav').hide(200)
                    $('.subCategory').hide(200)
                }
            }
        })

        $('a').not('#categories, .subSideNav > li > a').on('focus', function () {
            $('#mySidenav').css('width', '0')
            $('#main').css('margin-left', '0')
            document.getElementById("menuButton").style.transform = "rotate(0deg)";
            document.getElementById("mySidenav").classList.remove('open')
            $('.subSideNav').hide(200)
            $('.subCategory').hide(200)
        })

        $('#categories').on('click', function () {
            $(this).next('ul').slideToggle()
        })

        $('#categories').next('.subSideNav').find('li').on('click', function () {
            $(this).find('.subCategory').toggleClass('current')
            $(this).find('.subCategory').slideToggle()
            $('.subCategory').not('.current').slideUp()
            $(this).find('.subCategory').removeClass('current')
        })

    }, [])





    return (
        <div className="offcanvas" id="ooff">
            <div id="mySidenav" className="sidenav">
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="#" id="categories">Categories</Link>
                        <SubOffcanvas />     {/* <!-- contains subUls and subCategories --> */}
                    </li>
                    <li>
                        <Link to="/blog">Blog</Link>
                    </li>
                    <li>
                        <Link to="about">About</Link>
                    </li>
                    <li>
                        <Link to="contact">Contact</Link>
                    </li>
                </ul>
                {/* <Link to="#" className="closebtn" onClick={closeNav}>&times;</Link> */}




            </div>

            <div className="offcanvasButtonDiv" id="obd">
                {/* <!-- Use any element to open the sidenav --> */}
                <button id="menuButton"  >
                    <img src="../../offcanvas.png" alt="offcanvas" />
                </button>

                <div className="cart">
                    <h4>{carts.length}</h4>
                    <Link to="/cartselection" id="cartselct">
                        <MdShoppingCart className="MdShoppingCart" size="25px" style={{ margin: '-3px 0' }} />
                    </Link>
                    {/* <img src="../../cart_icon.png" alt="cart_icon"/> */}
                </div>
            </div>

            {/* <!-- Add all page content inside this div if you want the side nav to push page content to the right (not used if you only want the sidenav to sit on top of the page --> */}
            <div id="main">
            </div>
        </div >
    )
}

export default Offcanvas;
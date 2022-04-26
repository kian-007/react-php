import React, { useContext, useRef, useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
import './header.css';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../../contexts/cartContext';
import Offcanvas from '../navbar/offcanvas';
import CATEGORY from '../navbar/CATEGORYS.json';



const Header = () => {
    // let location = useLocation();
    let { pathname } = useLocation();     /* faqat pathname ro migirim na chizay bishtar */
    const { carts } = useContext(CartContext)
    let { added } = useContext(CartContext)
    const headerref = useRef(null);
    const [refresh, setRefresh] = useState(0)


    //big screen
    window.onscroll = function () { scrollFunction(); scrollFunctionn(); };
    function scrollFunction() {
        if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
            document.getElementById("nav").style.position = "fixed";
            // document.getElementById("header").style.borderRadius = "85px 85px 0px 0px";
            document.getElementById("nav").style.padding = "0px 600px";
            document.getElementById("nav").style.paddingTop = "10px";
            document.getElementById("nav").style.paddingBottom = "0px";
            document.getElementById("nav").style.margin = "-30px";
            // document.getElementById("navbarcontent").style.justifyContent = "flex-end";
            document.getElementById("nav").style.zIndex = "1";
            document.getElementById("nav").style.boxShadow = "5px 5px 20px -7px #999";
        }
        else {
            // document.getElementById("header").style.borderRadius = "0px";
            document.getElementById("nav").style.position = "relative";
            document.getElementById("nav").style.padding = "0px 0px";
            document.getElementById("nav").style.margin = "30px";
            document.getElementById("nav").style.width = "auto";
            // document.getElementById("navbarcontent").style.justifyContent = "flex-start";
        }
    }

    //small screen
    function scrollFunctionn() {
        if (document.body.scrollTop > 27 || document.documentElement.scrollTop > 27) {
            document.getElementById("obd").style.position = "fixed";
            document.getElementById("obd").style.backgroundColor = "#eee";
            document.getElementById("obd").style.padding = "15px 130px";
            document.getElementById("ooff").style.marginTop = "0px";
        } else {
            document.getElementById("obd").style.position = "absolute";
            document.getElementById("obd").style.backgroundColor = "rgba(255, 157, 157, 0.5)";
            document.getElementById("obd").style.padding = "0px 0px";
            document.getElementById("ooff").style.marginTop = "45px";
        }
    }





    let title = "";
    let background = {}
    switch (pathname) {
        case '':
            title = 'KikiCutest \\ Home'
            background = {
                backgroundImage: "url(/model.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundColor: "#bcb3ad",

            }
            break;
        case '/':
            title = 'KikiCutest \\ Home'
            background = {
                backgroundImage: "url(/model.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundColor: "#bcb3ad",

            }
            break;
        case '/home':
            title = 'KikiCutest \\ Home'
            background = {
                backgroundImage: "url(/model.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundColor: "#bcb3ad",

            }
            break;
        case '/blog':
            title = 'Blog'
            background = {
                backgroundImage: "url(/super.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundColor: "#2b2a26"
            }
            break;
        case '/about':
            title = 'About'
            background = {
                backgroundImage: "url(/beautifulwo3.jpeg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundColor: "#2b2a26"
            }
            break;
        case '/contact':
            title = 'Contact'
            background = {
                backgroundImage: "url(/beautifulwo3.jpeg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundColor: "#2b2a26"
            }
            break;
        default:
            title = 'Home'
            background = {
                backgroundImage: "url(/model.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundColor: "#2b2a26",
            }
            break;
    }

    CATEGORY.map(category => {
        category.section.map(section => {
            if (pathname == `/shop/${category.title}/${section}`) {
                title = `Shop / ${section}`;
                background = {
                    backgroundImage: "url(/super.jpg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundColor: "#2b2a26",
                }
            }
        })
    })



    useEffect(() => {
        headerref.current.classList.add('onLoad');
    }, [])



    const neww = []
    useEffect(() => {

        if (carts.length >= 1) {
            neww.push.apply(neww, carts)
            localStorage.setItem('carts', JSON.stringify(neww))
            setRefresh(refresh + 1)

        } else {
            let storedData = localStorage.getItem('carts')
            if (storedData) {
                storedData = JSON.parse(storedData)

                if (carts.length < 1) {
                    setRefresh(refresh + 1)

                    // if(carts.length == 1) {
                    //     neww.push.apply(neww, carts)
                    //     localStorage.setItem('carts', JSON.stringify(neww))
                    //     setRefresh(refresh + 1)
                    // }

                    if (carts.length == 0 && storedData.length > 1) {
                        carts.push.apply(carts, storedData)
                        // setRefresh(refresh + 1)

                    }
                    else if (carts.length == 0 && storedData.length == 1) {
                        carts.push.apply(carts, storedData)
                        // setRefresh(refresh + 1)

                    } else {
                        neww.push.apply(neww, carts)
                        localStorage.setItem('carts', JSON.stringify(neww))
                        // setRefresh(refresh + 1)
                    }
                }
            }
        }
    }, [carts, added, refresh])

    return (
        <div className="header" id="header" style={background} ref={headerref}>
            <Navbar carts={carts} />
            <Offcanvas carts={carts} />
            <h3>{title} '^_^'</h3>
        </div>
    )
}

export default Header

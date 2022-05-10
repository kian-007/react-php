import React, { useContext, useEffect } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import CartContextProvider from '../../contexts/cartContext';
import './layout.css';
import { AuthContext } from '../../contexts/authContext';

const Layout = ({ children }) => {
    const { currentUserData, currentUserId, setCurrentUserId, setCurrentUserData, is_user_logged_in } = useContext(AuthContext)

    useEffect(() => {
        let currentUserId = window.localStorage.getItem("currentUserId")
        let currentUserData = window.localStorage.getItem("currentUserData")

        // currentUserId = JSON.parse(currentUserId)
        currentUserData = JSON.parse(currentUserData)

        setCurrentUserId(currentUserId)
        setCurrentUserData(currentUserData)

        console.log("currentUserId", currentUserId)
        console.log("currentUserData", currentUserData)
        console.log("isUserLoggedIn", is_user_logged_in())
    }, [currentUserId])

    return (

        <CartContextProvider>
            <div className="layout">
                <Header />
                {children}
                <Footer />
            </div>
        </CartContextProvider>
    )
}

export default Layout;
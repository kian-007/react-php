import React, { useContext } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import CartContextProvider from '../../contexts/cartContext';
import './layout.css';
import AuthContextProvider, { AuthContext } from '../../contexts/authContext';

const Layout = ({ children }) => {
    const { currentUserId } = useContext(AuthContext)
    console.log("currentUser", currentUserId)

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
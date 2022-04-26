import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import CartContextProvider from '../../contexts/cartContext';
import './layout.css';

const Layout = ({children})=>(
    <CartContextProvider>
        <div className="layout">
            <Header />
            {children}
            <Footer />
        </div>
    </CartContextProvider>
)

export default Layout;
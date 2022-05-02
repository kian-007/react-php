import React, { useContext , useEffect} from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import CartContextProvider from '../../contexts/cartContext';
import './layout.css';
import { AuthContext } from '../../contexts/authContext';

const Layout = ({ children }) => {
    const { currentUserData, currentUserId } = useContext(AuthContext)

    useEffect(() => {
        console.log("currentUserId", currentUserId)
        console.log("currentUserData", currentUserData)
    }, [currentUserId, currentUserData])

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
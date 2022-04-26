import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../contexts/themeContext';
import './footer.css';
import { AiFillInstagram } from 'react-icons/ai'

const Footer = () => {

    const themeValues = useContext(ThemeContext)
    return (
        <div className="footer">
            <span>Developed By Kian</span>
            <div className="socialMedia">
                <a href='https://www.instagram.com/kikicutest_online/'>
                    <AiFillInstagram size={25} style={{ marginRight: "50px" }} />
                </a>
            </div>
            <div className="theme">
                <button onClick={() => themeValues.setActiveTheme('white')} className="white">
                    White
                </button>
                <button onClick={() => themeValues.setActiveTheme('red')} className="red">
                    Red
                </button>
            </div>
        </div>
    )
}

export default Footer
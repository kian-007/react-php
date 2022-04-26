import React from 'react';
import CATEGORIES from './CATEGORYS.json'
import { Link, useLocation } from 'react-router-dom';


const SubOffcanvas = () => {
    const categories = CATEGORIES;
    const location = useLocation();

    return (
        <ul className="subSideNav">
            {
                categories.map((category, index) => (
                    <li key={index}>
                        <Link to="#">{category.title}</Link>
                        <ul className="subCategory">
                            {category.section.map((sec, index2) => (
                                <li className={location.pathname === `/shop/${category.title}/${sec}` && 'SubOffcanvasActive'} key={index2}>
                                    <Link to={`shop/${category.title}/${sec}`}>{sec}</Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))
            }
        </ul>
    );
}

export default SubOffcanvas;


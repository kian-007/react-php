import React, { useEffect } from 'react';
import './App.css';
import ThemeContextProvider from '../contexts/themeContext';
import CATEGORY from '../components/navbar/CATEGORYS.json'
import PRODUCTS from '../pages/ITEMS.json';
import $ from 'jquery';
import CartSelection from '../components/cartSelection/cartSelection';
import { Home, About, Contact, Blog, SingleProduct, Layout, ShowSection, LogIn } from '../components';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Api from '../apis/api';

 

function App() {
  const categories = CATEGORY

  useEffect(() => {
    $(".container").not('.offcanvas, #menuButton').on('click', function () {
      $('#mySidenav').css('width', '0')
      $('#main').css('margin-left', '0')
      document.getElementById("menuButton").style.transform = "rotate(0deg)";
      document.getElementById("mySidenav").classList.remove('open')
      // $(this).css('background-color', "black")
    })
  }, [])


  

  return (
    <ThemeContextProvider>
      <div className="App">
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<Home />} />
              <Route path="/product/:id" element={<SingleProduct />} />
              {categories.map((category, index) => (
                category.section.map((sec) => (
                  <Route key={index} path={`shop/${category.title}/:section`} element={<ShowSection />} />
                ))
              ))}
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cartselection" element={<CartSelection />} />
              <Route path="/apis" element={<Api />} />
              <Route path="/login" element={<LogIn />} />
            </Routes>
          </Layout>
        </Router>
      </div>
    </ThemeContextProvider>
  );
}

export default App;

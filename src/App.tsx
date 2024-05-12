import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Cart from "./pages/Cart";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Products/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/cart" element={<Cart/>}/>
            </Routes>
        </>
    );
}
export default App;
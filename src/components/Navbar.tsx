import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/auth-context";
import {CartContext} from "../context/cart-context";
import Button from "./Button";
import {BsBasket3} from "react-icons/bs";
import {MdStore} from "react-icons/md";

function Navbar() {
    const { currentUser, signOut } = useContext(AuthContext);
    const cartContext = useContext(CartContext);
    const navigate = useNavigate();

    function handleLogin(){
        navigate("/login");
    }

    return (
        <nav className="bg-gray-50 dark:bg-gray-800 shadow w-full">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <MdStore className="m-4" size={30} />
                        <span className="font-semibold text-xl tracking-tight text-gray-900">Store Application</span>
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/products"
                               className="text-gray-900 md:hover:text-blue-700">Products</Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="inline-block relative mr-8">
                            <Link to="/cart">
                            <BsBasket3 size={20} />
                            </Link>
                            {cartContext?.itemCount > 0 && <span className="absolute bottom-3 left-3.5 bg-red-500 text-white rounded-md pl-1 pr-1 text-xs">
                            {cartContext?.itemCount}
                            </span>}
                        </div>
                        {!!currentUser ?
                            <Button type="button" text="Sign out" onClick={signOut}/> :
                            <Button type="button" text="Log in" onClick={handleLogin}/>
                        }
                    </div>
                </div>
            </div>
        </nav>

    );

}

export default Navbar;

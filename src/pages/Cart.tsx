import React, {useContext, useState} from 'react';
import { useCart } from "../context/cart-context";
import {AuthContext} from "../context/auth-context";
import {purchaseItems} from "../services/firebaseService";
import Container from "../components/Container";
import Button from "../components/Button";
import Label from "../components/Label";
import {AlertType} from "../interfaces/AlertProps";
import Alert from "../components/Alert";

function Cart() {
    const { items, removeItem, clearCart } = useCart();
    const { currentUser } = useContext(AuthContext);
    const [alert, setAlert] = useState({ show: false, message: '', type: AlertType.error});

    const totalPrice = items.reduce((total, item) => total + item.price, 0);

    function closeAlert(){
        setAlert({ show: false, message: alert.message, type: AlertType.error });
    }

    async function handlePurchase(){
        const userId = currentUser?.uid;
        if (userId){
            await purchaseItems(userId, items, totalPrice);
            clearCart();
        } else {
            setAlert({ show: true, message: 'Please log in to make a purchase.', type: AlertType.error });
        }
    }

    return (
        <Container headerText="Shopping Cart">
            {alert.show && <Alert message={alert.message} type={alert.type} onClose={closeAlert} />}
            {items.length === 0 ? (
                <Label text="Your cart is empty!" />
            ) : (
                <div>
                    <ul className="mt-4">
                        {items.map(item => (
                            <li key={item.id}
                                className="flex items-center justify-between border-b border-gray-200 py-4">
                                <div className="flex items-center">
                                    <strong className="text-md text-gray-700 mr-4">{item.title}</strong>
                                    <span
                                        className="text-sm text-gray-500">${item.price} (Quantity: {item.quantity})</span>
                                </div>
                                <button
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                    onClick={() => removeItem(item.id)}>
                                    Remove from Cart
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800">Total price: ${totalPrice}</h3>
                        <Button onClick={handlePurchase} text="Purchase" />
                    </div>
                </div>
            )}
        </Container>

    );
}

export default Cart;

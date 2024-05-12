import {Product} from "../services/apiService";
import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";

export interface CartItem extends Product{
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product, quantity: number) => void;
    removeItem: (productId: number) => void;
    itemCount: number;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
    items: [],
    addItem: () => {},
    removeItem: () => {},
    itemCount: 0,
    clearCart: () => {},
})

interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
    const [items, setItems] = useState<CartItem[]>(() => {
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(items));
    }, [items]);

    function addItem(product: Product, quantity: number) {
        setItems(prevItems => {
            const itemIndex = prevItems.findIndex(item => item.id === product.id);
            if (itemIndex > -1) {
                const newItems = [...prevItems];
                newItems[itemIndex] = { ...newItems[itemIndex], quantity: newItems[itemIndex].quantity + quantity };
                return newItems;
            } else {
                return [...prevItems, { ...product, quantity }];
            }
        });
    }

    function removeItem(productId: number){
        setItems(prevItems => prevItems.filter(item => item.id !== productId));
    }

    function clearCart() {
        setItems([]);
    }

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const value = {
        items,
        addItem,
        removeItem,
        itemCount,
        clearCart
    }

    return (
        <CartContext.Provider value={value}>
            { children }
        </CartContext.Provider>
    );
}

export function useCart(){
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must bed used within CartProvider');
    }

    return context;
}
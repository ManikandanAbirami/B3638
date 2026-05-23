import { useState } from "react";
import { CartContext } from "./cart-context";

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    function addToCart(pizza) {
        const existingItem = cartItems.find((item) => item._id === pizza._id);

        if (existingItem) {
            const updatedCart = cartItems.map((item) =>
                item._id === pizza._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

            setCartItems(updatedCart);
        } else {
            setCartItems([...cartItems, { ...pizza, quantity: 1 }]);
        }
    }

    function removeFromCart(pizzaId) {
        setCartItems(cartItems.filter((item) => item._id !== pizzaId));
    }

    function clearCart() {
        setCartItems([]);
    }

    const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                totalAmount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
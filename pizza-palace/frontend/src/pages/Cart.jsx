import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useCart } from "../context/cart-context";
import { useNavigate } from "react-router-dom";

function Cart() {
    const { cartItems, removeFromCart, clearCart, totalAmount } = useCart();
    const navigate = useNavigate();

    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    async function placeOrder() {
        if (!address || !phone) {
            alert("Please enter address and phone number");
            return;
        }

        try {
            const orderItems = cartItems.map((item) => ({
                pizzaId: item._id,
                quantity: item.quantity,
            }));

            await axiosInstance.post("/orders", {
                items: orderItems,
                address,
                phone,
            });

            alert("Order placed successfully");
            clearCart();
            navigate("/my-orders");
        } catch (error) {
            alert(error.response?.data?.message || "Order failed");
        }
    }

    return (
        <div className="min-h-screen bg-yellow-50 px-6 py-10">
            <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
                <h1 className="text-3xl font-bold text-red-600">Your Cart</h1>

                {cartItems.length === 0 ? (
                    <p className="mt-6 text-gray-600">Your cart is empty.</p>
                ) : (
                    <>
                        <div className="mt-6 space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex justify-between items-center border p-4 rounded-xl"
                                >
                                    <div>
                                        <h2 className="font-bold text-lg">{item.name}</h2>
                                        <p>
                                            ₹{item.price} × {item.quantity}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-2xl font-bold mt-6">
                            Total: ₹{totalAmount}
                        </h2>

                        <div className="mt-6 space-y-4">
                            <input
                                className="w-full border p-3 rounded-lg"
                                placeholder="Delivery Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />

                            <input
                                className="w-full border p-3 rounded-lg"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />

                            <button
                                onClick={placeOrder}
                                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700"
                            >
                                Place Order
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Cart;
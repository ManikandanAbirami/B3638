import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function loadOrders() {
            try {
                const response = await axiosInstance.get("/orders/my-orders");

                if (isMounted) {
                    setOrders(response.data);
                }
            } catch (error) {
                alert("Failed to fetch orders", error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadOrders();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-orange-50">
                <h1 className="text-3xl font-bold text-red-600">
                    Loading orders...
                </h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-orange-50 px-6 py-10">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-red-700">My Orders</h1>

                <div className="mt-8 space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white p-6 rounded-2xl shadow">
                            <div className="flex justify-between">
                                <h2 className="font-bold text-lg">
                                    Order ID: {order._id}
                                </h2>

                                <span className="bg-yellow-300 px-4 py-1 rounded-full font-bold">
                                    {order.status}
                                </span>
                            </div>

                            <p className="mt-3">Total: ₹{order.totalAmount}</p>
                            <p>Address: {order.address}</p>

                            <div className="mt-4">
                                {order.items.map((item) => (
                                    <p key={item._id}>
                                        {item.name} × {item.quantity}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}

                    {orders.length === 0 && (
                        <p className="text-gray-600">No orders found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyOrders;
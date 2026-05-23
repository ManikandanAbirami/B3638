import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const statusOptions = [
        "Placed",
        "Preparing",
        "Out for Delivery",
        "Delivered",
    ];

    useEffect(() => {
        let isMounted = true;

        async function loadOrders() {
            try {
                const response = await axiosInstance.get("/orders");

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

    async function updateStatus(orderId, status) {
        try {
            await axiosInstance.put(`/orders/${orderId}/status`, {
                status,
            });

            const response = await axiosInstance.get("/orders");
            setOrders(response.data);
        } catch (error) {
            alert("Failed to update status", error);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-yellow-50">
                <h1 className="text-3xl font-bold text-red-600">
                    Loading orders...
                </h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-yellow-50 px-6 py-10">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-red-700">
                    Manage Orders
                </h1>

                <div className="mt-8 space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white p-6 rounded-2xl shadow">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div>
                                    <h2 className="font-bold text-lg">
                                        Customer: {order.user?.name}
                                    </h2>

                                    <p>Email: {order.user?.email}</p>
                                    <p>Phone: {order.phone}</p>
                                    <p>Address: {order.address}</p>
                                    <p className="font-bold mt-2">
                                        Total: ₹{order.totalAmount}
                                    </p>
                                </div>

                                <select
                                    className="border p-3 rounded-lg h-fit"
                                    value={order.status}
                                    onChange={(e) =>
                                        updateStatus(order._id, e.target.value)
                                    }
                                >
                                    {statusOptions.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-4 border-t pt-4">
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

export default AdminOrders;
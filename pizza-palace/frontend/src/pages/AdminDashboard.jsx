import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function AdminDashboard() {
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "veg",
        image: "",
    });

    useEffect(() => {
        let isMounted = true;

        async function loadPizzas() {
            try {
                const response = await axiosInstance.get("/pizzas");

                if (isMounted) {
                    setPizzas(response.data);
                }
            } catch (error) {
                alert("Failed to fetch pizzas", error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadPizzas();

        return () => {
            isMounted = false;
        };
    }, []);

    async function refreshPizzas() {
        try {
            const response = await axiosInstance.get("/pizzas");
            setPizzas(response.data);
        } catch (error) {
            alert("Failed to refresh pizzas", error);
        }
    }

    async function addPizza(e) {
        e.preventDefault();

        try {
            await axiosInstance.post("/pizzas", {
                ...formData,
                price: Number(formData.price),
            });

            alert("Pizza added successfully");

            setFormData({
                name: "",
                description: "",
                price: "",
                category: "veg",
                image: "",
            });

            refreshPizzas();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to add pizza");
        }
    }

    async function deletePizza(id) {
        try {
            await axiosInstance.delete(`/pizzas/${id}`);
            refreshPizzas();
        } catch (error) {
            alert("Failed to delete pizza", error);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-50">
                <h1 className="text-3xl font-bold text-red-600">
                    Loading dashboard...
                </h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-red-50 px-6 py-10">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-red-700">
                    Admin Dashboard
                </h1>

                <div className="grid lg:grid-cols-2 gap-8 mt-8">
                    <form
                        onSubmit={addPizza}
                        className="bg-white p-6 rounded-2xl shadow-xl space-y-4"
                    >
                        <h2 className="text-2xl font-bold text-gray-800">
                            Add New Pizza
                        </h2>

                        <input
                            className="w-full border p-3 rounded-lg"
                            placeholder="Pizza Name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                        />

                        <textarea
                            className="w-full border p-3 rounded-lg"
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                        />

                        <input
                            className="w-full border p-3 rounded-lg"
                            placeholder="Price"
                            type="number"
                            value={formData.price}
                            onChange={(e) =>
                                setFormData({ ...formData, price: e.target.value })
                            }
                        />

                        <select
                            className="w-full border p-3 rounded-lg"
                            value={formData.category}
                            onChange={(e) =>
                                setFormData({ ...formData, category: e.target.value })
                            }
                        >
                            <option value="veg">Veg</option>
                            <option value="non-veg">Non-Veg</option>
                            <option value="cheese">Cheese</option>
                            <option value="special">Special</option>
                        </select>

                        <input
                            className="w-full border p-3 rounded-lg"
                            placeholder="Image URL"
                            value={formData.image}
                            onChange={(e) =>
                                setFormData({ ...formData, image: e.target.value })
                            }
                        />

                        <button className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700">
                            Add Pizza
                        </button>
                    </form>

                    <div className="bg-white p-6 rounded-2xl shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Existing Pizzas
                        </h2>

                        <div className="mt-4 space-y-4">
                            {pizzas.map((pizza) => (
                                <div
                                    key={pizza._id}
                                    className="flex justify-between border p-4 rounded-xl"
                                >
                                    <div>
                                        <h3 className="font-bold">{pizza.name}</h3>
                                        <p>₹{pizza.price}</p>
                                    </div>

                                    <button
                                        onClick={() => deletePizza(pizza._id)}
                                        className="bg-black text-white px-4 py-2 rounded-lg"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}

                            {pizzas.length === 0 && (
                                <p className="text-gray-600">No pizzas found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
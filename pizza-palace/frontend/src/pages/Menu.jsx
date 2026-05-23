import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import PizzaCard from "../components/PizzaCard";

function Menu() {
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function loadPizzas() {
            try {
                const response = await axiosInstance.get("/pizzas");

                if (isMounted) {
                    setPizzas(response.data);
                }
            } catch (error) {
                alert("Failed to load pizzas", error);
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-orange-50">
                <h1 className="text-3xl font-bold text-red-600">
                    Loading pizzas...
                </h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-orange-50 px-6 py-10">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-red-700 text-center">
                    Our Pizza Menu
                </h1>

                <p className="text-center text-gray-600 mt-3">
                    Choose your favorite pizza and add it to cart
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {pizzas.map((pizza) => (
                        <PizzaCard key={pizza._id} pizza={pizza} />
                    ))}
                </div>

                {pizzas.length === 0 && (
                    <p className="text-center text-gray-600 mt-10">
                        No pizzas available.
                    </p>
                )}
            </div>
        </div>
    );
}

export default Menu;
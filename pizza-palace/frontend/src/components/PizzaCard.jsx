import { useCart } from "../context/cart-context";

function PizzaCard({ pizza }) {
    const { addToCart } = useCart();

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
            {/* IMAGE */}
            <img
                src={pizza.image}
                alt={pizza.name}
                className="w-full h-56 object-cover"
            />

            {/* CONTENT */}
            <div className="p-5">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">
                        {pizza.name}
                    </h2>

                    <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                        ₹ {pizza.price}
                    </span>
                </div>

                <p className="text-gray-600 mt-3">
                    {pizza.description}
                </p>

                <div className="flex justify-between items-center mt-5">
                    <span className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full">
                        {pizza.category}
                    </span>

                    <button
                        onClick={() => addToCart(pizza)}
                        className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PizzaCard;
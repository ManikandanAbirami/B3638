import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen bg-linear-to-br from-yellow-100 via-orange-100 to-red-100">
            <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h1 className="text-5xl font-extrabold text-red-700 leading-tight">
                        Hot, Fresh & Cheesy Pizza Delivered Fast 🍕
                    </h1>

                    <p className="mt-6 text-lg text-gray-700">
                        Order your favorite pizzas online with a smooth MERN Stack powered
                        booking experience.
                    </p>

                    <div className="mt-8 flex gap-4">
                        <Link
                            to="/menu"
                            className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700"
                        >
                            View Menu
                        </Link>

                        <Link
                            to="/register"
                            className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-300"
                        >
                            Register
                        </Link>
                    </div>
                </div>

                <div>
                    <img
                        src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
                        alt="Pizza"
                        className="rounded-3xl shadow-2xl"
                    />
                </div>
            </section>
        </div>
    );
}

export default Home;
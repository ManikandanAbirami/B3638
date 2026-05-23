import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/auth-context";
import { useCart } from "../context/cart-context";

function Navbar() {
    const { user, logout } = useAuth();

    const { cartItems } = useCart();

    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav className="bg-red-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* LEFT SECTION */}
                    <div className="flex items-center gap-6">
                        <Link
                            to="/"
                            className="text-white text-2xl font-bold tracking-wide"
                        >
                            🍕 Pizza Palace
                        </Link>

                        <Link
                            to="/menu"
                            className="text-white hover:text-yellow-300 transition"
                        >
                            Menu
                        </Link>

                        {user?.role === "customer" && (
                            <>
                                <Link
                                    to="/cart"
                                    className="text-white hover:text-yellow-300 transition"
                                >
                                    Cart ({cartItems.length})
                                </Link>

                                <Link
                                    to="/my-orders"
                                    className="text-white hover:text-yellow-300 transition"
                                >
                                    My Orders
                                </Link>
                            </>
                        )}

                        {user?.role === "admin" && (
                            <>
                                <Link
                                    to="/admin"
                                    className="text-white hover:text-yellow-300 transition"
                                >
                                    Admin Dashboard
                                </Link>

                                <Link
                                    to="/admin/orders"
                                    className="text-white hover:text-yellow-300 transition"
                                >
                                    Manage Orders
                                </Link>
                            </>
                        )}
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="flex items-center gap-4">
                        {!user ? (
                            <>
                                <Link
                                    to="/login"
                                    className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                <p className="text-white font-semibold">
                                    Hi, {user.name}
                                </p>

                                <button
                                    onClick={handleLogout}
                                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
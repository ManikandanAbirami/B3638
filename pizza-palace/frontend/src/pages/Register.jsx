import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/auth-context";

function Register() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axiosInstance.post("/auth/register", formData);

            login(response.data.user, response.data.token);

            navigate("/menu");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }
    }

    return (
        <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-red-600">
                    Create Account
                </h1>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <input
                        className="w-full border p-3 rounded-lg"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                    />

                    <input
                        className="w-full border p-3 rounded-lg"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />

                    <input
                        className="w-full border p-3 rounded-lg"
                        placeholder="Password"
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                    />

                    <button className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700">
                        Register
                    </button>
                </form>

                <p className="text-center mt-4">
                    Already registered?{" "}
                    <Link to="/login" className="text-red-600 font-bold">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
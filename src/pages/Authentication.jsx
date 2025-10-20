import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { auth } from "../../firebaseConfig"
import Login from "../components/Login"
import SignUp from "../components/SignUp"

export default function Authentication() {
    const [user, setUser] = useState(null)
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const handleLogout = async () => {
        Swal.fire({
            title: "Logout?",
            text: "Are you sure you want to logout?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, logout",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await auth.signOut()
                    Swal.fire({
                        icon: "success",
                        title: "Logged Out",
                        text: "You have been logged out successfully",
                        timer: 2000,
                        showConfirmButton: false,
                    })
                } catch (err) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to logout",
                    })
                }
            }
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-slate-600">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
            {user ? (
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        <div className="mb-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">✓</span>
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome!</h1>
                            <p className="text-slate-600 break-all">{user.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-slate-900 text-center mb-2">
                                {isLogin ? "Welcome Back" : "Create Account"}
                            </h1>
                            <p className="text-center text-slate-600">{isLogin ? "Sign in to your account" : "Join us today"}</p>
                        </div>

                        {isLogin ? <Login /> : <SignUp />}

                        <div className="mt-6 text-center">
                            <p className="text-slate-600">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-blue-600 hover:text-blue-700 font-semibold transition duration-200"
                                >
                                    {isLogin ? "Sign Up" : "Login"}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

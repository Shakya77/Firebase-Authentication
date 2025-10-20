import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"
import Swal from "sweetalert2"
import { auth, githubProvider, googleProvider } from "../../firebaseConfig"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleGoogleLogin = async () => {
        setLoading(true)
        try {
            await signInWithPopup(auth, googleProvider)
            Swal.fire({
                icon: "success",
                title: "Welcome!",
                text: "Logged in with Google successfully",
                timer: 2000,
                showConfirmButton: false,
            })
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: err.message || "Failed to login with Google",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleGithubLogin = async () => {
        setLoading(true)
        try {
            await signInWithPopup(auth, githubProvider)
            Swal.fire({
                icon: "success",
                title: "Welcome!",
                text: "Logged in with GitHub successfully",
                timer: 2000,
                showConfirmButton: false,
            })
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: err.message || "Failed to login with GitHub",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        if (!email || !password) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Please fill in all fields",
            })
            return
        }

        setLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            Swal.fire({
                icon: "success",
                title: "Login Successful!",
                text: "Welcome back!",
                timer: 2000,
                showConfirmButton: false,
            })
            setEmail("")
            setPassword("")
        } catch (err) {
            let errorMessage = "Login failed"
            if (err.code === "auth/user-not-found") {
                errorMessage = "No account found with this email"
            } else if (err.code === "auth/wrong-password") {
                errorMessage = "Incorrect password"
            } else if (err.code === "auth/invalid-email") {
                errorMessage = "Invalid email address"
            }

            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: errorMessage,
            })
        } finally {
            setLoading(false)
        }
    }

    const handleResetPassword = async () => {
        if (!email) {
            Swal.fire({
                icon: "warning",
                title: "Email Required",
                text: "Please enter your email address first",
            })
            return
        }

        try {
            await sendPasswordResetEmail(auth, email)
            Swal.fire({
                icon: "success",
                title: "Reset Email Sent",
                text: "Check your email for password reset instructions",
                timer: 3000,
                showConfirmButton: false,
            })
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.message || "Failed to send reset email",
            })
        }
    }

    return (
        <div className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                        >
                            {showPassword ? "👁️" : "👁️‍🗨️"}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 disabled:scale-100"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>

            <button
                onClick={handleResetPassword}
                className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm py-2 transition duration-200"
            >
                Forgot Password?
            </button>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-slate-500">Or continue with</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition duration-200 disabled:opacity-50"
                >
                    <span className="text-lg">🔍</span>
                    <span className="text-sm font-medium text-slate-700">Google</span>
                </button>
                <button
                    onClick={handleGithubLogin}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition duration-200 disabled:opacity-50"
                >
                    <span className="text-lg">⚙️</span>
                    <span className="text-sm font-medium text-slate-700">GitHub</span>
                </button>
            </div>
        </div>
    )
}

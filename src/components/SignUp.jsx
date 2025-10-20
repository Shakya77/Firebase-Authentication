import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import Swal from "sweetalert2"
import { auth } from "../../firebaseConfig"

export default function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSignUp = async (e) => {
        e.preventDefault()

        if (!email || !password || !confirmPassword) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Please fill in all fields",
            })
            return
        }

        if (password !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Passwords Don't Match",
                text: "Please make sure your passwords match",
            })
            return
        }

        if (password.length < 6) {
            Swal.fire({
                icon: "warning",
                title: "Weak Password",
                text: "Password must be at least 6 characters long",
            })
            return
        }

        if (!/[A-Z]/.test(password)) {
            Swal.fire({
                icon: "warning",
                title: "Weak Password",
                text: "Password must contain at least one uppercase letter",
            })
            return
        }

        if (!/[0-9]/.test(password)) {
            Swal.fire({
                icon: "warning",
                title: "Weak Password",
                text: "Password must contain at least one number",
            })
            return
        }

        setLoading(true)
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            Swal.fire({
                icon: "success",
                title: "Account Created!",
                text: "Welcome! Your account has been created successfully",
                timer: 2000,
                showConfirmButton: false,
            })
            setEmail("")
            setPassword("")
            setConfirmPassword("")
        } catch (err) {
            let errorMessage = "Sign up failed"
            if (err.code === "auth/email-already-in-use") {
                errorMessage = "This email is already registered"
            } else if (err.code === "auth/invalid-email") {
                errorMessage = "Invalid email address"
            } else if (err.code === "auth/weak-password") {
                errorMessage = "Password is too weak"
            }

            Swal.fire({
                icon: "error",
                title: "Sign Up Failed",
                text: errorMessage,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSignUp} className="space-y-4">
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
                <p className="text-xs text-slate-500 mt-1">Min 6 chars, 1 uppercase, 1 number</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                    >
                        {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 disabled:scale-100"
            >
                {loading ? "Creating account..." : "Create Account"}
            </button>

            <p className="text-xs text-slate-600 text-center">
                By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
        </form>
    )
}

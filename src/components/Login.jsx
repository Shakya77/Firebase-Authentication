import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { routes } from '../routes';
import { auth, githubProvider, googleProvider } from '../../firebaseConfig';
import { FacebookAuthProvider } from 'firebase/auth/web-extension';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setError(null);
            Swal.fire({
                icon: 'success',
                title: 'Logged In',
                text: 'You have logged in successfully!',
                timer: 2000,
                showConfirmButton: false,
            });
            navigate(routes.home);
        } catch (err) {
            setError(err.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message,
            });
        }
    };

    const handleOAuthLogin = async (provider) => {
        try {
            await signInWithPopup(auth, provider);
            setError(null);
            Swal.fire({
                icon: 'success',
                title: 'Logged In',
                text: `Logged in with ${provider.providerId.split('.')[0]}!`,
                timer: 2000,
                showConfirmButton: false,
            });
            navigate(routes.home);
        } catch (err) {
            setError(err.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message,
            });
        }
    };

    return (
        <div className="space-y-4">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <button
                onClick={handleLogin}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
            >
                Login
            </button>
            <div className="flex space-x-2">
                <button
                    onClick={() => handleOAuthLogin(googleProvider)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                >
                    Google
                </button>
                <button
                    onClick={() => handleOAuthLogin(FacebookAuthProvider)}
                    className="flex-1 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                >
                    Facebook
                </button>
                <button
                    onClick={() => handleOAuthLogin(githubProvider)}
                    className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                >
                    GitHub
                </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default Login;
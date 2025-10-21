import { useNavigate } from 'react-router-dom';
import image404 from '../assets/404.svg';

export default function NotFound() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <img src={image404} alt="404 Not Found" className="w-2/3 max-w-xl mb-6" />
            <h1 className="text-3xl font-bold text-gray-700 mb-4">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-8">Sorry, the page you are looking for does not exist.</p>
            <button onClick={handleGoBack} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
                Go Back
            </button>
        </div>
    );
}

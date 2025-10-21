import { useNavigate } from 'react-router-dom';
import { routes } from '../routes';
import Swal from 'sweetalert2';
import { auth } from '../../firebaseConfig';

const UserDashboard = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;

    const handleLogout = async () => {
        Swal.fire({
            title: 'Logout?',
            text: 'Are you sure you want to logout?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, logout',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await auth.signOut();
                    Swal.fire({
                        icon: 'success',
                        title: 'Logged Out',
                        text: 'You have been logged out successfully',
                        timer: 2000,
                        showConfirmButton: false,
                    });
                    navigate(routes.authentication);
                } catch (err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to logout',
                    });
                }
            }
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">✓</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">User Dashboard</h1>
                        <p className="text-slate-600 break-all">{user?.email || 'User'}</p>
                    </div>
                    <button
                        onClick={() => navigate(routes.home)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 mb-2"
                    >
                        Go to Home
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
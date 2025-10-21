import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { routes, routeComponents } from './routes';
import { useEffect, useState } from 'react';
import { auth, getUserRole } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRole = await getUserRole(currentUser.uid);
        setRole(userRole);
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Routes>
        <Route path={routes.home} element={user ? <routeComponents.home.element /> : <routeComponents.authentication.element />} />
        <Route path={routes.authentication} element={user ? <routeComponents.home.element /> : <routeComponents.authentication.element />} />
        <Route
          path={routes.dashboard.user}
          element={
            <ProtectedRoute user={user} role={role} requiredRole="user">
              <routeComponents.dashboard.user.element />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.dashboard.admin}
          element={
            <ProtectedRoute user={user} role={role} requiredRole="admin">
              <routeComponents.dashboard.admin.element />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<routeComponents.notFound.element />} />
      </Routes>
    </div>
  );
};

export default App;
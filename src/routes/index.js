import Home from '../pages/Home';
import Authentication from '../pages/Authentication';
import NotFound from '../pages/NotFound';
import UserDashboard from '../pages/UserDashboard';
import AdminDashboard from '../pages/AdminDashboard';

export const routes = {
  home: '/',
  authentication: '/authentication',
  dashboard: {
    user: '/dashboard/user',
    admin: '/dashboard/admin',
  },
  notFound: '*',
};

export const routeComponents = {
  home: { element: Home },
  authentication: { element: Authentication },
  dashboard: {
    user: { element: UserDashboard },
    admin: { element: AdminDashboard },
  },
  notFound: { element: NotFound },
};
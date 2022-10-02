import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import HomeLayout from './sos/layouts';
import CartLayout from './sos/layouts/CartLayout';
import ProductCollectionLayout from './sos/layouts/ProductCollectionLayout';
import ProductDetailLayout from './sos/layouts/ProductDetailLayout';
import PurchaseLayout from './sos/layouts/PurchaseLayout';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <HomeLayout />,
      children: [
        { path: '/', element: <Navigate to="/products" /> },
        {
          path: '/products', element: <ProductCollectionLayout />,
          children: [
            { path: ':id', element: <ProductDetailLayout /> },
          ]
        },
        { path: '/cart', element: <CartLayout /> },
        { path: '/purchase', element: <PurchaseLayout /> },
        { path: '/404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}

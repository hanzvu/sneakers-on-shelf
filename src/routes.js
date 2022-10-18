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
import PurchaseDetailLayout from './sos/layouts/PurchaseDetailLayout';
import LoginLayout from './sos/layouts/LoginLayout';
import AccountLayout from './sos/layouts/AccountLayout';
import AccountProfileInfo from './sos/components/account/AccountProfileInfo';
import AccountAddress from './sos/components/account/AccountAddress';
import AccountChangePassword from './sos/components/account/AccountChangePassword';
import AccountPurchase from './sos/components/account/AccountPurchase';

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
      path: 'register',
      element: <Register />,
    },
    {
      element: <HomeLayout />,
      children: [
        {
          path: '',
          children: [
            { path: '', element: <Navigate to="/products" /> },
            { path: 'login', element: <LoginLayout /> },
          ],
        },
        {
          path: 'products',
          children: [
            { path: '', element: <ProductCollectionLayout /> },
            { path: ':id', element: <ProductDetailLayout /> },
          ]
        },
        { path: 'cart', element: <CartLayout /> },
        {
          path: 'purchase',
          children: [
            { path: '', element: <PurchaseLayout /> },
            { path: ':id', element: <PurchaseDetailLayout /> }
          ],
        },
        {
          path: 'account',
          element: <AccountLayout />,
          children: [
            { path: '', element: <AccountProfileInfo /> },
            { path: 'purchase', element: <AccountPurchase /> },
            { path: 'address', element: <AccountAddress /> },
            { path: 'change-password', element: <AccountChangePassword /> },
          ]
        },
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

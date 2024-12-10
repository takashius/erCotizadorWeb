import Layout from './components/Layout'
import Error404 from './pages/Error404'
import Home from './pages/Home'
import Settings from './pages/Settings'
import Users from './pages/Users'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RecoverPassword from './pages/auth/RecoverPassword'
import RecoveryStep2 from './pages/auth/RecoveryStep2'
import QuotationDetails from './pages/QuotationDetails'
import ClientList from './pages/ClientList'
import ProductList from './pages/ProductList'

export const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error404 />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/settings', element: <Settings /> },
      { path: '/users', element: <Users /> },
      { path: '/quotation/:id', element: <QuotationDetails /> },
      { path: '/clients', element: <ClientList /> },
      { path: '/products', element: <ProductList /> },
    ]
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/recover-password',
    element: <RecoverPassword />,
  },
  {
    path: '/recover-password/step2',
    element: <RecoveryStep2 />,
  }
]

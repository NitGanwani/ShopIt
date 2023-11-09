import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
// import "bootstrap/dist/css/bootstrap.min.css";
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import reportWebVitals from './reportWebVitals';
import ProfileScreen from './screens/ProfileScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen></HomeScreen>} />
      <Route path="/product/:id" element={<ProductScreen></ProductScreen>} />
      <Route path="/cart" element={<CartScreen></CartScreen>} />
      <Route path="/login" element={<LoginScreen></LoginScreen>} />
      <Route path="/register" element={<RegisterScreen></RegisterScreen>} />

      <Route path="" element={<PrivateRoute></PrivateRoute>}>
        <Route path="/shipping" element={<ShippingScreen></ShippingScreen>} />
        <Route path="/payment" element={<PaymentScreen></PaymentScreen>} />
        <Route
          path="/placeorder"
          element={<PlaceOrderScreen></PlaceOrderScreen>}
        />
        <Route path="/order/:id" element={<OrderScreen></OrderScreen>} />
        <Route path="/profile" element={<ProfileScreen></ProfileScreen>} />
      </Route>

      <Route path="" element={<AdminRoute></AdminRoute>}>
        <Route
          path="/admin/orderlist"
          element={<OrderListScreen></OrderListScreen>}
        />
      </Route>
      <Route
        path="/admin/productslist"
        element={<ProductListScreen></ProductListScreen>}
      />
      <Route
        path="/admin/product/:id/edit"
        element={<ProductEditScreen></ProductEditScreen>}
      />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={false}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

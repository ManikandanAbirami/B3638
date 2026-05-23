import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import MyOrders from './pages/MyOrders'
import AdminDashboard from './pages/AdminDashboard'
import AdminOrders from './pages/AdminOrders'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/cart" element={<ProtectedRoute allowedRoles={['customer']}>
          <Cart />
        </ProtectedRoute>
        } />
        <Route path="/my-orders" element={<ProtectedRoute allowedRoles={['customer']}>
          <MyOrders />
        </ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute allowedRoles={['admin']}>
          <AdminOrders />
        </ProtectedRoute>} />

      </Routes>
    </>
  )
}

export default App

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import RealtyDetail from '../pages/Realty/RealtyDetail';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import BookingList from '../pages/Bookings/BookingList';
import CreateBooking from '../pages/Bookings/CreateBooking';
import BookingDetail from '../pages/Bookings/BookingDetail';
import Profile from '../pages/Profile'; // Убедитесь, что этот путь правильный
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/realty/:id" element={<RealtyDetail />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/bookings/new" element={<CreateBooking />} />
        <Route path="/bookings/:id" element={<BookingDetail />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

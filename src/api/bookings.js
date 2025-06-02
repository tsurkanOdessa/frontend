import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/reserve/';

const getBookings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const createBooking = async (bookingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, bookingData, config);
  return response.data;
};

const updateBooking = async (id, bookingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}${id}/`, bookingData, config);
  return response.data;
};

const deleteBooking = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}${id}/`, config);
  return response.data;
};

const getBookingDetail = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}${id}/`, config);
  return response.data;
};

const cancelBooking = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(`${API_URL}${id}/`, { status: 'cancelled' }, config);
  return response.data;
};

const bookingsAPI = {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingDetail,
  cancelBooking,
};

export default bookingsAPI;
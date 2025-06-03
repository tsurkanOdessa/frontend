import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/user/';

const register = async (userData) => {
  const response = await axios.post(`${API_URL}register/`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}login/`, userData);
  print(`${API_URL}login/`)
  if (response.data.access) {
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const refreshToken = async () => {
  const refresh = localStorage.getItem('refreshToken');
  const response = await axios.post(`${API_URL}token/refresh/`, { refresh });
  if (response.data.access) {
    localStorage.setItem('accessToken', response.data.access);
  }
  return response.data;
};

const getUserProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}profile/`, config);
  return response.data;
};

const updateUserProfile = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
        console.log('userData:', userData);
  const response = await axios.patch(`${API_URL}profile/`, userData, config);
  return response.data;
};

export default {
  register,
  login,
  logout,
  refreshToken,
  getUserProfile,
  updateUserProfile,
};
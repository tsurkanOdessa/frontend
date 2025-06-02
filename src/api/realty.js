import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/realty/';

const getRealtyList = async () => {
    const defaultParams = {
    is_active: true,
  };
  //const response = await axios.get(API_URL);
  const response = await axios.get(API_URL, {
    params: {
      ...defaultParams,
    },
  });
  return response.data;
};

const getRealtyDetail = async (id) => {
  const response = await axios.get(`${API_URL}${id}/`);
  return response.data;
};

const createRealty = async (realtyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, realtyData, config);
  return response.data;
};

const updateRealty = async (id, realtyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}${id}/`, realtyData, config);
  return response.data;
};

const deleteRealty = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}${id}/`, config);
  return response.data;
};

const realtyAPI = {
  getRealtyList,
  getRealtyDetail,
  createRealty,
  updateRealty,
  deleteRealty,
};

export default realtyAPI;
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/realty/';

const getRealtyList = async () => {

  const defaultParams = {
    is_active: true,
  };
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: defaultParams,
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};


const getRealtyDetail = async (id) => {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
   //console.error('Ошибка загрузки:', id);
   //console.error('Ошибка загрузки:', `${API_URL}${id}/`);
   //console.error('Ошибка загрузки:', config);
  const response = await axios.get(`${API_URL}${id}/`, config); // <--- вот здесь добавлен config
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
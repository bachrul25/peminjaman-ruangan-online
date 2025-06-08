import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const loginUser = async (data) => {
  try {
    const response = await API.post("/login", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (data) => {
  try {
    const response = await API.post('/register', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
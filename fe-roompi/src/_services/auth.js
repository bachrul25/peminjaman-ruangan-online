import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const loginUser = async (data) => {
  try {
    const response = await API.post("/login", data);
    return response.data;
  } catch (error) {
    console.log("Error during login:", error);
    throw error;
  }
};

export const registerUser = async (data) => {
  try {
    const response = await API.post('/register', data);
    return response.data;
  } catch (error) {
    console.log("Error during registration:", error);
    throw error;
  }
};

export const logout = ({token}) => {
  try {
    const { data } = API.post('/logout', { token }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    localStorage.removeItem("token");
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
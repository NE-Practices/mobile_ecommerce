import _ from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create an axios instance
export const axios = _.create({
  baseURL: "http://10.12.74.2:8000",
  timeout: 5000, // 5 seconds
});

// Set the token dynamically for each request
axios.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;

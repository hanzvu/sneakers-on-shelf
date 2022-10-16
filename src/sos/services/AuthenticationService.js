import axios from "axios";
import { BASE_API } from "./ApplicationConstant";

export const authenticatedRequest = async (instance) => {
    await instance.interceptors.response.use((response) => response, async (error) => {
        const originalRequest = error.config;
        const user = getAuthenticatedUser();
        if (error.response.status === 403 && !originalRequest._retry && user != null) {
            originalRequest._retry = true;
            try {
                const response = await refreshToken(user.refreshToken);
                originalRequest.headers.Authorization = `${response.data.type} ${response.data.token}`;
                return instance(originalRequest);
            } catch (error) {
                logout();
            }
        }
        return Promise.reject(error);
    });
}

export const login = async (email, password) => {
    const response = await axios.post(`${BASE_API}/api/v1/tokens/signin`, { email, password });
    localStorage.setItem("user", JSON.stringify(response.data));
    axios.defaults.headers.Authorization = `${response.data.type} ${response.data.token}`;
}

export const refreshToken = async (token) => {
    const response = await axios.post(`${BASE_API}/api/v1/tokens/refresh`, token, {
        headers: {
            'Content-Type': 'text/plain'
        }
    });
    localStorage.setItem("user", JSON.stringify(response.data));
    axios.defaults.headers.Authorization = `${response.data.type} ${response.data.token}`;
    return response;
}

export const getAuthenticatedUser = () => JSON.parse(localStorage.getItem('user'));

export const logout = () => {
    localStorage.removeItem("user");
}
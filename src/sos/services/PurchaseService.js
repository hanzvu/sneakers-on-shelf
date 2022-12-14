import axios from "axios";
import { BASE_API } from "./ApplicationConstant";

export const getAnonymousPurchase = async (id, token) => {
    const instance = axios.create({
        method: 'get',
        baseURL: `${BASE_API}/api/v1/purchases/${id}`,
    });
    instance.defaults.headers.token = token;
    const response = await instance.request();
    return response.data;
}

export const getPurchase = async (id) => {
    const response = await axios.get(`${BASE_API}/api/v1/purchases/${id}`);
    return response.data;
}

export const getPurchaseByAccountId = async (id, params) => {
    const response = await axios.get(`${BASE_API}/api/v1/accounts/${id}/purchases`, { params });
    return response.data;
}

export const getAnonymousPayUrl = async (id, token) => {
    const instance = axios.create({
        method: 'get',
        baseURL: `${BASE_API}/api/v1/purchases/${id}/pay-url`,
    });
    instance.defaults.headers.token = token;
    const response = await instance.request();
    return response.data;
}

export const getPayUrl = async (id) => {
    const response = await axios.get(`${BASE_API}/api/v1/purchases/${id}/pay-url`);
    return response.data;
}
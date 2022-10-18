import axios from "axios";
import { BASE_API } from "./ApplicationConstant";

const getAnonymousPurchase = async (id, token) => {
    const instance = axios.create({
        method: 'get',
        baseURL: `${BASE_API}/api/v1/purchases/${id}`,
    });
    instance.defaults.headers.token = token;
    const response = await instance.request();
    return response.data;
}

const getPurchase = async (id) => {
    const response = await axios.get(`${BASE_API}/api/v1/purchases/${id}`);
    return response.data;
}

export { getAnonymousPurchase, getPurchase }
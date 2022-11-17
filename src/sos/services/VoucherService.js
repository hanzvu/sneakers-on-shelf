import axios from "axios"
import { BASE_API } from "./ApplicationConstant"

export const findVouchers = async (params) => {
    const response = await axios.get(`${BASE_API}/api/v1/vouchers`, { params });
    return response.data;
}

export const findAvailableVouchers = async (params) => {
    const response = await axios.get(`${BASE_API}/api/v1/vouchers/available`, { params });
    return response.data;
}
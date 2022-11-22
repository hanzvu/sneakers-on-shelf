import axios from "axios";
import { BASE_API } from "./ApplicationConstant";

const addRate = async (id, score, comment) => {
    const response = await axios.post(`${BASE_API}/api/v1/order-items/${id}/rates`, {
        score: `${score}`,
        comment: `${comment}`,
    });
    return response.data;
}

const findRatesByProductID = async (id, params) => {
    const response = await axios.get(`${BASE_API}/api/v1/products/${id}/rates`, { params })
    return response.data;
}

export { addRate, findRatesByProductID }
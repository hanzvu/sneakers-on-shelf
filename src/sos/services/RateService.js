import axios from "axios";
import { BASE_API } from "./ApplicationConstant";

const addRate = async (id, score, comment) => {
    axios.post(`${BASE_API}/api/v1/order-items/${id}/rates`, {
        score: `${score}`,
        comment: `${comment}`,
    }).then(res => {
        console.log(res.data);      
    }).catch(error => {
        console.log(error);
    })     
}

const findRatesByProductID = async (id) => {
    const response = await axios.get(`${BASE_API}/content/v1/rate/${id}`)
    return response;
}

export { addRate, findRatesByProductID }
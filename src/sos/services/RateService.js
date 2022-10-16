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
    const rates = await axios.get(`${BASE_API}/api/v1/product-details/${id}/rates`)
    return rates;
}

export { addRate, findRatesByProductID }
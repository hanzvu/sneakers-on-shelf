import axios from "axios"
import { clearAccount, setAccount } from "../redux/accountSlice";
import store from '../redux/store';
import { BASE_API } from "./ApplicationConstant"
import { getAuthenticatedUser } from "./AuthenticationService";

export const fetchAccount = async () => {
    const auth = getAuthenticatedUser()
    if (auth != null) {
        const response = await axios.get(`${BASE_API}/api/v1/accounts/${auth.id}`);
        const memberOfferPolicyResponse = await axios.get(`${BASE_API}/api/v1/accounts/${auth.id}/member-offer-policy`);
        store.dispatch(setAccount({ ...response.data, memberOfferPolicy : memberOfferPolicyResponse.data }));
    }
}

export const updateAccountInfo = async (id, data) => {
    const response = await axios.put(`${BASE_API}/api/v1/accounts/${id}/info`, data);
    return response;
}

export const updateAccountPassword = async (id, data) => {
    const response = await axios.put(`${BASE_API}/api/v1/accounts/${id}/password`, data);
    return response;
}

export const forgotPassword = async (data) => {
    const response = await axios.put(`${BASE_API}/api/v1/accounts/reset-password`, data);
    return response;
}


export const getAddresses = async (id) => {
    const response = await axios.get(`${BASE_API}/api/v1/accounts/${id}/customer-infos`);
    return response.data;
}

export const createAddress = async (data) => {
    const response = await axios.post(`${BASE_API}/api/v1/customer-infos`, data);
    return response.data;
}

export const setDefaultAddress = async (id) => {
    const response = await axios.put(`${BASE_API}/api/v1/customer-infos/${id}/set-default`);
    return response.data;
}

export const deactiveAddress = async (id) => {
    const response = await axios.put(`${BASE_API}/api/v1/customer-infos/${id}/deactive`);
    return response.data;
}

export const logoutAccount = () => {
    store.dispatch(clearAccount())
}
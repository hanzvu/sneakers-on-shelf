import axios from "axios"
import { clearAccount, setAccount } from "../redux/accountSlice";
import store from '../redux/store';
import { BASE_API } from "./ApplicationConstant"
import { getAuthenticatedUser } from "./AuthenticationService";

export const fetchAccount = async () => {
    const auth = getAuthenticatedUser()
    if (auth != null) {
        const response = await axios.get(`${BASE_API}/api/v1/accounts/${auth.id}`);
        store.dispatch(setAccount(response.data));
    }
}

export const getAddresses = async (id) => {
    const response = await axios.get(`${BASE_API}/api/v1/accounts/${id}/customer-infos`);
    return response.data;
}

export const logoutAccount = () => {
    store.dispatch(clearAccount())
}
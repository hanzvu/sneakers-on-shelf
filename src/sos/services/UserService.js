import axios from "axios"
import store from '../redux/store';
import { clearUser, setUser } from "../redux/userSlice";
import { BASE_API } from "./ApplicationConstant"
import { authenticatedRequest, getAuthenticatedUser } from "./AuthenticationService";

export const fetchUser = async () => {
    const loggedUser = getAuthenticatedUser();
    if (loggedUser != null) {
        const instance = axios.create({
            baseURL: `${BASE_API}/api/v1/accounts/${loggedUser.id}`,
            method: 'GET',
        });
        await authenticatedRequest(instance);
        try {
            const response = await instance.request();
            store.dispatch(setUser(response.data));
        } catch (error) {
            if (error.response && error.response.data.status === 403) {
                store.dispatch(clearUser());
            }
        }
    }
}
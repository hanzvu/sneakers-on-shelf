import axios from "axios";
import { removeCart, setCart } from "../redux/cartSlice";
import store from '../redux/store';
import { BASE_API } from "./ApplicationConstant";
import { getAuthenticatedUser } from "./AuthenticationService";
import { showSnackbar } from "./NotificationService";


const fetchCart = async () => {
    const cart = await getOrCreateCart();
    axios.get(`${BASE_API}/api/v1/cart/${cart.id}`).then(response => {
        store.dispatch(setCart(response.data))
    })
}

const submitCart = async (customerInfo, paymentMethod, email = null) => {
    const cart = await getOrCreateCart();
    const response = await axios.post(`${BASE_API}/api/v1/cart/${cart.id}/submit`, {
        customer_info: customerInfo,
        payment_method: paymentMethod,
        email
    });
    return response.data;
}

const addToCart = async (productId, quantity = 1) => {
    const cart = await getOrCreateCart();
    try {
        await axios.post(`${BASE_API}/api/v1/cart/${cart.id}/items`, null, {
            params: {
                product_detail_id: productId,
                quantity
            }
        });

        await fetchCart();
        showSnackbar("Đã thêm sản phẩm vào giỏ hàng.");
    } catch (error) {
        if (error.response != null && error.response.status === 400) {
            showSnackbar(error.response.data, "error");
        } else {
            clearCart()
        }
        throw new Error("Sản phẩm tạm hết hàng.");
    }
}

const setCartItemQuantity = async (cartItemId, quantity = 1) => {
    axios.put(`${BASE_API}/api/v1/cart/items/${cartItemId}`, null, {
        params: {
            quantity
        }
    }).then(() => {
        fetchCart();
    }).catch(error => {
        if (error.response != null && error.response.status === 400) {
            showSnackbar(error.response.data, "error");
        } else {
            clearCart()
        }
    })
}

const removeFromCart = async (cartItemId) => {
    const cart = await getOrCreateCart();

    const instance = axios.create({
        method: 'delete',
        baseURL: `${BASE_API}/api/v1/cart/items/${cartItemId}`,
    });

    if (cart.token) {
        instance.defaults.headers.token = cart.token;
    }

    axios.delete(`${BASE_API}/api/v1/cart/items/${cartItemId}`).then(() => {
        fetchCart()
    }).catch(error => {
        if (error.response != null && error.response.status === 400) {
            showSnackbar(error.response.data, "error");
        } else {
            clearCart()
        }
    })
}

const getOrCreateCart = async () => {
    const state = store.getState();
    const cart = { ...state.cart.cart };

    if (cart.id == null) {
        const auth = getAuthenticatedUser()
        if (auth != null) {
            const cart = await requestCart();
            return cart;
        }

        const storageCart = getCartFromLocalStorage();
        if (storageCart != null) {
            try {
                const cart = await requestAnonymousCart(storageCart.id, storageCart.token);
                return cart;
            } catch (error) {
                removeCartFromLocalStorage();
            }
        }

        const response = await axios.get(`${BASE_API}/api/v1/cart/anonymous`);
        setCartFromLocalStorage(response.data);
        return response.data;
    }
    return cart;
}

const requestCart = async () => {
    const response = await axios.get(`${BASE_API}/api/v1/cart`);
    return response.data;
}

const requestAnonymousCart = async (id, token) => {
    const response = await axios.get(`${BASE_API}/api/v1/cart/${id}`, {
        headers: {
            token
        }
    });
    return response.data;
}

const clearCart = () => {
    store.dispatch(removeCart());
    removeCartFromLocalStorage();
}

const setCartFromLocalStorage = (cart) => {
    window.localStorage.setItem('cart', JSON.stringify(cart));
}

const getCartFromLocalStorage = () => {
    try {
        return JSON.parse(window.localStorage.getItem('cart'))
    } catch (error) {
        removeCartFromLocalStorage();
    }
}

const removeCartFromLocalStorage = () => {
    window.localStorage.removeItem('cart');
}

export { submitCart, addToCart, setCartItemQuantity, removeFromCart, fetchCart, clearCart, getCartFromLocalStorage }
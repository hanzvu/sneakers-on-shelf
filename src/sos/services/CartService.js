import axios from "axios";
import { removeCart, setCart } from "../redux/cartSlice";
import store from '../redux/store';
import { BASE_API } from "./ApplicationConstant";


const fetchCart = async () => {
    const cart = await getOrCreateCart();
    axios.get(`${BASE_API}/content/v1/cart/${cart.id}`, {
        params: {
            user_token_query: cart.userTokenQuery
        }
    }).then(response => {
        store.dispatch(setCart(response.data))
    })
}

const addToCart = async (productId) => {
    const cart = await getOrCreateCart();
    axios.post(`${BASE_API}/content/v1/cart/${cart.id}/items`, null, {
        params: {
            product_id: productId,
            user_token_query: cart.userTokenQuery
        }
    }).then(response => {
        fetchCart()
    }).catch(error => {
        console.log(error);
        clearCart();
    })
}

const getOrCreateCart = async () => {
    const state = store.getState();
    const cart = { ...state.cart.cart };

    if (cart.id == null) {
        console.log("cart in store null");

        const storageCart = getCartFromLocalStorage();

        if (storageCart != null) {
            console.log("cart in storage : ");
            console.log(storageCart);
            try {
                const cart = await requestCart(storageCart.id, storageCart.userTokenQuery);
                console.log("request cart");
                return cart;
            } catch (error) {
                removeCartFromLocalStorage();
            }
        }

        const response = await axios.get(`${BASE_API}/content/v1/cart`);
        setCartFromLocalStorage(response.data);
        return response.data;
    }
    return cart;
}

const requestCart = async (id, token) => {
    const response = await axios.get(`${BASE_API}/content/v1/cart/${id}`, {
        params: {
            user_token_query: token
        }
    });
    return response.data;
}

const clearCart = () => {
    store.dispatch(removeCart());
    removeCartFromLocalStorage();
}

const setCartFromLocalStorage = (cart) => {
    return window.localStorage.setItem('cart', JSON.stringify(cart));
}

const getCartFromLocalStorage = () => {
    try {
        return JSON.parse(window.localStorage.getItem('cart'))
    } catch (error) {
        removeCartFromLocalStorage();
    }
    return null;
}

const removeCartFromLocalStorage = () => {
    return window.localStorage.removeItem('cart');
}

export { addToCart, fetchCart }
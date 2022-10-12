import axios from "axios";
import { removeCart, setCart } from "../redux/cartSlice";
import store from '../redux/store';
import { BASE_API } from "./ApplicationConstant";
import { showSnackbar } from "./NotificationService";


const fetchCart = async () => {
    const cart = await getOrCreateCart();
    axios.get(`${BASE_API}/content/v1/cart/${cart.id}`, {
        headers: {
            user_token_query: cart.userTokenQuery
        }
    }).then(response => {
        store.dispatch(setCart(response.data))
    })
}

const submitCart = async (customerInfo, paymentMethod) => {
    const cart = await getOrCreateCart();
    const response = await axios.post(`${BASE_API}/content/v1/cart/${cart.id}/submit`,
        {
            customer_info: customerInfo,
            payment_method: paymentMethod
        },
        {
            headers: {
                user_token_query: cart.userTokenQuery
            }
        });
    return response.data;
}

const addToCart = async (productId, quantity = 1) => {
    const cart = await getOrCreateCart();
    try {
        await axios.post(`${BASE_API}/content/v1/cart/${cart.id}/items`, null, {
            params: {
                product_id: productId,
                quantity
            },
            headers: {
                user_token_query: cart.userTokenQuery
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
    const cart = await getOrCreateCart();
    await axios.put(`${BASE_API}/content/v1/cart/items/${cartItemId}`, null, {
        params: {
            quantity
        },
        headers: {
            user_token_query: cart.userTokenQuery
        }
    }).catch(error => {
        if (error.response != null && error.response.status === 400) {
            showSnackbar(error.response.data, "error");
        } else {
            clearCart()
        }
    }).finally(() => {
        fetchCart();
    })
}

const removeFromCart = async (productId) => {
    const cart = await getOrCreateCart();

    axios.delete(`${BASE_API}/content/v1/cart/items/${productId}`, {
        headers: {
            user_token_query: cart.userTokenQuery
        }
    }).then(response => {
        fetchCart()
    }).catch(error => {
        clearCart();
    })
}

const deleteCart = async () => {
    store.dispatch(removeCart())
    removeCartFromLocalStorage()
}

const getOrCreateCart = async () => {
    const state = store.getState();
    const cart = { ...state.cart.cart };

    if (cart.id == null) {
        const storageCart = getCartFromLocalStorage();
        if (storageCart != null) {
            try {
                const cart = await requestCart(storageCart.id, storageCart.userTokenQuery);
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
        headers: {
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
    window.localStorage.setItem('cart', JSON.stringify(cart));
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
    window.localStorage.removeItem('cart');
}

export { submitCart, addToCart, setCartItemQuantity, removeFromCart, deleteCart, fetchCart }
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchAccount } from "../../services/AccountService";
import { setAuthentication } from "../../services/AuthenticationService";
import { clearCart, fetchCart } from "../../services/CartService";

export default function OAuthRedirected() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (searchParams.get("token") != null) {
            setAuthentication({
                id: parseInt(searchParams.get("id"), 10),
                token: searchParams.get("token"),
                type: searchParams.get("type"),
                refreshToken: searchParams.get("refresh_token")
            });
        }
        navigate('/', { replace: true });
    }, []);
    return null;
}
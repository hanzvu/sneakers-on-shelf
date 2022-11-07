import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NotifyModal from "../components/common/Modal";
import MySnackbar from "../components/common/MySnackbar";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { fetchAccount } from "../services/AccountService";
import { addAuthenticationInterceptor } from "../services/AuthenticationService";
import { fetchCart } from "../services/CartService";

export default function HomeLayout() {


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            addAuthenticationInterceptor();
            await fetchAccount();
            await fetchCart();
            setLoading(false);
        }
        fetchData();
    }, [])

    if (loading) {
        return null;
    }

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
            <NotifyModal />
            <MySnackbar />
        </>
    );
}

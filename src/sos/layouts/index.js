import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import NotifyModal from "../components/common/Modal";
import MySnackbar from "../components/common/MySnackbar";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { fetchCart } from "../services/CartService";

export default function HomeLayout() {

    useEffect(() => {
        fetchCart();
    }, [])

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

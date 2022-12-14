import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import MessengerCustomerChat from "react-messenger-customer-chat/lib/MessengerCustomerChat";
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
            try {
                await fetchAccount();
                await fetchCart();
            } catch (error) {
                console.log(error);
            }
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
            <Box sx={{ minHeight: '30vw' }}>
                <Outlet />
            </Box>
            <Footer />
            <NotifyModal />
            <MySnackbar />
            <MessengerCustomerChat
                pageId="104561945824804"
                appId="863335941768634" 
                />
        </>
    );
}

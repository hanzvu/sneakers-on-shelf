import { Box, Button, Paper, Stack } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { showSnackbar } from "../../services/NotificationService";
import { createAddress, fetchAccount, getAddresses } from "../../services/AccountService";
import AccountAddressContainer from "./AccountAddressContainer";
import AccountAddressForm from "./AccountAddressForm";

export default function AccountAddress() {

    const account = useSelector(state => state.account.account);

    const [addresses, setAddresses] = useState();

    const addressFormInput = useRef({
        province: null,
        district: null,
        ward: null,
        fullname: null,
        phone: null,
        address: null,
        email: null
    })

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAddresses(account.id);
            setAddresses(data);
            addressFormInput.current.account = {
                id: account.id
            }
        }
        if (account.id == null) {
            return;
        }
        fetchData();
    }, [account])

    const handleAddAddress = async () => {
        if (addressFormInput.current.province == null || addressFormInput.current.district == null || addressFormInput.current.ward == null) {
            showSnackbar("Bạn chưa chọn xong địa chỉ.", "warning")
        }

        const customerInfo = {
            account: {
                id: account.id
            },
            fullname: addressFormInput.current.fullname,
            phone: addressFormInput.current.phone,
            address: addressFormInput.current.address,
            provinceId: addressFormInput.current.province.ProvinceID,
            provinceName: addressFormInput.current.province.ProvinceName,
            districtId: addressFormInput.current.district.DistrictID,
            districtName: addressFormInput.current.district.DistrictName,
            wardCode: addressFormInput.current.ward.WardCode,
            wardName: addressFormInput.current.ward.WardName,
        }

        try {
            await createAddress(customerInfo);
            fetchAccount();
        } catch (error) {
            if (error.response != null && error.response.status === 400) {
                showSnackbar(error.response.data, "error");
            } else {
                showSnackbar("Có lỗi xảy ra, hãy thử lại sau.", "error");
            }
        }
    }

    return (<>
        <Stack spacing={3}>
            {addresses && <AccountAddressContainer addresses={addresses} id={account.customerInfo.id} />}
            <Paper elevation={3} square>
                <Box p={3}>
                    <AccountAddressForm addressFormInput={addressFormInput} />
                    <Box display={"flex"} justifyContent={"flex-end"} pt={3}>
                        <Button variant="contained" onClick={handleAddAddress}>Thêm Địa Chỉ</Button>
                    </Box>
                </Box>
            </Paper>

        </Stack>
    </>)
}
import { Box, Button, Paper, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { showSnackbar } from "../../services/NotificationService";
import { createAddress, fetchAccount, getAddresses } from "../../services/AccountService";
import AccountAddressContainer from "./AccountAddressContainer";
import AccountAddressForm from "./AccountAddressForm";

export default function AccountAddress() {

    const account = useSelector(state => state.account.account);

    const [addresses, setAddresses] = useState();

    const [addressFormInput, setAddressFormInput] = useState({
        province: null,
        district: null,
        ward: null,
        fullname: '',
        phone: '',
        address: '',
        email: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAddresses(account.id);
            setAddresses(data);
            addressFormInput.account = {
                id: account.id
            }
        }
        if (account.id == null) {
            return;
        }
        fetchData();
    }, [account])

    const handleAddAddress = async () => {
        if (addressFormInput.province == null || addressFormInput.district == null || addressFormInput.ward == null) {
            showSnackbar("Bạn chưa chọn xong địa chỉ.", "warning")
        }

        const customerInfo = {
            account: {
                id: account.id
            },
            fullname: addressFormInput.fullname,
            phone: addressFormInput.phone,
            address: addressFormInput.address,
            provinceId: addressFormInput.province.ProvinceID,
            provinceName: addressFormInput.province.ProvinceName,
            districtId: addressFormInput.district.DistrictID,
            districtName: addressFormInput.district.DistrictName,
            wardCode: addressFormInput.ward.WardCode,
            wardName: addressFormInput.ward.WardName,
        }

        try {
            await createAddress(customerInfo);
            fetchAccount();
            setAddressFormInput({
                province: null,
                district: null,
                ward: null,
                fullname: '',
                phone: '',
                address: '',
                email: ''
            });
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
            {addresses && <AccountAddressContainer addresses={addresses} id={account.customerInfo ? account.customerInfo.id : null} />}
            <Paper elevation={3} square>
                <Box p={3}>
                    <AccountAddressForm addressFormInput={addressFormInput} setAddressFormInput={setAddressFormInput} />
                    <Box display={"flex"} justifyContent={"flex-end"} pt={3}>
                        <Button variant="contained" onClick={handleAddAddress}>Thêm Địa Chỉ</Button>
                    </Box>
                </Box>
            </Paper>

        </Stack>
    </>)
}
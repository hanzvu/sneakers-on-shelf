import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Collapse, Container, FormControl, FormControlLabel, Grid, ListItemIcon, Radio, RadioGroup, Stack, styled, Switch, Typography } from "@mui/material";
import { getDeliveryInfo } from "../../services/DeliveryService";

import { fCurrency } from "../../../utils/formatNumber";
import Iconify from "../../../components/Iconify";
import { clearCart, submitCart } from "../../services/CartService";
import { formatDate } from "../../utils/DateUtil";
import { showSnackbar } from "../../services/NotificationService";
import AccountAddressForm from "../account/AccountAddressForm";
import { createAddress, getAddresses } from "../../services/AccountService";

const ListItemIconStyle = styled(ListItemIcon)({
    width: 22,
    height: 22,
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export default function CartOrderForm({ id, total, token }) {

    const account = useSelector(state => state.account.account);

    const [delivery, setDelivery] = useState({ fee: 0, leadtime: null })

    const [payment, setPayment] = useState("COD")

    const [customerInfos, setCustomerInfos] = useState()

    const [checked, setChecked] = useState(account.id == null);

    const [selectedCustomerInfo, setSelectedCustomerInfo] = useState();

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAddresses(account.id);
            setCustomerInfos(data);
            setChecked(false);
            handleSelectAddress(account.customerInfo)
        }
        if (account.id == null) {
            setChecked(true)
            return;
        }
        fetchData();
    }, [account])

    const addressFormInput = useRef({
        id: null,
        province: null,
        district: null,
        ward: null,
        fullname: null,
        phone: null,
        address: null,
        email: null
    })

    const handleSubmit = event => {
        event.preventDefault();
        if (total === 0) {
            showSnackbar("Chưa có mặt hàng nào trong giỏ.", "warning")
            return;
        }

        if (token != null) {
            if (addressFormInput.current.province == null || addressFormInput.current.district == null || addressFormInput.current.ward == null) {
                showSnackbar("Bạn chưa chọn xong địa chỉ.", "warning")
                return;
            }

            const customerInfo = {
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

            submitCart(customerInfo, payment, addressFormInput.current.email).then(res => {
                console.log(res);
                let navigateModel = { pathname: `/purchase/${res}` }
                if (token) {
                    navigateModel = { ...navigateModel, search: `?token=${token}` }
                }
                navigate(navigateModel)
                showSnackbar("Đặt hàng thành công.")
                clearCart()
            }).catch(error => {
                if (error.response && error.response.status === 400) {
                    showSnackbar(error.response.data, "error")
                } else {
                    showSnackbar("Có lỗi xảy ra, hãy thử lại sau.", "error")
                }
            })
        } else if (selectedCustomerInfo) {

            const customerInfo = {
                id: selectedCustomerInfo
            }

            submitCart(customerInfo, payment, null).then(res => {
                navigate({ pathname: `/purchase/${res}` })
                showSnackbar("Đặt hàng thành công.")
                clearCart()
            }).catch(error => {
                if (error.response && error.response.status === 400) {
                    showSnackbar(error.response.data, "error")
                } else {
                    showSnackbar("Có lỗi xảy ra, hãy thử lại sau.", "error")
                }
            })
        }
    }

    const handleChangeCollapse = () => {
        setChecked((prev) => !prev);
    };

    const handleAddAddress = async () => {
        const customerInfo = {
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
            const data = await createAddress(customerInfo);
            const rs = await getAddresses(account.id);
            setCustomerInfos(rs);
            resetCustomerInfoInput();
            setChecked(false);
            handleSelectAddress(data)
        } catch (error) {
            if (error.response && error.response.status === 400) {
                showSnackbar(error.response.data, "error")
            } else {
                showSnackbar("Có lỗi xảy ra, hãy thử lại sau.", "error")
            }
        }
    }

    const handleAddressSelectDone = () => {
        getDeliveryInfo(id, addressFormInput.current.district.DistrictID, addressFormInput.current.ward.WardCode).then(response => setDelivery(response))
    }

    const handleSelectAddress = (address) => {
        setSelectedCustomerInfo(address.id)
        getDeliveryInfo(id, address.districtId, address.wardCode).then(response => setDelivery(response))
    }

    const resetCustomerInfoInput = () => {
        addressFormInput.current = {
            province: null,
            district: null,
            ward: null,
            fullname: null,
            phone: null,
            address: null,
            email: null
        }
    }

    return (<>
        <Box>
            <form onSubmit={handleSubmit}>
                <div className="m-0 py-2 border-bottom fw-bold">THÔNG TIN NHẬN HÀNG</div>
                <Grid container spacing={6} paddingTop={3} alignItems={"start"}>
                    <Grid container item md={8}>
                        {customerInfos &&
                            <Container disableGutters>
                                <Stack spacing={1} py={2}>
                                    {customerInfos.map(address =>
                                        <Grid container key={address.id} className="border-bottom">
                                            <Grid item lg={8} xs={12}>
                                                <Stack>
                                                    <Typography variant="h6" gutterBottom>
                                                        {address.fullname}
                                                    </Typography>
                                                    <Typography variant="body1" gutterBottom>
                                                        {address.phone}
                                                    </Typography>
                                                    <Typography variant="subtitle2" gutterBottom>
                                                        {`${address.address}, ${address.wardName}, ${address.districtName}, ${address.provinceName}`}
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item container lg={4} xs={12} justifyContent={"center"} alignItems={"center"}>
                                                <Stack direction="row" spacing={2}>
                                                    {
                                                        address.id !== selectedCustomerInfo &&
                                                        <Button variant="contained" onClick={() => { handleSelectAddress(address) }}>Chọn Địa Chỉ</Button>
                                                    }

                                                    {
                                                        address.id === selectedCustomerInfo &&
                                                        <Button variant="outlined" color="error">Địa Chỉ Nhận Hàng</Button>
                                                    }
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    )}
                                    <FormControlLabel onChange={handleChangeCollapse} control={<Switch />} label="Thêm địa chỉ" />
                                </Stack>
                            </Container>

                        }
                        <Container disableGutters>
                            <Collapse in={checked}>
                                <AccountAddressForm addressFormInput={addressFormInput} handleDone={handleAddressSelectDone} haveEmail={account.id == null} />
                                {account.id &&
                                    <Box display={"flex"} justifyContent={"flex-end"} pt={3}>
                                        <Button onClick={handleAddAddress} variant="contained">Thêm Địa Chỉ</Button>
                                    </Box>
                                }
                            </Collapse>
                        </Container>
                        <Grid item xs={12} pt={3} alignItems={"center"}>
                            {
                                delivery.leadtime &&
                                <Box className="d-flex align-items-center pb-3">
                                    <ListItemIconStyle><Iconify icon={"carbon:delivery"} width={30} height={30} /></ListItemIconStyle>
                                    <Typography
                                        component="span"
                                        variant="h6" textAlign={"end"}>
                                        Thời gian nhận hàng dự kiến : {formatDate(new Date(delivery.leadtime * 1000))}
                                    </Typography>
                                </Box>
                            }
                        </Grid>

                    </Grid>

                    <Grid item container md={4}>
                        <Stack>
                            <Box className="d-flex align-items-center pb-3">
                                <ListItemIconStyle><Iconify icon={"eva:shopping-bag-fill"} width={30} height={30} /></ListItemIconStyle>
                                <Typography variant="h4">
                                    Phương Thức Thanh Toán
                                </Typography>
                            </Box>
                            <FormControl className="ps-3">
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="1"
                                    name="radio-buttons-group"
                                    value={payment}
                                    onChange={e => setPayment(e.target.value)}>
                                    <FormControlLabel value="COD" control={<Radio />} label="Thanh toán khi nhận hàng" />
                                    <FormControlLabel value="BANKING" control={<Radio />} label="Thanh toán bằng chuyển khoản" />
                                </RadioGroup>
                            </FormControl>
                        </Stack>

                        <Grid container item xs={12} spacing={1} pt={3}>
                            <Grid container item xs={12}>
                                <div className="col-6 ps-3">Tiền Hàng</div>
                                <div className="col-6 d-flex justify-content-end"><span>{fCurrency(total)}</span></div>
                            </Grid>
                            <Grid container item xs={12}>
                                <div className="col-6 ps-3">Phí vận chuyển</div>
                                <div className="col-6 d-flex justify-content-end"><span>{fCurrency(delivery.fee)}</span></div>
                            </Grid>
                            <Grid container item xs={12}>
                                <div className="col-6 ps-3">Giảm giá</div>
                                <div className="col-6 d-flex justify-content-end"><span>{fCurrency(0)}</span></div>
                            </Grid>
                            <Grid container pt={1} item xs={12}>
                                <div className="col-6 ps-3 fw-bold">Tổng số tiền</div>
                                <div className="col-6 d-flex justify-content-end"><span className="text-danger fw-bold">{fCurrency(total + delivery.fee)}</span></div>
                            </Grid>

                            <Grid container item xs={12} justifyContent={"end"}>
                                <div className="pt-2 px-lg-0">
                                    <button type="submit" className="btn btn-dark shadow-none rounded-0 border-dark float-end">
                                        Xác Nhận Đặt Hàng
                                    </button>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Box>
    </>)
}
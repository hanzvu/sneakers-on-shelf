import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Collapse, Container, Grid, ListItemIcon, Stack, styled, TextField, Typography } from "@mui/material";
import { getDeliveryInfo } from "../../services/DeliveryService";

import { fCurrency } from "../../../utils/formatNumber";
import Iconify from "../../../components/Iconify";
import { clearCart, submitCart } from "../../services/CartService";
import { formatDate } from "../../utils/DateUtil";
import { showSnackbar } from "../../services/NotificationService";
import AccountAddressForm from "../account/AccountAddressForm";
import CartCustomerInfoSelector from "./CartCustomerInfoSelector";
import VoucherSelector from "./VoucherSelector";

const ListItemIconStyle = styled(ListItemIcon)({
    width: 22,
    height: 22,
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export default function CartOrderForm({ id, total, token, memberOfferPolicy }) {

    const account = useSelector(state => state.account.account);

    const [delivery, setDelivery] = useState({ fee: 0, leadtime: null })

    const [voucher, setVoucher] = useState({ discount: 0 });

    const [selectedCustomerInfo, setSelectedCustomerInfo] = useState(account.customerInfo);

    const navigate = useNavigate()

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
        if (selectedCustomerInfo) {
            handleSelectedAddress(selectedCustomerInfo);
        } else if (addressFormInput.province && addressFormInput.district && addressFormInput.ward) {
            handleSelectedAddress({ districtId: addressFormInput.district.DistrictID, ward: addressFormInput.ward.wardCode });
        }
    }, [total])

    const handleSelectedAddress = ({ districtId, wardCode }) => {
        getDeliveryInfo(id, districtId, wardCode).then(response => setDelivery(response))
    }

    const handleSelectCustomerInfo = data => {
        setSelectedCustomerInfo(data);
        handleSelectedAddress(data);
    }

    const handleSelectVoucher = data => {
        if (data.voucherType === "PERCENT") {
            if (data.amount <= 0 || data.amount > 100) {
                showSnackbar("C?? l???i x???y ra, h??y th??? l???i sau")
                return;
            }
            const d = total * data.amount / 100;
            const rs = d >= data.maxValue ? data.maxValue : d;
            setVoucher({ ...voucher, data, discount: rs >= total ? total : rs })
        } else {
            setVoucher({ ...voucher, data, discount: data.amount > total ? total : data.amount })
        }
    }

    const handleSubmitCart = (event) => {
        event.preventDefault();
        const selectedVoucher = voucher.data ? { id: voucher.data.id } : null;

        if (selectedCustomerInfo) {
            submitCart({
                customerInfo: selectedCustomerInfo,
                voucher: selectedVoucher
            }).then(data => {
                navigate(`/purchase/${data.id}`)
                clearCart();
            }).catch(error => {
                if (error.response && error.response.status === 400) {
                    showSnackbar(error.response.data, 'error')
                } else {
                    showSnackbar('C?? l???i x???y ra, h??y th??? l???i sau.', 'error')
                }
            });
        } else {
            if (addressFormInput.province == null || addressFormInput.district == null || addressFormInput.ward == null || addressFormInput.address.trim().length === 0) {
                showSnackbar("B???n ch??a ch???n xong ?????a ch???.", "warning")
                return;
            }

            if (account.id == null && addressFormInput.email.trim().length === 0) {
                showSnackbar("B???n ch??a nh???p email.", "warning")
                return;
            }

            if (addressFormInput.phone.trim().length === 0) {
                showSnackbar("B???n ch??a nh???p s??? ??i???n tho???i.", "warning")
                return;
            }

            const customerInfo = {
                fullname: addressFormInput.fullname,
                phone: addressFormInput.phone,
                address: addressFormInput.address,
                provinceId: addressFormInput.province.ProvinceID,
                provinceName: addressFormInput.province.ProvinceName,
                districtId: addressFormInput.district.DistrictID,
                districtName: addressFormInput.district.DistrictName,
                wardCode: addressFormInput.ward.WardCode,
                wardName: addressFormInput.ward.WardName
            }

            submitCart({
                customerInfo,
                email: addressFormInput.email,
                voucher: selectedVoucher
            }).then(data => {
                const navigateModel = { pathname: `/purchase/${data.id}` }
                navigate(token ? { ...navigateModel, search: `?token=${token}` } : navigateModel);
                clearCart();
            }).catch(error => {
                if (error.response && error.response.status === 400) {
                    showSnackbar(error.response.data, 'error')
                } else {
                    showSnackbar('C?? l???i x???y ra, h??y th??? l???i sau.', 'error')
                }
            });
        }
    }

    const calculateTotal = (total, fee, discount, offer) => {
        const rs = total + fee - discount - total * offer / 100;
        return rs > 0 ? rs : 0;
    }

    return (<>
        <Box>
            <form onSubmit={handleSubmitCart}>
                <Box borderBottom={1} borderColor={"grey.500"}>
                    <Stack direction={"row"} spacing={3} py={1}>
                        <Typography variant="h5">
                            ?????A CH??? NH???N H??NG
                        </Typography>
                    </Stack>
                </Box>
                <Grid container spacing={6} paddingTop={3} alignItems={"start"}>
                    <Grid container item md={8}>
                        <Container disableGutters>
                            <Collapse in={selectedCustomerInfo != null}>
                                <Stack spacing={1} py={2}>
                                    {
                                        selectedCustomerInfo &&
                                        <Grid container className="border-bottom">
                                            <Stack>
                                                <Typography variant="h6" gutterBottom>
                                                    {selectedCustomerInfo.fullname}
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    {selectedCustomerInfo.phone}
                                                </Typography>
                                                <Typography variant="subtitle2" gutterBottom>
                                                    {`${selectedCustomerInfo.address}, ${selectedCustomerInfo.wardName}, ${selectedCustomerInfo.districtName}, ${selectedCustomerInfo.provinceName}`}
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                    }
                                </Stack>
                            </Collapse>
                        </Container>

                        <Container disableGutters>
                            <Collapse in={selectedCustomerInfo == null}>
                                <AccountAddressForm handleSelectedAddress={handleSelectedAddress} addressFormInput={addressFormInput} setAddressFormInput={setAddressFormInput} haveEmail={account.id == null} />
                            </Collapse>
                        </Container>

                        <Stack spacing={1} pt={2} direction="row">
                            <CartCustomerInfoSelector account={account} handleSelectCustomerInfo={handleSelectCustomerInfo} />
                            <Button hidden={selectedCustomerInfo == null} variant="outlined" color="error" onClick={() => { setSelectedCustomerInfo(null); setDelivery({ fee: 0, leadtime: null }) }}>Th??m M???i</Button>
                        </Stack>

                        <Grid item xs={12} pt={3} alignItems={"center"}>
                            {
                                delivery.leadtime &&
                                <Box className="d-flex align-items-center pb-3">
                                    <ListItemIconStyle><Iconify icon={"carbon:delivery"} width={30} height={30} /></ListItemIconStyle>
                                    <Typography
                                        component="span"
                                        variant="h6" textAlign={"end"}>
                                        Th???i gian nh???n h??ng d??? ki???n : {formatDate(new Date(delivery.leadtime * 1000))}
                                    </Typography>
                                </Box>
                            }
                        </Grid>
                    </Grid>

                    <Grid item container md={4}>
                        <Stack spacing={3}>
                            <Box className="d-flex align-items-center">
                                <ListItemIconStyle><Iconify icon={"eva:shopping-bag-fill"} width={30} height={30} /></ListItemIconStyle>
                                <Typography variant="h4">
                                    Th??ng Tin Thanh To??n
                                </Typography>
                            </Box>
                            <Grid item container spacing={1}>
                                <Stack direction={"row"} spacing={1} justifyContent={"center"}>
                                    <TextField variant="outlined" size="small" value={(voucher.data && voucher.data.code) || ''} inputProps={{ readOnly: true, }} label="M?? Gi???m Gi??" />
                                    <VoucherSelector value={total} handleSelectVoucher={handleSelectVoucher} />
                                </Stack>
                            </Grid>

                            <Grid item container >
                                <Grid item container xs={6}>
                                    <Typography variant="body1">
                                        Ti???n H??ng
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} container justifyContent={"flex-end"}>
                                    <Typography variant="body1">
                                        {fCurrency(total)}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item container >
                                <Grid item container xs={6}>
                                    <Typography variant="body1">
                                        Ph?? V???n Chuy???n
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} container justifyContent={"flex-end"}>
                                    <Typography variant="body1">
                                        {fCurrency(delivery.fee)}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item container >
                                <Grid item container xs={6}>
                                    <Typography variant="body1">
                                        Gi???m Gi??
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} container justifyContent={"flex-end"}>
                                    <Typography variant="body1">
                                        {fCurrency(voucher.discount)}
                                    </Typography>
                                </Grid>
                            </Grid>

                            {
                                memberOfferPolicy != null && memberOfferPolicy.offer > 0 &&
                                <Grid item container >
                                    <Grid item container xs={8}>
                                        <Typography variant="body1">
                                            Quy???n L???i Th??nh Vi??n {memberOfferPolicy.memberRank.description} ({memberOfferPolicy.offer}%)
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} container justifyContent={"flex-end"}>
                                        <Typography variant="body1">
                                            {fCurrency((total * memberOfferPolicy.offer / 100))}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            }

                            <Grid item container >
                                <Grid item container xs={6}>
                                    <Typography sx={{ fontWeight: 'bold' }} >
                                        T???ng S??? Ti???n
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} container justifyContent={"flex-end"}>
                                    <Typography sx={{ fontWeight: 'bold' }} color="error">
                                        {
                                            fCurrency(calculateTotal(total, delivery.fee, voucher.discount, memberOfferPolicy ? memberOfferPolicy.offer : 0))
                                        }
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container item justifyContent={"end"}>
                                <div className="pt-2 px-lg-0">
                                    <button type="submit" className="btn btn-dark shadow-none rounded-0 border-dark float-end">
                                        X??c Nh???n ?????t H??ng
                                    </button>
                                </div>
                            </Grid>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Box>
    </>)
}
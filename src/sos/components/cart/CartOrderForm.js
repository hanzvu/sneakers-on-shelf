import { Box, FormControl, FormControlLabel, Grid, ListItemIcon, Radio, RadioGroup, Stack, styled, Typography } from "@mui/material";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { fCurrency } from "../../../utils/formatNumber";
import Iconify from "../../../components/Iconify";
import CartOrderInput from "./CartOrderInput";
import DistrictSelector from "./DistrictSelector";
import ProvinceSelector from "./ProvinceSelector";
import WardSelector from "./WardSelector";
import { getDeliveryInfo } from "../../services/DeliveryService";
import { deleteCart, submitCart } from "../../services/CartService";
import { formatDate } from "../../utils/DateUtil";
import { showSnackbar } from "../../services/NotificationService";

const ListItemIconStyle = styled(ListItemIcon)({
    width: 22,
    height: 22,
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export default function CartOrderForm({ id, total }) {

    const [delivery, setDelivery] = useState({ fee: 0, leadtime: null })

    const [payment, setPayment] = useState("COD")

    const navigate = useNavigate()

    const ghnAddress = useRef({
        province: null,
        district: null,
        ward: null,
        fullname: null,
        phone: null,
        address: null
    })

    const setProvince = province => {
        ghnAddress.current.province = province;
        ghnAddress.current.district = null;
        ghnAddress.current.ward = null;
        setDelivery({ fee: 0, leadtime: null })
    }

    const setDistrict = district => {
        ghnAddress.current.district = district;
        ghnAddress.current.ward = null;
        setDelivery({ fee: 0, leadtime: null })
    }

    const setWard = ward => {
        ghnAddress.current.ward = ward;
        getDeliveryInfo(id, ghnAddress.current.district.DistrictID, ghnAddress.current.ward.WardCode).then(response => setDelivery(response))
    }

    const setGHNFullname = fullname => {
        ghnAddress.current.fullname = fullname;
    }

    const setGHNPhone = phone => {
        ghnAddress.current.phone = phone;
    }

    const setGHNAddress = address => {
        ghnAddress.current.address = address;
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (ghnAddress.current.province == null || ghnAddress.current.district == null || ghnAddress.current.ward == null) {
            showSnackbar("Bạn chưa chọn xong địa chỉ.", "warning")
            return;
        }

        if (total === 0) {
            showSnackbar("Chưa có mặt hàng nào trong giỏ.", "warning")
            return;
        }

        const customerInfo = {
            fullname: ghnAddress.current.fullname,
            phone: ghnAddress.current.phone,
            address: ghnAddress.current.address,
            provinceId: ghnAddress.current.province.ProvinceID,
            provinceName: ghnAddress.current.province.ProvinceName,
            districtId: ghnAddress.current.district.DistrictID,
            districtName: ghnAddress.current.district.DistrictName,
            wardCode: ghnAddress.current.ward.WardCode,
            wardName: ghnAddress.current.ward.WardName,
        }

        submitCart(customerInfo, payment).then(res => {
            console.log(res);
            navigate({
                pathname: `/purchase/${id}`,
                search: `?token=${res}`
            })
            showSnackbar("Đặt hàng thành công.")
            deleteCart()
        }).catch(error => {
            console.log(error);
            showSnackbar("Có lỗi xảy ra, hãy thử lại sau.", "error")
        })
    }

    return (<>
        <Box>
            <form onSubmit={handleSubmit}>
                <div className="m-0 py-2 border-bottom fw-bold">THÔNG TIN NHẬN HÀNG</div>
                <Grid container spacing={6} paddingTop={3} alignItems={"start"}>
                    <Grid container item md={8}>
                        <CartOrderInput setGHNFullname={setGHNFullname} setGHNPhone={setGHNPhone} setGHNAddress={setGHNAddress} />

                        <Grid pt={3} container spacing={1}>
                            <Grid item md={4} xs={12}>
                                <ProvinceSelector setProvince={setProvince} />
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <DistrictSelector setDistrict={setDistrict} />
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <WardSelector setWard={setWard} />
                            </Grid>
                        </Grid>
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
                                    onChange={e => setPayment(e.target.value)}
                                >
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
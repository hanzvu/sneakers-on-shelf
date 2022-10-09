import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { formatDatetime } from "../../utils/DateUtil";
import { fCurrency } from "../../../utils/formatNumber";
import { getPurchase } from "../../services/PurchaseService";
import OrderItem from "./OrderItem";

export default function PurchaseDetail() {

    const [data, setData] = useState();

    const params = useParams();

    const [searchParams] = useSearchParams();


    useEffect(() => {
        getPurchase(params.id, searchParams.get("token")).then(data => {
            console.log(data);
            setData(data)
        })
        searchParams.delete("token")
    }, [params])

    if (data == null) {
        return null;
    }

    return (<>
        <Stack spacing={2}>
            <Paper elevation={3} square>
                {
                    data.delivery &&
                    <Box p={{ xs: 1, md: 3 }}>
                        <Box borderBottom={1} borderColor={"grey.500"}>
                            <Typography variant="h5" gutterBottom>
                                GIAO HÀNG
                            </Typography>
                        </Box>
                        <Box pt={3}>
                            <div className="col-sm-10">
                                <div className="row m-0 py-2">
                                    <div className="col-4">Trạng Thái</div>
                                    <div className="col-8">{data.delivery.deliveryStatus.description}</div>
                                </div>
                                <div className="row m-0 py-2">
                                    <div className="col-4">Cập Nhật Lúc</div>
                                    <div className="col-8">{formatDatetime(new Date(data.delivery.updateDate))}</div>
                                </div>
                                <div className="row m-0 py-2">
                                    <div className="col-4">Chi tiết</div>
                                    <div className="col-8"><a className="link-info" href={`https://donhang.ghn.vn/?order_code=${data.delivery.parcelTrackingId}`}>Kiểm tra</a></div>
                                </div>
                            </div>
                        </Box>
                    </Box>
                }

            </Paper>

            <Paper elevation={3} square>
                <Box p={{ xs: 1, md: 3 }}>
                    <Box borderBottom={1} borderColor={"grey.500"}>
                        <Typography variant="h5" gutterBottom>
                            THANH TOÁN
                        </Typography>
                    </Box>
                    <Box pt={3}>
                        <div className="col-sm-10">
                            <div className="row m-0 py-2">
                                <div className="col-4">Trạng thái thanh toán</div>
                                <div className="col-8">{data.paymentStatus.description}</div>
                            </div>
                            <div className="row m-0 py-2">
                                <div className="col-4">Phương thức thanh toán</div>
                                <div className="col-8">{data.paymentMethod.description}</div>
                            </div>
                            {
                                data.paymentQRCode &&
                                <div className="row m-0 py-2">
                                    <div className="col-4">Mã QR thanh toán</div>
                                    <div className="col-8"><img alt="qr" src={data.paymentQRCode} /></div>
                                </div>
                            }
                        </div>
                    </Box>
                </Box>
            </Paper>

            <Paper elevation={3} square>
                <Box p={{ xs: 1, md: 3 }}>
                    <Box borderBottom={1} borderColor={"grey.500"}>
                        <Typography variant="h5" gutterBottom>
                            ĐỊA CHỈ NHẬN HÀNG
                        </Typography>
                    </Box>
                    <Box pt={3}>
                        <div className="col-sm-10">
                            <div className="row m-0 py-2">
                                <div className="col-4">
                                    Họ và tên
                                </div>
                                <div className="col-8">{data.customerInfo.fullname}</div>
                            </div>
                            <div className="row m-0 py-2">
                                <div className="col-4">Số điện thoại</div>
                                <div className="col-8">{data.customerInfo.phone}</div>
                            </div>
                            <div className="row m-0 py-2">
                                <div className="col-4">Địa chỉ</div>
                                <div className="col-8">{`${data.customerInfo.address}, ${data.customerInfo.wardName}, ${data.customerInfo.districtName}, ${data.customerInfo.provinceName}`}</div>
                            </div>
                        </div>
                    </Box>
                </Box>
            </Paper>

            <Paper elevation={3} square>
                <Box p={{ xs: 1, md: 3 }}>
                    <Box>
                        {data.items.map(item => (<OrderItem key={item.id} orderItem={item} />))}
                    </Box>
                    <Grid container spacing={1} pt={3} justifyContent={"flex-end"}>
                        <Grid item md={4} xs={12}>
                            <div className="row justify-content-center">
                                <div className="col-6">Tiền Hàng</div>
                                <div className="col-6 d-flex justify-content-end">{fCurrency(data.total)}</div>
                            </div>
                            {
                                data.delivery &&
                                <div className="row justify-content-center">
                                    <div className="col-6">Phí vận chuyển</div>
                                    <div className="col-6 d-flex justify-content-end">{fCurrency(data.delivery.fee)}</div>
                                </div>
                            }

                            <div className="row justify-content-center">
                                <div className="col-6">Giảm giá</div>
                                <div className="col-6 d-flex justify-content-end">{fCurrency(data.discount)}</div>
                            </div>

                            <div className="row justify-content-center pt-1">
                                <div className="col-6 fw-bold">Tổng số tiền</div>
                                <div className="col-6 d-flex justify-content-end"><span className="text-danger fw-bold">{fCurrency(data.total + (data.delivery != null ? data.delivery.fee : 0) - data.discount)}</span></div>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Stack>

    </>)
}
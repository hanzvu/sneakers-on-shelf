import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Box, Button, Chip, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline'
import * as Icons from "react-icons/fa";
import Scrollbar from "../../../components/Scrollbar";
import { fCurrency } from "../../../utils/formatNumber";
import { getAnonymousPayUrl, getAnonymousPurchase, getPayUrl, getPurchase } from "../../services/PurchaseService";
import OrderItem from "./OrderItem";
import PaymentQRCodeDialog from "./PaymentQRCodeDialog";
import { showSnackbar } from "../../services/NotificationService";

export default function PurchaseDetail() {

    const [data, setData] = useState();

    const params = useParams();

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (params.id == null) {
            return;
        }
        if (searchParams.get("token")) {
            getAnonymousPurchase(params.id, searchParams.get("token")).then(data => {
                setData(data);
            })
        } else {
            getPurchase(params.id).then(data => {
                setData(data)
            })
        }
    }, [params])

    const onSuccessRating = () => {
        getPurchase(params.id).then(data => {
            setData(data)
        });
    }

    const handlePaymentWithMomo = () => {
        if (searchParams.get("token")) {
            getAnonymousPayUrl(params.id, searchParams.get("token")).then(data => {
                window.location.replace(data)
            }).catch((error) => {
                console.log(error);
                showSnackbar('Hệ thống đang bận, hãy thử lại sau.', 'error')
            })
        } else {
            getPayUrl(params.id).then(data => {
                window.location.replace(data);
            }).catch(() => {
                showSnackbar('Hệ thống đang bận, hãy thử lại sau.', 'error')
            })
        }
    }

    if (data == null) {
        return null;
    }

    return (<>
        <Stack spacing={2}>
            {
                data.timelines &&
                <Paper elevation={3} square>
                    <Box p={{ xs: 1, md: 3 }}>
                        <Scrollbar>
                            <Box display={"inline-block"}>
                                <Timeline minEvents={6} variant={"default"} placeholder>
                                    {
                                        data.timelines.map(timeline => (
                                            <TimelineEvent
                                                key={timeline.id}
                                                color={timeline.orderTimelineType.color}
                                                icon={Icons[timeline.orderTimelineType.icon]}
                                                title={timeline.orderTimelineType.title}
                                                subtitle={new Date(timeline.createdDate).toLocaleString()} />
                                        ))}
                                </Timeline>
                            </Box>
                        </Scrollbar>
                    </Box>
                </Paper>
            }

            <Paper elevation={3} square>
                <Box p={{ xs: 1, md: 3 }}>
                    <Box borderBottom={1} borderColor={"grey.500"}>
                        <Typography variant="h5" gutterBottom>
                            THÔNG TIN ĐƠN HÀNG
                        </Typography>
                    </Box>

                    <Grid pt={3} pl={3} container item xs={12}>
                        <Grid container item xs={6}>
                            <Grid item xs={12}>
                                <Stack spacing={2} >
                                    <Grid item container >
                                        <Grid item container xs={4} alignItems={"center"}>
                                            <Typography variant="subtitle1">
                                                Trạng Thái
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Chip label={data.orderStatus.description} color={data.orderStatus.color} />
                                        </Grid>
                                    </Grid>
                                    <Grid item container >
                                        <Grid item container xs={4} alignItems={"center"}>
                                            <Typography variant="subtitle1">
                                                Loại
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Chip label={data.saleMethod.description} color={data.saleMethod.color} />
                                        </Grid>
                                    </Grid>
                                    <Grid item container >
                                        <Grid item container xs={4} alignItems={"center"}>
                                            <Typography variant="subtitle1">
                                                Mã Đơn Hàng
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant="body1">
                                                {data.id}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Grid item container xs={6}>
                            <Grid item xs={12}>
                                <Stack spacing={2}>
                                    <Grid container item>
                                        <Grid item container xs={4} alignItems={"center"}>
                                            <Typography variant="subtitle1">
                                                Họ Và Tên
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant="body1">
                                                {data.fullname}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    {
                                        data.phone &&
                                        <Grid container item>
                                            <Grid item container xs={4} alignItems={"center"}>
                                                <Typography variant="subtitle1">
                                                    Số Điện Thoại
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography variant="body1">
                                                    {data.phone}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    }
                                    {
                                        data.email &&
                                        <Grid container item>
                                            <Grid item container xs={4} alignItems={"center"}>
                                                <Typography variant="subtitle1">
                                                    Email
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography variant="body1">
                                                    {data.email}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    }
                                    {
                                        data.address &&
                                        <Grid container >
                                            <Grid item container xs={4} alignItems={"center"}>
                                                <Typography variant="subtitle1">
                                                    Địa Chỉ
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography variant="body1">
                                                    {`${data.detailedAddress}, ${data.address}`}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    }
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            <Paper elevation={3} square>
                <Box p={{ xs: 1, md: 3 }}>
                    <Box borderBottom={1} borderColor={"grey.500"}>
                        <Grid container justifyContent={"space-between"} pb={1} alignItems="center">
                            <Grid item xs={7}>
                                <Typography variant="h5">
                                    LỊCH SỬ THANH TOÁN
                                </Typography>
                            </Grid>
                            <Grid item xs={5} container justifyContent={"flex-end"}>
                                <Stack spacing={2} direction={"row"}>
                                    <Button variant="contained" color="secondary" size="medium" onClick={handlePaymentWithMomo}>
                                        Thanh Toán Bằng Momo
                                    </Button>
                                    {
                                        data.paymentQRCode &&
                                        <PaymentQRCodeDialog paymentQRCode={data.paymentQRCode} />
                                    }
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                    {
                        data.transactions.length > 0 &&
                        <Scrollbar>
                            <TableContainer sx={{ minWidth: 800 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Số Tiền</TableCell>
                                            <TableCell align="center">Thời Gian</TableCell>
                                            <TableCell align="center">Loại Giao Dịch</TableCell>
                                            <TableCell align="center">Phương Thức Thanh Toán</TableCell>
                                            <TableCell align="center">Trạng Thái</TableCell>
                                            <TableCell align="center">Nhân Viên Xác Nhận</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {
                                            data.transactions.map(transaction => (
                                                <TableRow hover tabIndex={-1} key={transaction.id}>
                                                    <TableCell align="center">
                                                        <Typography variant="body2" flexWrap color={"crimson"}>
                                                            {fCurrency(transaction.amount)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Typography variant="body2" flexWrap>
                                                            {new Date(transaction.createDate).toLocaleString()}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Typography variant="body2" flexWrap>
                                                            <Chip label={transaction.transactionType.description} color={transaction.transactionType.color} />
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Typography variant="body2" flexWrap>
                                                            <Chip label={transaction.paymentMethod.description} color={transaction.paymentMethod.color} />
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Chip label={transaction.transactionStatus.description} color={transaction.transactionStatus.color} />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Typography variant="body2" flexWrap>
                                                            {transaction.staff}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Scrollbar>
                    }
                    {
                        data.transactions.length === 0 &&
                        <Typography variant="body1" pt={2} color={"dimgrey"}>
                            Không Có Dữ Liệu
                        </Typography>
                    }
                </Box>

            </Paper>

            <Paper elevation={3} square>
                <Box p={{ xs: 1, md: 3 }}>
                    <Box>
                        {data.items.map(item => (<OrderItem key={item.id} orderItem={item} isApproved={data.token == null && data.orderStatus.name === "APPROVED"} onSuccessRating={onSuccessRating} />))}
                    </Box>
                    <Grid container spacing={1} pt={3} justifyContent={"flex-end"}>
                        <Grid item md={4} xs={12}>
                            <Stack spacing={1}>
                                <Grid item container >
                                    <Grid item container xs={6}>
                                        <Typography variant="body2" color={"dimgrey"}>
                                            Tiền Hàng
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} container justifyContent={"flex-end"}>
                                        <Typography variant="body1">
                                            {fCurrency(data.total)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container >
                                    <Grid item container xs={6}>
                                        <Typography variant="body2" color={"dimgrey"}>
                                            Phí vận chuyển
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} container justifyContent={"flex-end"}>
                                        <Typography variant="body1">
                                            {fCurrency(data.fee)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container >
                                    <Grid item container xs={6}>
                                        <Typography variant="body2" color={"dimgrey"}>
                                            Giảm Giá
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} container justifyContent={"flex-end"}>
                                        <Typography variant="body1">
                                            {fCurrency(data.discount)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                {
                                    data.memberOffer > 0 &&
                                    <Grid item container >
                                        <Grid item container xs={6}>
                                            <Typography variant="body2" color={"dimgrey"}>
                                                Quyền lợi thành viên
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} container justifyContent={"flex-end"}>
                                            <Typography variant="body1">
                                                {fCurrency(data.memberOffer)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                }
                                {
                                    data.refund > 0 &&
                                    <Grid item container >
                                        <Grid item container xs={6}>
                                            <Typography variant="body2" color={"dimgrey"}>
                                                Trả hàng
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} container justifyContent={"flex-end"}>
                                            <Typography variant="body1">
                                                {fCurrency(data.refund)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                }
                                <Grid item container >
                                    <Grid item container xs={6}>
                                        <Typography variant="subtitle2" >
                                            Tổng Số Tiền
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} container justifyContent={"flex-end"}>
                                        <Typography sx={{ fontWeight: 'bold' }} color="crimson">
                                            {fCurrency(data.total + data.fee - data.discount - data.memberOffer - data.refund)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Stack>

    </>)
}
import { Box, CardMedia, Grid, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline'
import * as Icons from "react-icons/fa";
import { fCurrency } from "../../../utils/formatNumber";
import { getAnonymousPurchase, getPurchase } from "../../services/PurchaseService";
import OrderItem from "./OrderItem";

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
                console.log(data);
                setData(data);
            })
        } else {
            getPurchase(params.id).then(data => {
                console.log(data);
                setData(data)
            })
        }
        searchParams.delete("token")
    }, [params])

    if (data == null) {
        return null;
    }

    return (<>
        <Stack spacing={2}>
            {
                data.timelines &&
                <Paper elevation={3} square>
                    <Box p={{ xs: 1, md: 3 }}>
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
                </Paper>
            }

            <Paper elevation={3} square>
                <Box p={{ xs: 1, md: 3 }}>
                    <Box borderBottom={1} borderColor={"grey.500"}>
                        <Typography variant="h5" gutterBottom>
                            THÔNG TIN ĐƠN HÀNG
                        </Typography>
                    </Box>
                    <Stack spacing={3} pt={3} pl={3}>
                        <Grid container >
                            <Grid item container xs={4} alignItems={"center"}>
                                <Typography variant="body1">
                                    Trạng Thái
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1">
                                    {data.orderStatus.description}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item container xs={4} alignItems={"center"}>
                                <Typography variant="body1">
                                    Mã Đơn Hàng
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1">
                                    {data.id}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item container xs={4} alignItems={"center"}>
                                <Typography variant="body1">
                                    Thời Gian Đặt
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1">
                                    {new Date(data.createDate).toLocaleString()}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item container xs={4} alignItems={"center"}>
                                <Typography variant="body1">
                                    Họ Và Tên
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1">
                                    {data.fullname}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item container xs={4} alignItems={"center"}>
                                <Typography variant="body1">
                                    Số Điện Thoại
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1">
                                    {data.phone}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item container xs={4} alignItems={"center"}>
                                <Typography variant="body1">
                                    Email
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1">
                                    {data.email}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item container xs={4} alignItems={"center"}>
                                <Typography variant="body1">
                                    Địa Chỉ
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1">
                                    {`${data.detailedAddress}, ${data.address}`}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Stack>
                </Box>
            </Paper>

            <Paper elevation={3} square>
                <Box p={{ xs: 1, md: 3 }}>
                    <Box>
                        {data.items.map(item => (<OrderItem key={item.id} orderItem={item} idPurchase={data.id} userTokenQuery={data.token} />))}
                    </Box>
                    <Grid container spacing={1} pt={3} justifyContent={"flex-end"}>
                        <Grid item md={4} xs={12}>
                            <Stack spacing={1}>
                                <Grid item container >
                                    <Grid item container xs={6}>
                                        <Typography variant="body1">
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
                                        <Typography variant="body1">
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
                                        <Typography variant="body1">
                                            Giảm Giá
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} container justifyContent={"flex-end"}>
                                        <Typography variant="body1">
                                            {fCurrency(data.discount)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container >
                                    <Grid item container xs={6}>
                                        <Typography sx={{ fontWeight: 'bold' }} >
                                            Tổng Số Tiền
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} container justifyContent={"flex-end"}>
                                        <Typography sx={{ fontWeight: 'bold' }} color="error">
                                            {fCurrency(data.total + data.fee - data.discount)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            {
                data.paymentQRCode &&
                <Paper elevation={3} square>
                    <Box p={{ xs: 1, md: 3 }}>
                        <Grid container justifyContent={"center"}>
                            <Grid item md={5} xs={12}>
                                <CardMedia component="img" image={data.paymentQRCode} alt="green iguana" />
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            }
        </Stack>

    </>)
}
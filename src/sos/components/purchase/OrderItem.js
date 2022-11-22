import { useState } from 'react';

import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Box, Button, Grid, Rating, Stack, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { fCurrency } from '../../../utils/formatNumber';
import { showSnackbar } from '../../services/NotificationService';
import { addRate } from '../../services/RateService';

const labels = {
    1: "Tệ",
    2: "Không hài lòng",
    3: "Bình thường",
    4: "Hài lòng",
    5: "Tuyệt vời"
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}
export default function OrderItem({ orderItem, isApproved, onSuccessRating }) {

    const { id, quantity, productId, name, size, image, price } = orderItem;

    const [rate, setRate] = useState({ score: null, comment: '' })

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        if (rate.score == null) {
            showSnackbar("Bạn chưa chọn số sao đánh giá.", "warning");
            return;
        }

        addRate(id, rate.score, rate.comment).then(data => {
            onSuccessRating(data);
        }).catch(error => {
            if (error.response && error.response.status === 400) {
                showSnackbar(error.response.data, "error");
            } else {
                showSnackbar("Có lỗi xảy ra, hãy thử lại sau.", "error");
            }
        });
    }

    return (<>
        <Grid container className="border-bottom">
            <Grid container item lg={8}>
                <Grid item lg={3} xs={4}>
                    <Link to={`/products/${productId}`}><img src={image} className="img-fluid" alt="product" /></Link>
                </Grid>
                <Grid item xs={8} container alignItems={"center"}>
                    <Stack spacing={1}>
                        <Typography variant='h5'>
                            {name}
                        </Typography>
                        <Typography variant='body2' color={"crimson"}>
                            {fCurrency(price)}
                        </Typography>
                        <Typography variant='body2' color={"dimgray"}>
                            Size : {size}
                        </Typography>
                        <Typography variant='body2' color={"dimgray"}>
                            x {quantity}
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
            <Grid container item lg={4} justifyContent={"space-around"} alignItems="center">
                <Typography variant='body1' color={"crimson"}>
                    {fCurrency(price * quantity)}
                </Typography>
                <Box>
                    {
                        isApproved &&
                        <>
                            <Tooltip title="Đánh giá" placement="top">
                                <Box>
                                    {orderItem.rate ? <StarRoundedIcon color='warning' onClick={handleClickOpen} /> : <StarOutlineRoundedIcon color='warning' onClick={handleClickOpen} />}
                                </Box>
                            </Tooltip>
                            <Dialog open={open} onClose={handleClose} fullWidth>
                                <DialogContent>
                                    <Stack spacing={2}>
                                        <Grid container spacing={2} borderBottom={1} borderColor={"grey.300"}>
                                            <Grid item xs={3}>
                                                <Box sx={{ width: 100, height: 100, }}>
                                                    <img src={image} className="img-fluid" alt="product" />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={9} display='flex' justifyContent='start'>
                                                <Stack spacing={1}>
                                                    <Typography className='fw-bold align-self-center' variant='body1'>{name}</Typography>
                                                    <Typography variant='body2'>Cỡ : {size}</Typography>
                                                    <Typography variant='body2'>x{quantity}</Typography>
                                                    <Typography variant='body2'>{fCurrency(price)}</Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>

                                        {
                                            orderItem.rate &&
                                            <>
                                                <Grid container pt={2} justifyContent={"space-between"}>
                                                    <Grid item xs={4}>
                                                        <Typography variant='h6' textAlign={"center"}>Đã Đánh Giá</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Rating name="size-large" defaultValue={orderItem.rate.score} size="large" readOnly />
                                                    </Grid>
                                                    <Grid item xs={4} container alignItems={"center"}>
                                                        <Typography variant='subtitle2'>{new Date(orderItem.rate.createDate).toLocaleString()}</Typography>
                                                    </Grid>
                                                </Grid>
                                                <TextField label="Nội dung" value={rate.comment} size="small" multiline minRows={4} fullWidth inputProps={
                                                    { readOnly: true, }
                                                } />
                                            </>
                                        }
                                        {
                                            orderItem.rate == null &&
                                            <>
                                                <Grid container pt={2}>
                                                    <Grid item xs={4}>
                                                        <Typography variant='h6' textAlign={"center"}>Đánh Giá</Typography>
                                                    </Grid>
                                                    <Grid item xs={7}>
                                                        <Rating name="size-large" value={rate.score} onChange={(event, newValue) => { setRate({ ...rate, score: newValue }) }} size="large" />
                                                    </Grid>
                                                </Grid>
                                                <TextField label="Nội dung" value={rate.comment} onChange={e => { setRate({ ...rate, comment: e.target.value }) }} size="small" multiline minRows={4} fullWidth />
                                                <Stack direction={"row"} justifyContent={"flex-end"}>
                                                    <Button variant='contained' onClick={handleSubmit}>Đánh Giá</Button>
                                                </Stack>
                                            </>
                                        }
                                    </Stack>
                                </DialogContent>
                            </Dialog>
                        </>
                    }
                </Box>
            </Grid>
        </Grid>
    </>)
}
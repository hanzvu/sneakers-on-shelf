import * as React from 'react';

import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import StarIcon from "@mui/icons-material/Star";
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, Grid, Rating, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { addRate } from '../../services/RateService';
import { fCurrency } from '../../../utils/formatNumber';

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
export default function OrderItem({ orderItem, customName, idPurchase, userTokenQuery}) {

    const [value, setValue] = React.useState(5);

    const [hover, setHover] = React.useState(-1);

    const [state, setState] = React.useState("Người mua không viết gì.");

    const { id, quantity, productId, name, size, image, price, rate } = orderItem;

    const custom = customName;

    const [open, setOpen] = React.useState(false);

    const handleChange = event => {
        setState({ value: event.target.value });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (state.value == null) {
            addRate(id, value, state);
        } else {
            addRate(id, value, state.value);
        }
        setOpen(false);
        window.location.reload();
    }

    return (<>
        <div className="row m-0 py-3 border-bottom">
            <div className="col-lg-8 m-0 p-0 row">
                <div className="col-4 col-lg-3 p-0">
                    <Link to={`/products/${productId}`}><img src={image} className="img-fluid" alt="product" /></Link>
                </div>
                <div className="col-8 d-flex flex-column justify-content-around">
                    <p className="m-0 fw-bold">{name}</p>
                    <p className="m-0">Size : {size}</p>
                    <p className="m-0">
                        {fCurrency(price)}
                    </p>
                    <p className="m-0">x {quantity}</p>
                </div>
            </div>
            <div className="col-lg-4 m-0 py-2 py-lg-0 d-flex">
                <div className="w-100 text-center justify-content-center align-self-center">
                    <p className="m-0 text-danger">{fCurrency(price * quantity)}</p>
                </div>
                <div className="col-md-6 d-flex justify-content-end align-self-start">
                    <Tooltip title="Đánh giá" placement="top">
                        <Box>
                            <StarOutlineRoundedIcon color='success' onClick={handleClickOpen} />
                        </Box>
                    </Tooltip>
                    <Dialog open={open} onClose={handleClose} fullWidth>
                        <DialogTitle>
                            <Typography variant='h4'>Đánh Giá Sản Phẩm</Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <Box sx={{ width: 100, height: 100, }}>
                                            <img src={image} className="img-fluid" alt="product" />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={9} display='flex' justifyContent='start'>
                                        <Typography className='fw-bold align-self-center'>{name}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box mt={2} component='form'>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <Typography>Chất lượng sản phẩm</Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center"
                                            }}
                                        >
                                            {rate !== null && (
                                                <>
                                                <Rating value={rate.score} readOnly 
                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}/>
                                                <Box sx={{ ml: 2 }}>{labels[rate.score]}</Box>
                                                </>
                                            )}
                                            {rate == null && (
                                                <>
                                                <Rating
                                                name="hover-feedback"
                                                value={value}
                                                precision={1}
                                                onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                }}
                                                onClick={(event, value) => {
                                                    setValue(value);
                                                }}
                                                onChangeActive={(event, newHover) => {
                                                    setHover(newHover);
                                                }}
                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                            />
                                            {value !== null && (
                                                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                            )}
                                            {
                                                value == null && (setValue(1))
                                            }
                                            </>)}
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={1} mt={1}>
                                    <Grid item xs={12}>
                                        <TextField id="outlined-basic" label="Name" value={custom} readOnly size="small" fullWidth />
                                    </Grid>
                                    {rate !== null && (
                                        <Grid item xs={12}>
                                            <TextField label="Comment" value={rate.comment} readOnly onChange={handleChange} multiline rows={5} margin="dense" required fullWidth />
                                        </Grid>)}
                                    {rate == null && (
                                        <Grid item xs={12}>
                                            <TextField label="Comment" value={state.value} onChange={handleChange} multiline rows={5} margin="dense" required fullWidth />
                                        </Grid>)}
                                </Grid>
                                {/* <a routerLink="/product-single" className="btn btn-main btn-small">Submit Review</a> */}
                            </Box>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            {
                                rate == null && (<Button onClick={handleSubmit}>Submit</Button>)
                            }
                            {
                                rate !== null && (<Button onClick={handleSubmit} disabled>Submit</Button>)
                            }

                        </DialogActions>
                    </Dialog>
                </div>
            </div>

        </div>
    </>)
}
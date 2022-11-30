import { Accordion, AccordionDetails, AccordionSummary, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Input, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Scrollbar from "../../../components/Scrollbar";
import Iconify from "../../../components/Iconify";
import { addToCart } from "../../services/CartService";
import Incrementer from "./Incrementer";


function size(
    us,
    uk,
    vn,
    cm,
) {
    return { us, uk, vn, cm };
}

const sizeNam = [
    size(6, 5.5, 39, 23.5),
    size(7, 6.5, 40, 24.4),
    size(8, 7.5, 41, 25.4),
    size(9, 8.5, 42, 26),
    size(10, 9.5, 43, 27),
    size(11, 10.5, 44, 27.9),
    size(12, 11.5, 45, 28.6),
    size(13, 12.5, 46, 29.4),
];

const sizeNu = [
    size(4, 2, 34, 20.8),
    size(5, 3, 35, 21.6),
    size(6, 4, 36, 22.5),
    size(7, 5, 37, 23),
    size(8, 6, 38, 23.8),
    size(9, 7, 39, 24.6),
    size(10, 8, 40, 25.4),
    size(11, 9, 41, 26.2),
];

export default function ProductDetailSizeList({ productDetails }) {

    const [selectedProduct, setSelectedProduct] = useState(productDetails[0]);
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [openTable, setOpenTable] = useState(1);

    const navigate = useNavigate()

    const handleAddToCartSubmit = () => {
        addToCart(selectedProduct.id, quantity);
    }

    const handleBuyNowSubmit = async () => {
        await addToCart(selectedProduct.id, quantity);
        await delay(100);
        navigate("/cart");
    }

    const handleChangeQuantity = value => {
        if (value <= selectedProduct.quantity && value >= 1) {
            setQuantity(value)
        }
    }

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const handleFindSizeClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (<>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <div className="py-1">Size :</div>
            <Button variant="text" color="inherit" onClick={handleFindSizeClick} startIcon={<Iconify icon="eva:search-fill" />}>
                Tìm kích cỡ phù hợp nhất với bạn
            </Button>
        </Stack>
        <Grid container spacing={1} justifyContent={"start"}>
            {
                productDetails.map((pd, i) => (
                    <Grid item key={pd.id} gridAutoColumns>
                        <button
                            className={`d-block shadow-none btn rounded-3 ${pd.id === selectedProduct.id ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setSelectedProduct(productDetails[i])}>
                            {pd.size}
                        </button>
                    </Grid>
                ))
            }
        </Grid>
        <Typography variant="body2" component="div" sx={{ mt: 2, ml: 0.5, textAlign: 'left', color: 'text.secondary' }}>
            {selectedProduct.quantity} sản phẩm có sẵn
        </Typography>
        <Grid container pt={2} spacing={2}>
            <Grid item xs={4}>
                <Incrementer
                    name="quantity"
                    quantity={quantity}
                    available={selectedProduct.quantity}
                    onChangeQuantity={event => handleChangeQuantity(event.target.value)}
                    onIncrementQuantity={() => handleChangeQuantity(quantity + 1)}
                    onDecrementQuantity={() => handleChangeQuantity(quantity - 1)} />
            </Grid>
            <Grid item xs={8}>
                {
                    selectedProduct.quantity > 0 &&
                    <Button variant="outlined" className="btn btn-outline-dark" size="large" type="submit" onClick={handleAddToCartSubmit} fullWidth>
                        THÊM VÀO GIỎ
                    </Button>
                }
            </Grid>
            <Grid item xs={12}>
                {
                    selectedProduct.quantity > 0 &&
                    <Button variant="contained" className="btn btn-dark" size="large" type="submit" onClick={handleBuyNowSubmit} fullWidth>
                        MUA NGAY
                    </Button>

                }
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" component="div" align="center">
                    Gọi đặt mua <a className="text-decoration-none text-dark" href="tel:0843442263"><b>0844.488.888</b></a> (08:00 - 22:00)
                </Typography>
            </Grid>           
        </Grid>
        <Grid item xs={12}>
                <Accordion sx={{ background: "none" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography variant="h5">Chính sách giao hàng</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography><Iconify icon="eva:chevron-down-outline" />  Khi hoàn thành mua sắm tại Website, đơn hàng sẽ lập tức được đóng gói và chuẩn bị tiến hành giao hàng.</Typography>
                        <Typography><Iconify icon="eva:chevron-down-outline" />  Hàng đã đặt thành công sẽ được chuyển giao cho bên thứ ba và xác nhận sẽ được giao chậm nhất là 5 ngày cho một đơn hàng.</Typography>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle id="alert-dialog-title" align="center"><Typography variant="h5">Hướng Dẫn Chọn Size</Typography></DialogTitle>
            <DialogContent>
                <Stack direction="row" >
                    <Button variant={`${openTable === 1 ? "contained" : "text"}`} color="inherit" onClick={() => { setOpenTable(1) }}><Iconify icon={'fa:mars'} width={22} height={22} /></Button>
                    <Button variant={`${openTable === 2 ? "contained" : "text"}`} color="inherit" onClick={() => { setOpenTable(2) }}><Iconify icon={'fa:venus'} width={23} height={23} /></Button>
                </Stack>
                <Scrollbar>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Size US</TableCell>
                                    <TableCell align="center">Size UK</TableCell>
                                    <TableCell align="center">Size Việt Nam</TableCell>
                                    <TableCell align="center">Chiều Dài (cm)</TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                openTable === 1
                                    ?
                                    <TableBody>
                                        {sizeNam.map((s) => (
                                            <TableRow hover key={s.vn} tabIndex={-1}>
                                                <TableCell align="center">{s.us}</TableCell>
                                                <TableCell align="center">{s.uk}</TableCell>
                                                <TableCell align="center">{s.vn}</TableCell>
                                                <TableCell align="center">{s.cm}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    :
                                    <TableBody>
                                        {sizeNu.map((s) => (
                                            <TableRow hover key={s.vn} tabIndex={-1}>
                                                <TableCell align="center">{s.us}</TableCell>
                                                <TableCell align="center">{s.uk}</TableCell>
                                                <TableCell align="center">{s.vn}</TableCell>
                                                <TableCell align="center">{s.cm}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                            }
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Đóng</Button>
            </DialogActions>
        </Dialog>
    </>)
}

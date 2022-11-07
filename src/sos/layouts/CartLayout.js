import { Box, Container, Grid, Paper, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Page from '../../components/Page';
import CartItem from '../components/cart/CartItem';
import CartOrderForm from '../components/cart/CartOrderForm';
import { fCurrency } from '../../utils/formatNumber';
import { fetchProvincesToStore } from '../services/DeliveryService';

export default function CartLayout() {

    const cart = useSelector(state => state.cart.cart);

    useEffect(() => {
        fetchProvincesToStore();
    }, [])

    const total = (items) => (items == null ? 0 : items.reduce((total, item) => (total + item.price * item.quantity), 0))

    return (<>
        <Page title="Giỏ Hàng">
            <Container disableGutters>
                <Stack spacing={3} pt={3}>
                    <Paper elevation={3} square>
                        <Box px={2}>
                            {
                                cart.items && cart.items.length > 0 &&
                                <>
                                    <Grid container spacing={1} py={2} sx={{ display: { xs: "none", md: "flex" } }} className={"border-bottom"}>
                                        <Grid item container lg={7} justifyContent="center" alignItems="center">
                                            Sản Phẩm
                                        </Grid>
                                        <Grid item lg={5} container spacing={2}>
                                            <Grid item container md={4} xs={6} justifyContent="center" alignItems="center">
                                                Số Lượng
                                            </Grid>
                                            <Grid item container md={4} xs={6} justifyContent="center" alignItems="center">
                                                Số Tiền
                                            </Grid>
                                            <Grid item container md={4} xs={12} justifyContent="center" alignItems="center">
                                                Thao Tác
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    {
                                        cart.items.map(item => (
                                            < CartItem key={item.id} item={item} />
                                        ))
                                    }

                                    <div className="m-0 py-3 px-5 text-end">
                                        Tổng số tiền : <span className="text-danger">{fCurrency(total(cart.items))}</span>
                                    </div>
                                </>
                            }
                            {
                                (cart.items == null || cart.items.length === 0) &&
                                <div className="m-0 py-3 px-5 text-end">
                                    Chưa có mặt hàng nào trong giỏ
                                </div>
                            }
                        </Box>
                    </Paper>
                    <Paper elevation={3} square>
                        <Box p={2}>
                            {cart.id &&
                                <CartOrderForm id={cart.id} total={total(cart.items)} token={cart.token} />
                            }
                        </Box>
                    </Paper>
                </Stack>
            </Container>
        </Page>
    </>)
}
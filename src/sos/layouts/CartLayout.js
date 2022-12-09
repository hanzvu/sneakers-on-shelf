import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Page from '../../components/Page';
import CartItem from '../components/cart/CartItem';
import CartOrderForm from '../components/cart/CartOrderForm';
import { fCurrency } from '../../utils/formatNumber';
import { fetchProvincesToStore } from '../services/DeliveryService';
import { getMemberOfferPolicyByAccountId } from '../services/CartService';

export default function CartLayout() {

    const cart = useSelector(state => state.cart.cart);

    const account = useSelector(state => state.account.account);

    const [memberOfferPolicy, setMemberOfferPolicy] = useState();

    useEffect(() => {
        fetchProvincesToStore();
        if (account.id == null) {
            return;
        }
        getMemberOfferPolicyByAccountId(account.id).then(data => {
            setMemberOfferPolicy(data);
        });
    }, [])

    const total = (items) => (items == null ? 0 : items.reduce((total, item) => (total + item.price * item.quantity), 0))

    return (<>
        <Page title="Giỏ Hàng">
            <Container disableGutters>
                <Stack spacing={3} pt={3}>
                    {
                        cart.items && cart.items.length > 0 &&
                        <Paper elevation={3} square>
                            <Box px={2}>

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

                                    <Grid container py={2} justifyContent={"flex-end"}>
                                        <Grid container item lg={3}>
                                            <Grid item xs={6}>
                                                Tổng số tiền :
                                            </Grid>
                                            <Grid item xs={6} pr={2}>
                                                <Typography variant="body1" color="crimson" textAlign={"end"}>
                                                    {fCurrency(total(cart.items))}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>
                            </Box>
                        </Paper>
                    }

                    {
                        (cart.items == null || cart.items.length === 0) &&
                        <Grid container justifyContent={"center"} p={3}>
                            <Stack spacing={3}>
                                <img src='https://bizweb.dktcdn.net/100/377/398/themes/755909/assets/empty_cart.png?1669026383948' alt='cart empty' />
                                <Typography variant='body1' color={"dimgray"} align='center'>
                                    Không có sản phẩm nào trong giỏ hàng của bạn
                                </Typography>
                            </Stack>
                        </Grid>
                    }

                    {cart.items != null && cart.items.length !== 0 &&
                        <Paper elevation={3} square>
                            <Box p={2}>
                                <CartOrderForm id={cart.id} total={total(cart.items)} token={cart.token} memberOfferPolicy={memberOfferPolicy} />
                            </Box>
                        </Paper>
                    }
                </Stack>
            </Container>
        </Page>
    </>)
}
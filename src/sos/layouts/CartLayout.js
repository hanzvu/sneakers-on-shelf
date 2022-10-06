import { Box, Container, Paper, Stack } from '@mui/material';
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
                                cart.items.map(item => (
                                    < CartItem key={item.id} item={item} />
                                ))
                            }

                            {
                                cart.items && cart.items.length > 0 &&
                                <div className="m-0 py-3 px-5 text-end">
                                    Tổng số tiền : <span className="text-danger">{fCurrency(total(cart.items))}</span>
                                </div>
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
                            <CartOrderForm id={cart.id} total={total(cart.items)} />
                        </Box>
                    </Paper>
                </Stack>
            </Container>
        </Page>
    </>)
}
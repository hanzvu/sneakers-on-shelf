import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchCart } from '../services/CartService';
import Page from '../../components/Page';
import CartItem from '../components/cart/CartItem';
import CartOrderForm from '../components/cart/CartOrderForm';
import { fCurrency } from '../../utils/formatNumber';

export default function CartLayout() {

    const cart = useSelector(state => state.cart.cart);

    useEffect(() => {
        if (cart.id) {
            fetchCart(cart.id, cart.userTokenQuery)
        }
    }, [])

    const total = (items) => {
        const rs = items.reduce((total, item) => {
            return total + item.price;
        }, 0);
        return fCurrency(rs);
    }

    return (<>
        <Page title="Giỏ Hàng">
            <Container>
                <div>
                    <div className="px-2 px-xl-4 bg-light">
                        {
                            cart.items && cart.items.length > 0 &&
                            cart.items.map(item => (
                                < CartItem key={item.id} item={item} />
                            ))
                        }

                        {
                            cart.items && cart.items.length > 0 &&
                            <div className="m-0 py-3 px-5 text-end">
                                Tổng số tiền : <span className="text-danger">{total(cart.items)}</span>
                            </div>
                        }

                        {
                            (cart.items == null || cart.items.length === 0) &&
                            <div className="m-0 py-3 px-5 text-end">
                                Chưa có mặt hàng nào trong giỏ
                            </div>
                        }
                    </div>

                    <CartOrderForm />
                </div>
            </Container>
        </Page>
    </>)
}
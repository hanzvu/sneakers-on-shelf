import { Container } from '@mui/material';
import Page from '../../components/Page';
import CartItem from '../components/cart/CartItem';
import CartOrderForm from '../components/cart/CartOrderForm';

export default function CartLayout() {
    return (<>
        <Page title="Giỏ Hàng">
            <Container>
                <div>
                    <div className="px-2 px-xl-4 bg-light">

                        <CartItem />

                        <div className="m-0 py-3 px-5 text-end">
                            Tổng số tiền : <span className="text-danger">99999</span>
                        </div>
                    </div>

                    <CartOrderForm />
                </div>
            </Container>
        </Page>
    </>)
}
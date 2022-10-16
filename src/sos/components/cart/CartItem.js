import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { removeFromCart, setCartItemQuantity } from '../../services/CartService';
import { fCurrency } from '../../../utils/formatNumber';
import CartIncrementer from './CartIncrementer';

export default function CartItem({ item }) {

    const { id, quantity, productId, name, size, image, price } = item;

    const handleRemoveCart = id => {
        removeFromCart(id)
    }

    const handleChangeQuantity = value => {
        if (value < 1) {
            return;
        }
        setCartItemQuantity(id, value);
    }

    return (<>
        <Grid container spacing={1} py={3} className={"border-bottom"}>
            <Grid item container lg={7}>

                <Grid item xs={4} lg={3}>
                    <Link to={`/products/${productId}`}><img src={image} className="img-fluid" alt='product' /></Link>
                </Grid>
                <Grid item container xs={8} justifyContent={"space-around"} direction={"column"}>
                    <Typography variant="h5" gutterBottom>
                        {name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Size : {size}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {fCurrency(price)}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item lg={5} container spacing={2}>
                <Grid item container md={4} xs={6} justifyContent="center" alignItems="center">
                    <CartIncrementer
                        name="quantity"
                        quantity={quantity}
                        onBlurHandler={value => handleChangeQuantity(value)}
                        onIncrementQuantity={() => handleChangeQuantity(quantity + 1)}
                        onDecrementQuantity={() => handleChangeQuantity(quantity - 1)} />
                </Grid>
                <Grid item container md={4} xs={6} justifyContent="center" alignItems="center">
                    <p className="m-0 text-danger text-center">{fCurrency(quantity * price)}</p>
                </Grid>
                <Grid item container md={4} xs={12} justifyContent="center" alignItems="center">
                    <button type="button" className="btn btn-danger shadow-none" onClick={() => handleRemoveCart(id)}>
                        Xóa Khỏi Giỏ</button>
                </Grid>
            </Grid>
        </Grid>
    </>)
}
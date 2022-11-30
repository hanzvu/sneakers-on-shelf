import { Button, Grid, Input, Stack, TextField, Typography } from "@mui/material";
import { color } from "@mui/system";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Iconify from "../../../components/Iconify";
import { addToCart } from "../../services/CartService";
import Incrementer from "./Incrementer";

export default function ProductDetailSizeList({ productDetails }) {

    const [selectedProduct, setSelectedProduct] = useState(productDetails[0]);
    const [quantity, setQuantity] = useState(1);

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

    return (<>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <div className="py-1">Size :</div>
            <Button variant="text" color="inherit" startIcon={<Iconify icon="eva:search-fill" />}>
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
        <Typography variant="body2" component="div" sx={{ mt: 2, textAlign: 'left', color: 'text.secondary' }}>
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
                    <Button variant="outlined" color="inherit" size="large" type="submit" onClick={handleAddToCartSubmit} fullWidth>
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

        </Grid>
    </>)
}

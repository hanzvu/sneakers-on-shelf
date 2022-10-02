import { Grid } from "@mui/material";
import { useState } from "react";
import ShopProduct from "./ShopProduct";

export default function ProductCollection() {

    const [product, setProduct] = useState({
        id: 1,
        name: 'Product name',
        image: 'https://cdn.vuahanghieu.com/unsafe/500x0/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2022/08/giay-the-thao-mlb-chunky-liner-boston-red-sox-3asxca12n-43bgs-mau-nau-be-6306dd5522b33-25082022092421.jpg',
        originalPrice: 9999,
        sellPrice: 9988
    })

    return (<>
        <Grid container spacing={3}>
            <Grid key='1' item xs={12} sm={6} md={3}>
                <ShopProduct product={product} />
            </Grid>
        </Grid>
    </>)
}
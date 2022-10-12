import { Grid, Typography } from '@mui/material';
import { fCurrency } from '../../../utils/formatNumber';

import ProductDetailSizeList from "./ProductDetailSizeList";
import ProductImageContainer from "./ProductImageContainer";

export default function ProductDetail({ product }) {

    const { name, productImage, productImages, brand, category, productGender, sellPrice, productDetails, description } = product;

    return (<>
        <Grid container item spacing={5} pt={3}>
            <Grid container item md={6}>
                <ProductImageContainer name={name} productImage={productImage} productImages={productImages} />
            </Grid>
            <Grid item md={6}>
                <Typography variant='h4'>
                    {name}
                </Typography>
                <Grid container spacing={1}>
                    <Grid item container spacing={2}>
                        <Grid item xs={5}>
                            Thương hiệu :
                        </Grid>
                        <Grid item xs={7}>
                            {brand}
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                        <Grid item xs={5}>
                            Danh mục :
                        </Grid>
                        <Grid item xs={7}>
                            {category}
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                        <Grid item xs={5}>
                            Dành cho :
                        </Grid>
                        <Grid item xs={7}>
                            {productGender}
                        </Grid>
                    </Grid>
                </Grid>

                <div className="py-3">
                    <h5 className="h4 text-danger m-0 fw-bold">{fCurrency(sellPrice)}</h5>
                </div>
                <ProductDetailSizeList productDetails={productDetails} />
            </Grid>
        </Grid>
    </>)
}
import { Grid, Typography } from '@mui/material';
import { fCurrency } from '../../../utils/formatNumber';

import ProductDetailSizeList from "./ProductDetailSizeList";
import ProductImageContainer from "./ProductImageContainer";

export default function ProductDetail({ product }) {

    const { name, productImage, productImages, brand, category, productGender, sellPrice, productDetails, description } = product;

    return (<>
        <Grid container item spacing={5}>
            <Grid container item md={6}>
                <ProductImageContainer name={name} productImage={productImage} productImages={productImages} />
            </Grid>
            <Grid item md={6}>
                <Typography variant='h3'>
                    {name}
                </Typography>
                <Grid container spacing={1}>
                    <Grid item container spacing={2}>
                        <Grid item xs={3}>
                            <Typography variant='body1' color={"dimgrey"}>
                                Thương hiệu :
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant='subtitle1'>
                                {brand}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                        <Grid item xs={3}>
                            <Typography variant='body1' color={"dimgrey"}>
                                Danh mục :
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant='subtitle1'>
                                {category}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                        <Grid item xs={3}>
                            <Typography variant='body1' color={"dimgrey"}>
                                Dành cho :
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant='subtitle1'>
                                {productGender}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <div className="py-3">
                    <Typography variant='h3' color={"crimson"}>
                        {fCurrency(sellPrice)}
                    </Typography>
                </div>
                <ProductDetailSizeList productDetails={productDetails} />
            </Grid>
        </Grid>
    </>)
}
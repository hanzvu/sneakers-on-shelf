import PropTypes from 'prop-types';

import { Grid } from "@mui/material";
import ShopProduct from "./ShopProduct";

ProductCollection.propTypes = {
    products: PropTypes.array.isRequired
};

export default function ProductCollection({ products }) {

    return (<>
        <Grid container spacing={3}>
            {
                products.map((product) => (
                    <Grid key={product.id} item xs={12} sm={6} md={3}>
                        <ShopProduct product={product} />
                    </Grid>
                ))
            }
        </Grid>
    </>)
}
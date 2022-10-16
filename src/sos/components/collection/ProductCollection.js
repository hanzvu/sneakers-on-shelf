import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid } from "@mui/material";
import PropTypes from 'prop-types';

import ShopProduct from "../product/ShopProduct";
import { findProducts } from '../../services/ProductService';

export default function ProductCollection() {

    const [data, setData] = useState({
        content: []
    });

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        findProducts(Object.fromEntries(searchParams.entries())).then(response => {
            setData(response.data)
        })
    }, [searchParams])

    return (<>
        <Grid container spacing={3}>
            {
                data.content.map((product) => (
                    <Grid key={product.id} item xs={12} sm={6} md={3}>
                        <ShopProduct product={product} />
                    </Grid>
                ))
            }
        </Grid>
    </>)
}
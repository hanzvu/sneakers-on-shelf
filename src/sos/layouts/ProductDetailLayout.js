import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


import Page from '../../components/Page';
import ProductDetail from "../components/product/ProductDetail";
import ProductDetailDescription from '../components/product/ProductDetailDescription';
import { findProduct } from '../services/ProductService';


export default function ProductDetailLayout() {

    const params = useParams();
    const [product, setProduct] = useState()

    useEffect(() => {
        findProduct(params.id).then(response => {
            setProduct(response.data)
        })
    }, [params.id])

    return (<>
        <Page title={product ? product.name : null}>
            <Container>
                <Grid container pt={3}>
                    {product &&
                        <>
                            <ProductDetail product={product} />
                            <ProductDetailDescription productId={product.id} score={product.score} description={product.description} />
                        </>
                    }
                </Grid>
            </Container>
        </Page>
    </>)
}
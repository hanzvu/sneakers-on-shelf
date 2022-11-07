import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Page from '../../components/Page';
import ProductDetail from "../components/product/ProductDetail";
import ProductDetailDescription from '../components/product/ProductDetailDescription';
import { findProduct } from '../services/ProductService';


export default function ProductDetailLayout() {

    const params = useParams();
    const [product, setProduct] = useState();

    useEffect(() => {
        findProduct(params.id).then(response => {
            console.log(response.data);
            setProduct(response.data)
        })
    }, [params.id])

    return (<>
        <Page title={product ? product.name : null}>
            <Container>
                <Grid container>
                    {product &&
                        <>
                            <ProductDetail product={product} />
                            <ProductDetailDescription id={product.id}/>
                        </>
                    }
                </Grid>
            </Container>
        </Page>
    </>)
}
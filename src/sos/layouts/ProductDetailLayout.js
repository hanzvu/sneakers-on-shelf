import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


import Page from '../../components/Page';
import ProductDetail from "../components/product/ProductDetail";
import ProductDetailDescription from '../components/product/ProductDetailDescription';
import ProductDetailSidebar from "../components/product/ProductDetailSidebar";
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
                <div className="container-fluid row m-0 p-0 justify-content-center">
                    {product &&
                        <>
                            <div className="row col-12 m-0 p-0">
                                <ProductDetail product={product} />
                                <ProductDetailSidebar />
                            </div>
                            <ProductDetailDescription />
                        </>
                    }
                </div>
            </Container>
        </Page>
    </>)
}
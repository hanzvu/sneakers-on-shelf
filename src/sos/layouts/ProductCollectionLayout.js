import { useEffect, useState } from 'react';
import { Container, Stack } from '@mui/material';
// components
import Page from '../../components/Page';
import { ProductSort, ProductCartWidget, ProductFilterSidebar } from '../../sections/@dashboard/products';
import ProductCollection from '../components/product/ProductCollection';
import { findProducts } from '../services/ProductService';
// mock


// ----------------------------------------------------------------------

export default function ProductCollectionLayout() {

    const [data, setData] = useState({
        content: []
    });

    useEffect(() => {
        findProducts({
            page: 1
        }).then(response => {
            setData(response.data)
        })
    }, [])

    const [openFilter, setOpenFilter] = useState(false);

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    return (
        <Page title="Giày Chính Hàng Sneakers On Shelf">
            <Container>
                <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
                    <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                        <ProductFilterSidebar
                            isOpenFilter={openFilter}
                            onOpenFilter={handleOpenFilter}
                            onCloseFilter={handleCloseFilter}
                        />
                        <ProductSort />
                    </Stack>
                </Stack>

                {data.content.length > 0 && <ProductCollection products={data.content} />}

                <ProductCartWidget />
            </Container>
        </Page>
    );
}

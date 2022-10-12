import { useEffect, useState } from 'react';
import { Container, Stack } from '@mui/material';
// components
import Page from '../../components/Page';
import { ProductSort } from '../../sections/@dashboard/products';
import ProductCollection from '../components/collection/ProductCollection';
import { findProducts } from '../services/ProductService';
import ProductCollectionFilterSidebar from '../components/collection/ProductCollectionFilterSidebar';
// mock


// ----------------------------------------------------------------------

export default function ProductCollectionLayout() {

    const [openFilter, setOpenFilter] = useState(false);

    return (
        <Page title="Giày Chính Hàng Sneakers On Shelf">
            <Container>
                <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
                    <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                        <ProductCollectionFilterSidebar
                            isOpenFilter={openFilter}
                            onOpenFilter={() => setOpenFilter(true)}
                            onCloseFilter={() => setOpenFilter(false)} />
                    </Stack>
                </Stack>
                <ProductCollection />
            </Container>
        </Page>
    );
}

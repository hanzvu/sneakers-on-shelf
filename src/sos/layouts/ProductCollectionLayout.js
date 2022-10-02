import { useState } from 'react';
// material
import { Container, Stack } from '@mui/material';
// components
import Page from '../../components/Page';
import { ProductSort, ProductCartWidget, ProductFilterSidebar } from '../../sections/@dashboard/products';
import ProductCollection from '../components/product/ProductCollection';
// mock


// ----------------------------------------------------------------------

export default function ProductCollectionLayout() {
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

                <ProductCollection />

                <ProductCartWidget />
            </Container>
        </Page>
    );
}

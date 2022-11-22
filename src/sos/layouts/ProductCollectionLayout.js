import { Box, Container, Grid } from '@mui/material';
// components
import Page from '../../components/Page';
import ProductCollection from '../components/collection/ProductCollection';
import CollectionSidebar from '../components/collection/CollectionSidebar';
// mock


// ----------------------------------------------------------------------

export default function ProductCollectionLayout() {

    return (
        <Page title="Giày Chính Hàng Sneakers On Shelf">
            <Container>
                <Box pt={3}>
                    <Grid container spacing={1}>
                        <Grid item md={3} sx={{ display: { md: 'block', sm: 'none' } }}>
                            <CollectionSidebar />
                        </Grid>
                        <ProductCollection />
                    </Grid>
                </Box>
            </Container>
        </Page>
    );
}

import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProduct.propTypes = {
    product: PropTypes.object,
};

export default function ShopProduct({ product }) {

    const { id, name, image, sellPrice, originalPrice } = product;

    return (
        <Card className='h-100'>
            <Box sx={{ pt: '100%', position: 'relative' }}>
                <Link to={`/products/${id}`} color="inherit" underline="hover" component={RouterLink}>
                    <ProductImgStyle alt={name} src={image} />
                </Link>
            </Box>

            <Stack spacing={2} sx={{ p: 2, minHeight: '120px' }} direction="column" justifyContent="space-between">
                <Link to={`/products/${id}`} color="inherit" underline="hover" component={RouterLink}>
                    <Typography variant="subtitle1" >
                        {name}
                    </Typography>
                </Link>

                <Stack direction="row" alignItems="center" justifyContent="flex-end">
                    <Typography variant="subtitle1" className='text-danger'>
                        {fCurrency(sellPrice)}
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
}

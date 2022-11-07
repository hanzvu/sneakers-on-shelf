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
        <>
            <Card>
                <Box sx={{ pt: '100%', position: 'relative' }}>
                    {/* {originalPrice > sellPrice && (
                        <Label
                            variant="filled"
                            color={'error'}
                            sx={{
                                zIndex: 9,
                                top: 16,
                                right: 16,
                                position: 'absolute',
                                textTransform: 'uppercase',
                            }}>
                            Sale - {parseInt((100 * sellPrice) / originalPrice, 10)} %
                        </Label>
                    )} */}
                    <Link to={`/products/${id}`} color="inherit" underline="hover" component={RouterLink}>
                        <ProductImgStyle alt={name} src={image} />
                    </Link>
                </Box>

                <Stack spacing={2} sx={{ p:2 }}>
                    <Link to={`/products/${id}`} color="inherit" underline="hover" component={RouterLink}>
                        <Typography variant="subtitle1">
                            {name}
                        </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="flex-end">
                        <Typography variant="subtitle1" className='text-danger'>
                            {/* <Typography
                                component="span"
                                variant="body1"
                                sx={{
                                    color: 'text.disabled',
                                    textDecoration: 'line-through',
                                }}
                            >
                                {originalPrice && fCurrency(originalPrice)}
                            </Typography> */}
                            {fCurrency(sellPrice)}
                        </Typography>
                    </Stack>
                </Stack>
            </Card>
        </>
    );
}

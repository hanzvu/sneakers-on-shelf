import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/Label';


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
                    {originalPrice < sellPrice && (
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
                            'Sale'
                        </Label>
                    )}
                    <Link to={`/products/${id}`} color="inherit" underline="hover" component={RouterLink}>
                        <ProductImgStyle alt={name} src={image} />
                    </Link>
                </Box>

                <Stack spacing={2} sx={{ p: 3 }}>
                    <Link to={`/products/${id}`} color="inherit" underline="hover" component={RouterLink}>
                        <Typography variant="subtitle2" noWrap>
                            {name}
                        </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="subtitle1">
                            <Typography
                                component="span"
                                variant="body1"
                                sx={{
                                    color: 'text.disabled',
                                    textDecoration: 'line-through',
                                }}
                            >
                                {originalPrice && fCurrency(originalPrice)}
                            </Typography>
                            &nbsp;
                            {fCurrency(sellPrice)}
                        </Typography>
                    </Stack>
                </Stack>
            </Card>
        </>
    );
}

import { useState } from "react";

import { Grid, styled } from "@mui/material";
import { Box } from "@mui/system";

const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
});

export default function ProductImageContainer({ name, productImage, productImages }) {

    const [image, setImage] = useState(productImage);

    const productImagesOnClick = index => {
        setImage(productImages[index])
    };

    return (<>
        <Grid item xs={12}>
            <Box sx={{ pt: '100%', position: 'relative' }}>
                <ProductImgStyle alt={name} src={image} />
            </Box>
        </Grid>
        <Grid container item spacing={0} xs={12}>
            {productImages.map((img, index) => (
                <Grid key={index} item xs={3} sm={6} md={3}>
                    <Box sx={{ pt: '100%', position: 'relative' }} borderColor={'grey.500'}>
                        <ProductImgStyle alt={index} src={img} onClick={() => productImagesOnClick(index)} />
                    </Box>
                </Grid>
            ))}
        </Grid>
    </>)
}
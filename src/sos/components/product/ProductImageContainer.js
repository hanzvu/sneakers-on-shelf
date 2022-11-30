import { useState } from "react";

import { Card, Grid, styled } from "@mui/material";
import { Box } from "@mui/system";
import { Carousel } from "react-bootstrap";

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
        <Card sx={{maxHeight:555}}>
            <Carousel className="carousel-dark">
                    {productImages.map((img, index) => (
                        <Carousel.Item key={index} interval={3000}>
                            <img className="img-fluid" src={img} alt={name} />
                        </Carousel.Item>                    
                    ))}
            </Carousel>
        </Card>
        <></>   
    </>)
}
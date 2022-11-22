import { useEffect, useState } from "react";
import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { findProducts } from "../../services/ProductService";
import ShopProduct from "../product/ShopProduct";

export default function BestSellingProduct() {

    const [data, setData] = useState({
        content: []
    });

    useEffect(() => {
        findProducts({ sort: 'best_selling', size: 24 }).then(response => {
            setData(response.data)
        })
    }, [])

    return (<>
        <Container>
            <Box py={3}>
                <Paper>
                    <Stack p={1}>
                        <Typography pt={3} textAlign={"center"} variant="body1" fontSize={30} color={"grey"}>
                            SẢN PHẨM BÁN CHẠY
                        </Typography>
                        <Grid container spacing={3} p={1}>
                            {
                                data.content.map((product) => (
                                    <Grid key={product.id} item xs={12} sm={6} md={3}>
                                        <ShopProduct product={product} />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Stack>
                </Paper>
            </Box>
        </Container>
    </>)
}
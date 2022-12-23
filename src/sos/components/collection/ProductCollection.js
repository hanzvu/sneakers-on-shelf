import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Divider, Grid, Pagination, PaginationItem, Stack, Typography } from "@mui/material";

import ShopProduct from "../product/ShopProduct";
import { findProducts } from '../../services/ProductService';
import ProductCollectionSorter from './ProductCollectionSorter';

export default function ProductCollection() {

    const [data, setData] = useState({
        content: []
    });

    const [searchParams, setSearchParams] = useSearchParams();

    const handleChangeSorter = sort => {
        setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            sort
        })
    }

    useEffect(() => {
        findProducts(Object.fromEntries(searchParams.entries())).then(response => {
            setData(response.data)
        })
    }, [searchParams])

    return (<>
        <Grid item xs={12} md={9}>
            <Stack alignItems="flex-end">
                <Grid container justifyContent={"space-between"}>
                    <Grid item container xs={6} alignItems="center" px={1}>
                        {
                            searchParams.get("query") &&
                            <Typography variant='body2' color={"dimgrey"}>
                                {
                                    data.totalElements > 0 ? `Tìm thấy ${data.totalElements} kết quả với từ khóa "${searchParams.get("query")}"...` : `Không tìm thấy sản phẩm với từ khóa "${searchParams.get("query")}"`
                                }
                            </Typography>
                        }
                    </Grid>
                    <Grid item container xs={6} justifyContent={"end"}>
                        <ProductCollectionSorter value={searchParams.get('sort')} handleChangeSorter={handleChangeSorter} />
                    </Grid>
                </Grid>
                <Grid container item spacing={3} p={1}>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    {
                        data.content.map((product) => (
                            <Grid key={product.id} item xs={12} sm={6} md={4}>
                                <ShopProduct product={product} />
                            </Grid>
                        ))
                    }
                </Grid>
                {
                    data.totalPages != null && data.totalPages > 1 &&
                    <Grid container item pt={2} justifyContent="center">
                        <Pagination
                            page={data.number + 1}
                            count={data.totalPages}
                            onChange={(event, value) => {
                                setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: value });
                            }}
                        />
                    </Grid>
                }
            </Stack>
        </Grid>
    </>)
}
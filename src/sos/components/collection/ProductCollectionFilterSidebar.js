import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button, Divider, Drawer, IconButton, Stack, Typography } from "@mui/material";
import { getAllBrand, getAllCategory, getAllProductGender } from "../../services/CollectionService";
import Scrollbar from "../../../components/Scrollbar";
import Iconify from "../../../components/Iconify";
import ProductCollectionGenderFilter from "./ProductCollectionGenderFilter";
import ProductCollectionBrandFilter from "./ProductCollectionBrandFilter";
import ProductCollectionCategoryFilter from "./ProductCollectionCategoryFilter";

export default function ProductCollectionFilterSidebar({ isOpenFilter, onOpenFilter, onCloseFilter }) {

    const [data, setData] = useState({
        brands: [],
        categories: [],
        productGenders: []
    });
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            const brands = await getAllBrand();
            const categories = await getAllCategory();
            const productGenders = await getAllProductGender();
            setData({ brands, categories, productGenders });
        }
        fetchData();
    }, [])

    const onChangeGender = gender => {
        setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            gender
        })
    }

    const onChangeBrand = brand => {
        setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            brand
        })
    }

    const onChangeCategory = category => {
        setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            category
        })
    }

    const clearFilterHandler = () => {
        setSearchParams({})
    }

    return (
        <>
            <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
                Filters&nbsp;
            </Button>

            <Drawer
                anchor="left"
                open={isOpenFilter}
                onClose={onCloseFilter}
                PaperProps={{
                    sx: { width: 320, border: 'none', overflow: 'hidden' },
                }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>
                        BỘ LỌC SẢN PHẨM
                    </Typography>
                    <IconButton onClick={onCloseFilter}>
                        <Iconify icon="eva:close-fill" width={20} height={20} />
                    </IconButton>
                </Stack>
                <Divider />
                <Scrollbar>
                    <Stack spacing={3} sx={{ p: 3 }}>
                        <ProductCollectionGenderFilter productGenders={data.productGenders} value={searchParams.get('gender')} onChangeGender={onChangeGender} />
                        <ProductCollectionBrandFilter brands={data.brands} value={searchParams.get('brand')} onChangeBrand={onChangeBrand} />
                        <ProductCollectionCategoryFilter categories={data.categories} value={searchParams.get('category')} onChangeCategory={onChangeCategory} />
                        <div>
                            <Button variant="contained" onClick={clearFilterHandler}>Clear Filter</Button>
                        </div>
                    </Stack>
                </Scrollbar>
            </Drawer>
        </>
    );
}
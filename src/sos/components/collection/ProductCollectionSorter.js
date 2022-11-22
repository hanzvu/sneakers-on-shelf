import { useState } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import Iconify from "../../../components/Iconify";

const SORT_BY_OPTIONS = {
    'date_desc': { value: 'date_desc', label: 'Mới nhất' },
    'best_selling': { value: 'best_selling', label: 'Bán chạy nhất' },
    'price_asc': { value: 'price_asc', label: 'Giá tăng dần' },
    'price_desc': { value: 'price_desc', label: 'Giá giảm dần' },
    'name_asc': { value: 'name_asc', label: 'Tên : A -> Z' },
    'name_desc': { value: 'name_desc', label: 'Tên : Z -> A' },
};


export default function ProductCollectionSorter({ value, handleChangeSorter }) {

    const [open, setOpen] = useState(null);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const handleChange = value => {
        handleChangeSorter(value);
        handleClose();
    }

    return (
        <>
            <Button
                color="inherit"
                disableRipple
                onClick={handleOpen}
                endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}>
                Sắp xếp :&nbsp;
                <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    {SORT_BY_OPTIONS[value] == null ? "Mặc định" : SORT_BY_OPTIONS[value].label}
                </Typography>
            </Button>
            <Menu
                keepMounted
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                {
                    Object.values(SORT_BY_OPTIONS).map(option => (
                        <MenuItem
                            key={option.value}
                            selected={option.value === value}
                            onClick={() => handleChange(option.value)}
                            sx={{ typography: 'body2' }}>
                            {option.label}
                        </MenuItem>
                    ))
                }
            </Menu>
        </>
    )
}
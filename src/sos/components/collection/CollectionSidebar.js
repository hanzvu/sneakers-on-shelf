import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Stack, styled } from '@mui/material';
import { getAllBrand, getAllCategory, getAllProductGender } from "../../services/CollectionService";

export default function CollectionSidebar() {

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

    return (
        <div>
            <Accordion sx={{ background: "none" }} disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                    <Typography sx={{ fontWeight: 'bold' }} variant='h6' color={"grey"}>THƯƠNG HIỆU</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl>
                        <RadioGroup value={searchParams.get('brand')} onChange={(e) => {
                            setSearchParams({
                                ...Object.fromEntries(searchParams.entries()),
                                brand: e.target.value
                            })
                        }}>
                            {
                                data.brands &&
                                data.brands.map(brand => (
                                    <FormControlLabel key={brand.id} value={brand.id} control={<Radio size="small" color='default' />} label={brand.name} />
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ background: "none" }} disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                    <Typography sx={{ fontWeight: 'bold' }} variant='h6' color={"grey"}>DANH MỤC</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl>
                        <RadioGroup value={searchParams.get('category')} onChange={(e) => {
                            setSearchParams({
                                ...Object.fromEntries(searchParams.entries()),
                                category: e.target.value
                            })
                        }}>
                            {
                                data.categories &&
                                data.categories.map(category => (
                                    <FormControlLabel key={category.id} value={category.id} control={<Radio size="small" color='default' />} label={category.name} />
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ background: "none" }} disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                    <Typography sx={{ fontWeight: 'bold' }} variant='h6' color={"grey"}>DÀNH CHO</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl>
                        <RadioGroup value={searchParams.get('gender')} onChange={(e) => {
                            setSearchParams({
                                ...Object.fromEntries(searchParams.entries()),
                                gender: e.target.value
                            })
                        }}>
                            {
                                data.productGenders &&
                                data.productGenders.map(gender => (
                                    <FormControlLabel key={gender.name} value={gender.name} control={<Radio size="small" color='default' />} label={gender.description} />
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>

            {
                !searchParams.entries().next().done &&
                <Stack direction="row" justifyContent="center">
                    <Button variant='contained' color='inherit' onClick={() => {
                        setSearchParams({})
                    }}>
                        Hiển Thị Tất Cả
                    </Button>
                </Stack>
            }
        </div >
    );
}

const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
        theme.palette.mode === 'dark'
            ? '0 0 0 1px rgb(16 22 26 / 40%)'
            : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
    backgroundImage:
        theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
            : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
    },
    'input:hover ~ &': {
        backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
    },
    'input:disabled ~ &': {
        boxShadow: 'none',
        background:
            theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
    },
}));

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
    },
    'input:hover ~ &': {
        backgroundColor: '#106ba3',
    },
});

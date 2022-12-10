import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SquareIcon from '@mui/icons-material/Square';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Slider, Stack, styled } from '@mui/material';
import { getAllBrand, getAllCategory, getAllColor, getAllMaterial, getAllProductGender, getAllSole } from "../../services/CollectionService";
import { fCurrency } from '../../../utils/formatNumber';

export default function CollectionSidebar() {

    const [data, setData] = useState({
        brands: [],
        categories: [],
        productGenders: []
    });

    const [searchParams, setSearchParams] = useSearchParams();

    const [value1, setValue1] = useState([searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 100000, searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 10000000])


    useEffect(() => {
        const fetchData = async () => {
            const brands = await getAllBrand();
            const categories = await getAllCategory();
            const colors = await getAllColor();
            const soles = await getAllSole();
            const materials = await getAllMaterial();
            setData({ brands, categories, colors, soles, materials, productGenders: PRODUCT_GENDER, shoeHeights: SHOE_HEIGHT, benefits: BENEFIT, shoeFeels: SHOE_FEEL, surfaces: SURFACE });
        }
        fetchData();
    }, [])

    const checkParamInclude = (key, value) => {
        const colorsParam = searchParams.get(key);
        return colorsParam != null && colorsParam.split(',').includes(value);
    }

    const handleCheckParam = (key, value) => {
        const colorsParam = searchParams.get(key);
        if (colorsParam != null) {
            const colors = colorsParam.split(',');

            const index = colors.indexOf('');
            if (index !== -1) {
                colors.splice(index, 1);
            }

            if (colors.includes(value)) {
                colors.splice(colors.indexOf(value), 1);
            } else {
                colors.push(value);
            }
            setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                [key]: colors.join()
            })
        } else {
            setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                [key]: value
            });
        }
    }

    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - 100000), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + 100000)]);
        }
    };

    return (
        <div>
            <Accordion sx={{ background: "none" }} disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                    <Typography sx={{ fontWeight: 'bold' }} variant='h6' color={"grey"}>THƯƠNG HIỆU</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl>
                        {
                            data.brands &&
                            data.brands.map(entity => (
                                <FormControlLabel key={entity.id} label={entity.name}
                                    control={<Checkbox checked={checkParamInclude('brand', entity.id.toString())} onChange={() => { handleCheckParam('brand', entity.id.toString()) }}
                                        icon={<RadioButtonUncheckedIcon style={{ fill: '#AAAAAA' }} />}
                                        checkedIcon={<CheckCircleOutlineIcon style={{ fill: '#222222' }} />} />} />
                            ))
                        }
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ background: "none" }} disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                    <Typography sx={{ fontWeight: 'bold' }} variant='h6' color={"grey"}>DANH MỤC</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl>
                        {
                            data.categories &&
                            data.categories.map(entity => (
                                <FormControlLabel key={entity.id} label={entity.name}
                                    control={<Checkbox checked={checkParamInclude('category', entity.id.toString())} onChange={() => { handleCheckParam('category', entity.id.toString()) }}
                                        icon={<RadioButtonUncheckedIcon style={{ fill: '#AAAAAA' }} />}
                                        checkedIcon={<CheckCircleOutlineIcon style={{ fill: '#222222' }} />} />} />
                            ))
                        }
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ background: "none" }} disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                    <Typography sx={{ fontWeight: 'bold' }} variant='h6' color={"grey"}>DÀNH CHO</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl>
                        {
                            data.productGenders &&
                            data.productGenders.map(entity => (
                                <FormControlLabel key={entity.name} label={entity.description}
                                    control={<Checkbox checked={checkParamInclude('gender', entity.name)} onChange={() => { handleCheckParam('gender', entity.name) }}
                                        icon={<RadioButtonUncheckedIcon style={{ fill: '#AAAAAA' }} />}
                                        checkedIcon={<CheckCircleOutlineIcon style={{ fill: '#222222' }} />} />} />
                            ))
                        }
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ background: "none" }} disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                    <Typography sx={{ fontWeight: 'bold' }} variant='h6' color={"grey"}>MỨC GIÁ</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack direction="row" justifyContent="center">
                        <Typography variant='body2'>
                            {`${fCurrency(value1[0])} - ${fCurrency(value1[1])}`}
                        </Typography>
                    </Stack>
                    <Slider
                        size='small'
                        min={100000} max={10000000}
                        value={[searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 100000, searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 10000000]}
                        onChange={handleChange1}
                        onChangeCommitted={() => { setSearchParams({ ...Object.fromEntries(searchParams.entries()), minPrice: value1[0], maxPrice: value1[1] }) }}
                        step={100000}
                        disableSwap
                        sx={{ color: '#555555' }}
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ background: "none" }} disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                    <Typography sx={{ fontWeight: 'bold' }} variant='h6' color={"grey"}>MÀU SẮC</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl>
                        <Grid container>
                            {
                                data.colors && data.colors.map(entity => (
                                    <Grid item xs={2} key={entity.id}>
                                        <FormControlLabel
                                            control={<Checkbox checked={checkParamInclude('color', entity.id.toString())} onChange={() => { handleCheckParam('color', entity.id.toString()) }} icon={<SquareIcon style={{ fill: entity.code }} />}
                                                checkedIcon={<CheckBoxIcon style={{ fill: entity.code }} />} />} />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ background: "none" }} disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                    <Typography sx={{ fontWeight: 'bold' }} variant='h6' color={"grey"}>ĐẾ GIÀY</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl>
                        {
                            data.soles &&
                            data.soles.map(entity => (
                                <FormControlLabel key={entity.id} label={entity.name}
                                    control={<Checkbox checked={checkParamInclude('sole', entity.id.toString())} onChange={() => { handleCheckParam('sole', entity.id.toString()) }}
                                        icon={<RadioButtonUncheckedIcon style={{ fill: '#AAAAAA' }} />}
                                        checkedIcon={<CheckCircleOutlineIcon style={{ fill: '#222222' }} />} />} />
                            ))
                        }
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ background: "none" }} disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                    <Typography sx={{ fontWeight: 'bold' }} variant='h6' color={"grey"}>CHẤT LIỆU</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl>
                        {
                            data.materials &&
                            data.materials.map(entity => (
                                <FormControlLabel key={entity.id} label={entity.name}
                                    control={<Checkbox checked={checkParamInclude('material', entity.id.toString())} onChange={() => { handleCheckParam('material', entity.id.toString()) }}
                                        icon={<RadioButtonUncheckedIcon style={{ fill: '#AAAAAA' }} />}
                                        checkedIcon={<CheckCircleOutlineIcon style={{ fill: '#222222' }} />} />} />
                            ))
                        }
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ background: "none" }} disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                    <Typography sx={{ fontWeight: 'bold' }} variant='h6' color={"grey"}>CHIỀU CAO</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl>
                        {
                            data.shoeHeights &&
                            data.shoeHeights.map(entity => (
                                <FormControlLabel key={entity.name} label={entity.description}
                                    control={< Checkbox checked={checkParamInclude('height', entity.name)} onChange={() => { handleCheckParam('height', entity.name) }}
                                        icon={<RadioButtonUncheckedIcon style={{ fill: '#AAAAAA' }} />}
                                        checkedIcon={<CheckCircleOutlineIcon style={{ fill: '#222222' }} />} />} />
                            ))
                        }
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ background: "none" }} disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                    <Typography sx={{ fontWeight: 'bold' }} variant='h6' color={"grey"}>CẢM GIÁC</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl>
                        {
                            data.shoeFeels &&
                            data.shoeFeels.map(entity => (
                                <FormControlLabel key={entity.name} label={entity.description}
                                    control={< Checkbox checked={checkParamInclude('feel', entity.name)} onChange={() => { handleCheckParam('feel', entity.name) }}
                                        icon={<RadioButtonUncheckedIcon style={{ fill: '#AAAAAA' }} />}
                                        checkedIcon={<CheckCircleOutlineIcon style={{ fill: '#222222' }} />} />} />
                            ))
                        }
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ background: "none" }} disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                    <Typography sx={{ fontWeight: 'bold' }} variant='h6' color={"grey"}>BỀ MẶT</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl>
                        {
                            data.surfaces &&
                            data.surfaces.map(entity => (
                                <FormControlLabel key={entity.name} label={entity.description}
                                    control={< Checkbox checked={checkParamInclude('surface', entity.name)} onChange={() => { handleCheckParam('surface', entity.name) }}
                                        icon={<RadioButtonUncheckedIcon style={{ fill: '#AAAAAA' }} />}
                                        checkedIcon={<CheckCircleOutlineIcon style={{ fill: '#222222' }} />} />} />
                            ))
                        }
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ background: "none" }} disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                    <Typography sx={{ fontWeight: 'bold' }} variant='h6' color={"grey"}>THỜI TIẾT THÍCH HỢP</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl>
                        {
                            data.benefits &&
                            data.benefits.map(entity => (
                                <FormControlLabel key={entity.name} label={entity.description}
                                    control={< Checkbox checked={checkParamInclude('benefit', entity.name)} onChange={() => { handleCheckParam('benefit', entity.name) }}
                                        icon={<RadioButtonUncheckedIcon style={{ fill: '#AAAAAA' }} />}
                                        checkedIcon={<CheckCircleOutlineIcon style={{ fill: '#222222' }} />} />} />
                            ))
                        }
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            {
                !searchParams.entries().next().done &&
                <Stack direction="row" justifyContent="center" pt={1}>
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

const PRODUCT_GENDER = [
    { name: 'MEN', description: 'Nam' },
    { name: 'WOMAN', description: 'Nữ' },
    { name: 'UNISEX', description: 'Unisex' },
]

const SHOE_HEIGHT = [
    { name: 'LOW_TOP', description: 'Cổ Thấp' },
    { name: 'MID_TOP', description: 'Cổ Vừa' },
    { name: 'HIGH_TOP', description: 'Cổ Cao' }
]

const BENEFIT = [
    { name: 'NEUTRAL', description: 'Bình thường' },
    { name: 'WARM', description: 'Thời tiết ấm áp' },
    { name: 'COLD', description: 'Thời tiết lạnh' },
    { name: 'HUMID', description: 'Thời tiết ẩm ướt' },
]

const SHOE_FEEL = [
    { name: 'NEUTRAL', description: 'Ổn định' },
    { name: 'FLEXIBLE', description: 'Thoải mái linh hoạt' },
    { name: 'SRPINGY', description: 'Co dãn đàn hồi' },
    { name: 'SOFT', description: 'Mềm mại' },
]

const SURFACE = [
    { name: 'NEUTRAL', description: 'Bình thường' },
    { name: 'FIRM', description: 'Kiên cố' },
    { name: 'HARD_COURT', description: 'Sân cứng' },
    { name: 'INDOOR_COURT', description: 'Sân đấu trong nhà' },
    { name: 'ROAD', description: 'Đường' },
    { name: 'TRAIL', description: 'Đường mòn' },
    { name: 'TURF', description: 'Sân cỏ' },
]
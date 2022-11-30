import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Avatar, Card, Divider, Grid, Pagination, Rating, Stack, Typography } from '@mui/material';
import { findRatesByProductID } from '../../services/RateService';
import { showSnackbar } from '../../services/NotificationService';

export default function ProductDetailDescription({ productId, score, description }) {

    const [rates, setRates] = useState();

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        findRatesByProductID(productId).then(data => {
            setRates(data);
        })
    }, []);


    const handleChangePage = (event, page) => {
        findRatesByProductID(productId, { page }).then(data => {
            console.log(data);
            setRates(data);
        }).catch(() => {
            showSnackbar("Có lỗi xảy ra, hãy thử lại sau.", "error");
        });
    }

    return (<>
        <Box mt={2} sx={{ width: '100%', typography: 'body1', border: '1px solid', borderColor: 'divider', borderRadius: 2}}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}
                        variant="fullWidth"
                        aria-label="full width tabs example" centered>
                        <Tab label="ĐÁNH GIÁ SẢN PHẨM" value="1" />
                        <Tab label="MÔ TẢ SẢN PHẨM" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    {
                        rates && score !== 0 &&
                        <>
                            <Grid container>
                                <Grid item container xs={12} md={4} justifyContent="center">
                                    <Typography className='text-danger p-5 pt-0 pb-0' variant="h1" component="h2">
                                        {score.toFixed(1)}/5&nbsp;
                                    </Typography>
                                    <Rating className='p-4 pt-0 pb-5' name="size-large" defaultValue={score.toFixed(1)} size="large" precision={0.1} readOnly />
                                </Grid>
                            </Grid>
                            <Stack spacing={3} divider={<Divider />}>
                                {
                                    rates.content.map(rate => (
                                        <Box key={rate.id}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={1} container justifyContent={"flex-end"}>
                                                    <Avatar alt="avt" src={rate.picture} imgProps={{ referrerPolicy: "no-referrer" }} />
                                                </Grid>
                                                <Grid item>
                                                    <Stack spacing={1}>
                                                        <Typography variant='subtitle1'>
                                                            {rate.fullname}
                                                        </Typography>
                                                        <Rating className='m-0' name="size-small" defaultValue={rate.score} size="small" readOnly />
                                                        <Typography variant='body2' className='m-0' color="lightslategray">
                                                            {new Date(rate.createDate).toLocaleDateString()} | Cỡ {rate.size}
                                                        </Typography>
                                                        <Box>
                                                            {rate.comment}
                                                        </Box>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    ))
                                }
                                <Stack alignItems={"center"} spacing={3} py={2}>
                                    <Pagination count={rates.totalPages} page={rates.number + 1} siblingCount={0} onChange={handleChangePage} />
                                </Stack>
                            </Stack>
                        </>
                    }

                    {
                        (rates == null || score === 0) &&
                        <Typography>
                            Chưa có đánh giá
                        </Typography>
                    }
                </TabPanel>
                <TabPanel value="2">
                    <Typography variant='body1'>
                        {description}
                    </Typography>
                </TabPanel>
            </TabContext>
        </Box>
    </>);
}

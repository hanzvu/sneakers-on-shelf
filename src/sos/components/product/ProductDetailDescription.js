import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Avatar, Button, Grid, Rating, TablePagination, Typography } from '@mui/material';
import { Container } from 'react-bootstrap';
import PersonIcon from '@mui/icons-material/Person';
import { findRatesByProductID } from '../../services/RateService';

const filter = [
    { value: 0, description: 'Tất Cả' },
    { value: 5, description: '5 Sao' },
    { value: 4, description: '4 Sao' },
    { value: 3, description: '3 Sao' },
    { value: 2, description: '2 Sao' },
    { value: 1, description: '1 Sao' },
    { value: 6, description: 'Đánh Giá Mới Nhất' }
];

export default function ProductDetailDescription(products) {
    const [value, setValue] = React.useState('3');
    const [rate, setRate] = React.useState();
    const [totalElements, setTotalElements] = React.useState(100);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selectedFilter, setSelectedFilter] = React.useState(filter[0].description);
    const [score, setScore] = React.useState(0);
    const [scoreTB, setScoreTB] = React.useState(0);

    React.useEffect(() => {
        findRatesByProductID(products.product.id, score, page, rowsPerPage).then(rates => {
            setRate(rates.data)
            setTotalElements(rates.data.totalElements)
            setScoreTB(Math.round((rates.data.content[0].totalScore/rates.data.totalElements)*10)/10)
        })
    }, [products.product.id])

    const handleChangeFilter = (event) => {
        findRatesByProductID(products.product.id, score, 0, rowsPerPage).then(rates => {
            setRate(rates.data)
            setTotalElements(rates.data.totalElements)
        })
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        findRatesByProductID(products.product.id, score, newPage, rowsPerPage).then(rates => {
            setRate(rates.data)
            setTotalElements(rates.data.totalElements)
        })
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        findRatesByProductID(products.product.id, score, 0, parseInt(event.target.value, 10)).then(rates => {
            setRate(rates.data)
            setTotalElements(rates.data.totalElements)
        })
    };

    const formatDatetime = date => (new Intl.DateTimeFormat(['ban', 'id'], {
        year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(date))

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (<>
        <Container className='m-0 p-0'>
            <div className="mt-4">
                <div className="card">
                    <div className="card-body p-0">
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange}
                                        variant="fullWidth"
                                        aria-label="full width tabs example" centered>
                                        <Tab label="CHI TIẾT SẢN PHẨM" value="1" />
                                        <Tab label="MÔ TẢ SẢN PHẨM" value="2" />
                                        <Tab label="ĐÁNH GIÁ SẢN PHẨM" value="3" />
                                    </TabList>
                                </Box>

                                <TabPanel value="1">
                                    <div>
                                        <ul className="list-unstyled info-desc">
                                            <li className="d-flex mb-2">
                                                <strong>Tên Sản Phẩm: </strong>
                                                <span>&nbsp; {products.product.name}</span>
                                            </li>
                                            <li className="d-flex mb-2">
                                                <strong>Giá Bán: </strong>
                                                <span>&nbsp; {products.product.sellPrice} VND</span>
                                            </li>
                                            <li className="d-flex mb-2">
                                                <strong>Đối Tượng Sử Dụng: </strong>
                                                <span>&nbsp; {products.product.productGender}</span>
                                            </li>
                                            <li className="d-flex mb-2">
                                                <strong>Thương Hiệu: </strong>
                                                <span>&nbsp; {products.product.brand}</span>
                                            </li>
                                            <li className="d-flex mb-2">
                                                <strong>Danh Mục: </strong>
                                                <span>&nbsp; {products.product.category}</span>
                                            </li>
                                            <li className="d-flex">
                                                <strong>Size: </strong>
                                                {
                                                    products.product.productDetails.map((p) =>
                                                    <span key={p.id}>&nbsp; {p.size}</span>
                                                    )
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                </TabPanel>
                                <TabPanel value="2">
                                    <Typography>{products.product.description}</Typography>
                                </TabPanel>
                                <TabPanel value="3">
                                    <div className='row mb-5'>
                                        <div className='col-md-5 col-xs-12'>
                                            <div className='row'>
                                                <Typography className='text-danger' align='center' variant="h2" component="h2">
                                                    {scoreTB} / 5
                                                </Typography>
                                                <Typography align='center'>
                                                    {scoreTB !== 0 && (
                                                        <Rating name="size-large" defaultValue={scoreTB} precision={0.1} size="large" readOnly />
                                                    )}
                                                    {scoreTB === 0 && (
                                                        <Rating name="size-large" defaultValue={0} precision={0.1} size="large" readOnly />
                                                    )}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className='col-md-7 col-xs-12 align-self-center'>
                                            {
                                                filter.map((f, i) => (
                                                    <Button key={i} color='inherit' variant={`${f.description === selectedFilter ? 'contained' : 'outlined'}`} className='m-2' onFocus={() => { setSelectedFilter(f.description); setScore(f.value) }} onClick={handleChangeFilter} >{f.description}</Button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    {rate && (
                                        <>
                                            {rate.empty === true && (
                                                <>
                                                    <Typography align='center' padding={5} paddingTop={0}>Chưa có đánh giá nào</Typography>
                                                </>
                                            )}
                                            {rate.empty === false && (
                                                <>
                                                    {rate.content.map((r) => (
                                                        <Box key={r.id}>
                                                            <Grid container spacing={5} pl={3}>
                                                                {r.picture
                                                                    ?
                                                                    <>
                                                                        <Grid item xs={0.7} alignSelf="center">
                                                                            <Avatar src={r.picture}> </Avatar>
                                                                        </Grid>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <Grid item xs={0.7} alignSelf="center">
                                                                            <Avatar><PersonIcon /></Avatar>
                                                                        </Grid>
                                                                    </>
                                                                }
                                                                <Grid item xs={9} >
                                                                    <Typography variant='h6'>{r.fullname}</Typography>
                                                                    <Rating name="size-small" defaultValue={r.score} size="small" readOnly />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container spacing={5} pl={3} mb={5}>
                                                                <Grid item xs={0.7} alignSelf="center"> </Grid>
                                                                <Grid item xs={9} >
                                                                    <Typography variant='body2' p={1} pl={0}>{formatDatetime(new Date(r.createDate))}<span className="text-sm text-muted font-weight-normal ml-3">&nbsp;| Phân loại hàng: size {r.size} </span></Typography>
                                                                    <Typography variant='body1'>{r.comment}</Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    ))
                                                    }
                                                    <hr />
                                                    <Grid alignSelf="center">
                                                        <TablePagination
                                                            component="div"
                                                            count={totalElements}
                                                            page={page}
                                                            onPageChange={handleChangePage}
                                                            rowsPerPage={rowsPerPage}
                                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                                        />
                                                    </Grid>
                                                </>
                                            )}
                                        </>
                                    )}
                                    {!rate && (
                                         <Typography align='center' padding={5} paddingTop={0}>Chưa có đánh giá nào</Typography>
                                    )}
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </div>
                </div>
            </div>
        </Container>
    </>);
}



import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Avatar, Grid, Rating, TablePagination, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { findRatesByProductID } from '../../services/RateService';



export default function ProductDetailDescription(product) {
    const [value, setValue] = React.useState('3');
    const [avatar, setAvatar] = React.useState("assets/img/user");
    const [rate, setRate] = React.useState();
    const [totalElements, setTotalElements] = React.useState(100);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    React.useEffect(() => {
        findRatesByProductID(product.id, page, rowsPerPage).then(rates => {
            setRate(rates.data)
            setTotalElements(rates.data.totalElements)
        })
    }, [product.id])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        findRatesByProductID(product.id, newPage, rowsPerPage).then(rates => {
            setRate(rates.data)
            setTotalElements(rates.data.totalElements)
        })
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        findRatesByProductID(product.id, 0, parseInt(event.target.value, 10)).then(rates => {
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
        <div className="container">
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
                                            <li className="d-flex mb-1">
                                                <strong>Weight: </strong>
                                                <span>&nbsp; 400 g</span>
                                            </li>
                                            <li className="d-flex mb-1">
                                                <strong>Dimensions: </strong>
                                                <span>&nbsp; 10 x 10 x 15 cm</span>
                                            </li>
                                            <li className="d-flex mb-1">
                                                <strong>Materials: </strong>
                                                <span>&nbsp; 60% cotton, 40% polyester</span>
                                            </li>
                                            <li className="d-flex mb-1">
                                                <strong>Color: </strong>
                                                <span>&nbsp; Blue, Gray, Green, Red, Yellow</span>
                                            </li>
                                            <li className="d-flex">
                                                <strong>Size: </strong>
                                                <span>&nbsp; 39, 40, 41 , 42</span>
                                            </li>
                                        </ul>
                                    </div>
                                </TabPanel>
                                <TabPanel value="2">
                                    <div>
                                        <p>Đây là phần mô tả khái quát</p>

                                        <h4>Product Features</h4>

                                        <ul className="">
                                            <li>Mô tả chi tiết: ví dụ</li>
                                            <li>Mapped with 3M™ Thinsulate™ Insulation [40G Body / Sleeves / Hood]</li>
                                            <li>Embossed Taffeta Lining</li>
                                            <li>DRYRIDE Durashell™ 2-Layer Oxford Fabric [10,000MM, 5,000G]</li>
                                        </ul>

                                    </div>
                                </TabPanel>
                                <TabPanel value="3">
                                    <div className='row mb-5'>
                                        <div className='col-md-5 col-xs-12'>
                                            <div className='row'>
                                                <Typography className='text-danger' align='center' variant="h1" component="h2">
                                                    5/5
                                                </Typography>
                                                <Typography align='center'>
                                                    <Rating name="size-large" defaultValue={5} size="large" readOnly />
                                                </Typography>

                                            </div>
                                        </div>
                                        <div className='col-md-7 col-xs-12'>
                                            Bộ lọc đánh giá ở đây
                                        </div>
                                    </div>
                                    {rate != null && (
                                        <>
                                            {
                                                rate.content.map((r) => (
                                                    <Box key={r.id}>
                                                        {r.picture !== "" &&
                                                            (setAvatar(`assets/img/${r.picture}`))
                                                        }
                                                        <Grid container spacing={5} pl={3}>
                                                            {r.picture === ""
                                                                ? <>
                                                                    <Grid item xs={0.7} alignSelf="center">
                                                                        <Avatar><PersonIcon /></Avatar>
                                                                    </Grid>
                                                                </>
                                                                : <>
                                                                    <Grid item xs={0.7} alignSelf="center">
                                                                        <Avatar src={avatar}> </Avatar>
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
                                                        <hr />
                                                    </Box>
                                                ))
                                            }
                                        </>
                                    )}
                                    <Grid alignSelf="center">
                                        <TablePagination
                                            component="controller"
                                            count={totalElements}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            rowsPerPage={rowsPerPage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </Grid>
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    </>);
}



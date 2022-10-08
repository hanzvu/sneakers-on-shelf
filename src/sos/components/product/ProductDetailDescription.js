import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import { Grid, Rating, TextField, Typography } from '@mui/material';
import user from '../assets/img/user.png';

export default function ProductDetailDescription() {
    const [value, setValue] = React.useState('1');
    const [valueRate, setValueRate] = React.useState(2);

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
                                    <div>
                                        <div className="row">
                                            <div className="col-lg-7">
                                                <div className='row'>
                                                    <div className='col-md-5 col-xs-12'>
                                                        <Typography className='text-danger p-5 pt-0 pb-0' variant="h1" component="h2">
                                                            5/5
                                                        </Typography>
                                                        <Rating className='p-4 pt-0 pb-5' name="size-large" defaultValue={5} size="large" readOnly />
                                                    </div>
                                                    <div className='col-md-7 col-xs-12'>
                                                        Bộ lọc đánh giá ở đây
                                                    </div>
                                                </div>

                                                <div className="media review-block mb-4">
                                                    <div className="media-body">
                                                        <div className="product-review">
                                                            <Rating name="size-small" defaultValue={5} size="small" readOnly />
                                                        </div>
                                                        <h6>Nguyễn Văn Hoàng<span className="text-sm text-muted font-weight-normal ml-3">&nbsp;- June 23, 2019</span></h6>
                                                        <p>Hàng đẹp, chất lượng. Giao hàng nhanh!</p>
                                                    </div>
                                                </div>

                                                <div className="media review-block">
                                                    <div className="media-body">
                                                        <div className="product-review">
                                                            <Rating name="size-small" defaultValue={1} size="small" readOnly />
                                                        </div>
                                                        <h6>Vua Bùng Hàng<span className="text-sm text-muted font-weight-normal ml-3">&nbsp;-June 23, 2019</span></h6>
                                                        <p>Chưa nhận hàng nhưng đã thấy xấu. Chất lượng kém ai dám nhận? Cho 1 sao vì dịch vụ kém</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-5">
                                                <div className="review-comment mt-5 mt-lg-0">
                                                    <h4 className="mb-3">Add a Review</h4>

                                                    <form action="#">
                                                        <div className="row pb-0">
                                                            <p className='col-md-5 col-xs-12 mb-2'>Đánh giá sản phẩm: </p>

                                                            <Rating className='col-md-6 col-sx-12'
                                                                name="simple-controlled"
                                                                value={valueRate}
                                                                onChange={(event, newValue) => {
                                                                    setValueRate(newValue);
                                                                }}
                                                            />
                                                        </div>

                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12}>
                                                                <TextField label="Full name" variant="outlined" size="small" color="success" required fullWidth />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField label="Email" type="email" variant="outlined" size='small' color="success" required fullWidth />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField label="Comment" multiline maxRows={5} color="success" rows={4} required fullWidth />
                                                            </Grid>
                                                        </Grid>

                                                        {/* <a routerLink="/product-single" className="btn btn-main btn-small">Submit Review</a> */}
                                                        <Button className='mt-3' variant="outlined" color="success">
                                                            Submit Review
                                                        </Button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

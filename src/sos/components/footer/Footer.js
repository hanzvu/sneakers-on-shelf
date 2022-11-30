import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Box, Button, Link, SpeedDial, SpeedDialIcon } from '@mui/material';

export default function Footer() {
    return (
        <div className='mt-5'>
            <footer className="footer">
                <hr />
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-5 col-sm-6 mb-5 mb-lg-0 text-sm-left mr-auto">
                            <div className="footer-widget">
                                <h4 className="mb-4">SOS-Shop</h4>
                                <div className="">
                                    <p className="mb-1"><strong>Địa chỉ : </strong>Số 1 Nguyễn Trãi, Thanh Xuân, Hà Nội</p>
                                    <p className="mb-1"><strong>Số điện thoại : </strong><a className="text-decoration-none text-dark" href="tel:0843442263">0844.488.888</a></p>
                                    <p><strong>Email hỗ trợ: </strong> <a className="text-decoration-none text-dark" href="mailto:sneakersonshelf@gmail.com">sneakersonshelf@gmail.com</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-2 col-sm-6 mb-5 mb-lg-0 text-sm-left">
                            <div className="footer-widget">
                                <h4 className="mb-4">Danh Mục</h4>
                                <ul className="pl-0 list-unstyled" >
                                    <li className='mb-1'>
                                        <Link underline="none" color="inherit" to={'/products?gender=MEN'} component={RouterLink}>
                                            Giày Nam
                                        </Link>
                                    </li>
                                    <li className='mb-1'>
                                        <Link underline="none" color="inherit" to={'/products?gender=WOMAN'} component={RouterLink}>
                                            Giày Nữ
                                        </Link>

                                    </li>
                                    <li>
                                        <Link underline="none" color="inherit" to={'/products?sort=best_selling'} component={RouterLink}>
                                            Hàng Bán Chạy
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-2 col-sm-6 mb-5 mb-lg-0 text-sm-left">
                            <div className="footer-widget">
                                <h4 className="mb-4">Link Hỗ Trợ</h4>
                                <ul className="pl-0 list-unstyled mb-0">
                                    <li className='mb-1'>
                                        <Link underline="none" color="inherit" to={'/products'} component={RouterLink}>
                                            Hỗ trợ
                                        </Link>
                                    </li>
                                    <li className='mb-1'>
                                        <Link underline="none" color="inherit" to={'/products'} component={RouterLink}>
                                            Cửa hàng của chúng tôi
                                        </Link>
                                    </li>
                                    <li>
                                        <Link underline="none" color="inherit" to={'/products'} component={RouterLink}>
                                            Liên hệ
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3 col-sm-6 text-sm-left mb-3">
                            <div className="footer-widget">
                                <h4 className="mb-4">Giờ Mở Cửa</h4>
                                <ul className="pl-0 list-unstyled mb-3">
                                    <li className="d-lg-flex justify-content-between mb-1">Thứ Hai - Thứ Sáu <span>8.00-22.00</span></li>
                                    <li className="d-lg-flex justify-content-between mb-1">Thứ 7 <span>10.00-22.00</span></li>
                                    <li className="d-lg-flex justify-content-between">Chủ Nhật <span>12.00-23.59</span></li>
                                </ul>

                                <h5><a className="text-decoration-none text-dark" href="tel:0843442263">Call Now : 0844.488.888</a></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>


            <div className="footer-btm py-4 bg-white">
                <div className="container">
                    <div className="row ">
                        <div className="col-lg-12">
                            <p className="copyright mb-0 ">@ Copyright Reserved to SOS &amp; made by <a className="text-decoration-none text-dark" href="#">Sneaker On Shelf</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
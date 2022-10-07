import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

export default function Footer() {
    return (
        <div className='mt-5'>
            <footer className="footer">
                <div className="container">
                <div className="row">
                        <div className="col-md-6 col-lg-5 col-sm-6 mb-5 mb-lg-0 text-sm-left mr-auto">
                        <div className="footer-widget">
                                <h4 className="mb-4">SOS-Shop</h4>                                
                                <div className="">
                                    <p className="mb-1"><strong>Location : </strong>Số 1 Nguyễn Trãi, Thanh Xuân, Hà Nội</p>
                                    <p className="mb-1"><strong>Phone Number : </strong> 0843 442 262</p>
                                    <p><strong>Support Email : </strong> hotrokhachhangsos.shop@gmail.com</p>
                                </div>
                        </div>
                        </div>
                        <div className="col-md-6 col-lg-2 col-sm-6 mb-5 mb-lg-0 text-sm-left">
                            <div className="footer-widget">
                            <h4 className="mb-4">Category</h4>
                            <ul className="pl-0 list-unstyled" >      
                                <li className='mb-1'>
                                    <Link underline="none" color="inherit" to={'/products'} component={RouterLink}>
                                    Giày nam
                                    </Link>
                                </li>
                                <li className='mb-1'>
                                    <Link underline="none" color="inherit" to={'/products'} component={RouterLink}>
                                    Giày nữ
                                    </Link>
                                </li>
                                <li>
                                    <Link underline="none" color="inherit" to={'/products'} component={RouterLink}>
                                    Hàng bán chạy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        </div>
            
                        <div className="col-md-6 col-lg-2 col-sm-6 mb-5 mb-lg-0 text-sm-left">
                            <div className="footer-widget">
                                <h4 className="mb-4">Useful Link</h4>
                                <ul className="pl-0 list-unstyled mb-0">
                                    <li className='mb-1'>
                                        <Link underline="none" color="inherit" to={'/products'} component={RouterLink}>
                                        Support
                                        </Link>
                                    </li>
                                    <li className='mb-1'>
                                        <Link underline="none" color="inherit" to={'/products'} component={RouterLink}>
                                        Our Shop
                                        </Link>
                                    </li>
                                    <li>
                                        <Link underline="none" color="inherit" to={'/products'} component={RouterLink}>
                                        Contact Us
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
            
                        <div className="col-md-6 col-lg-3 col-sm-6 text-sm-left">
                            <div className="footer-widget">
                            <h4 className="mb-4">Opening Hours</h4>
                            <ul className="pl-0 list-unstyled mb-3">
                            <li className="d-lg-flex justify-content-between mb-1">Monday-Friday <span>8.00-20.00</span></li>
                            <li className="d-lg-flex justify-content-between mb-1">Saturday <span>10.00-20.00</span></li>
                            <li className="d-lg-flex justify-content-between">Sunday <span>12-20.00</span></li>
                            </ul>
            
                            <h5>Call Now : 0843 442 263</h5>
                        </div>
                        </div>
                    </div>
                </div>
            </footer>
            
            
            <div className="footer-btm py-4">
                <div className="container">
                <div className="row ">
                        <div className="col-lg-6">
                            <p className="copyright mb-0 ">@ Copyright Reserved to SOS &amp; made by <a className="text-decoration-none text-dark" href="#">Sneaker On Shelf</a></p>
                        </div>
                        {/* <div className="col-lg-6 d-lg-flex justify-content-between">
                            <ul className="list-inline mb-0 footer-btm-links text-lg-right mt-2 mt-lg-0">
                            <li className="list-inline-item"><a className="text-decoration-none text-dark" href="#">Privacy Policy</a></li>
                            <li className="list-inline-item"><a className="text-decoration-none text-dark" href="#">Terms &amp; Conditions</a></li>
                            <li className="list-inline-item"><a className="text-decoration-none text-dark" href="#">Cookie Policy</a></li>
                            <li className="list-inline-item"><a className="text-decoration-none text-dark" href="#">Terms of Sale</a></li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
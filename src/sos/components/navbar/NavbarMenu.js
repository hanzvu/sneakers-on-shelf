import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

export default function NavbarMenu() {
    return (<>
        <nav id="mynavbar" className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className='nav-link text-light' to={'/'} component={RouterLink}>TRANG CHỦ</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className='nav-link text-light' to={'/products'} component={RouterLink}>
                                SẢN PHẨM
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link text-light' to={'/products?gender=MEN'} component={RouterLink}>
                                GIÀY NAM
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link text-light' to={'/products?gender=WOMAN'} component={RouterLink}>
                                GIÀY NỮ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link text-light' to={'/products?sort=best_selling'} component={RouterLink}>
                                HÀNG BÁN CHẠY
                            </Link>
                        </li>
                        <li className="nav-item d-block d-sm-none">
                            <Link className='nav-link text-light' to={'/cart'} component={RouterLink}>
                                GIỎ HÀNG
                            </Link>
                        </li>
                        <li className="nav-item d-block d-sm-none">
                            <Link className='nav-link text-light' to={'/login'} component={RouterLink}>
                                ĐĂNG NHẬP
                            </Link>
                        </li>
                        <li className="nav-item d-block d-sm-none">
                            <Link className='nav-link text-light' to={'/account'} component={RouterLink}>
                                TÀI KHOẢN
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>)
}

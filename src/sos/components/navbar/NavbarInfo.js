import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Badge, Box, Link, Stack, styled } from '@mui/material';
import { useSelector } from 'react-redux';

export default function NavbarInfo() {

    const cart = useSelector(state => state.cart.cart)

    const account = useSelector(state => state.account.account)

    return (<>
        <div className="col-4 d-none d-md-block">
            <div className="h-100 row d-flex justify-content-center m-0">
                <div className="col-6 px-0 d-flex justify-content-center align-items-center">
                    <Stack alignItems={"center"}>
                        {
                            account.email &&
                            <>
                                {
                                    account.picture &&
                                    <Link to={"/account"} component={RouterLink}>
                                        <Avatar alt="avt" src={account.picture} imgProps={{ referrerPolicy: "no-referrer" }} />
                                    </Link>
                                }
                                {
                                    account.picture == null &&
                                    <Link className="text-dark h2 m-0 bi bi-person-circle" to={'/account'} />
                                }
                                <Link variant="subtitle2" underline="hover" to={"/account"} color="inherit" component={RouterLink}>{account.fullname}</Link>
                            </>
                        }

                        {
                            !account.email &&
                            <>
                                <Link className="text-dark h2 m-0 bi bi-person-circle" to={'/login'} />
                                <div>
                                    <Link variant="subtitle2" underline="hover" to={"/login"} color="inherit" component={RouterLink}>Đăng nhập</Link> / <Link variant="subtitle2" underline="hover" to={"/register"} color="inherit" component={RouterLink}>Đăng ký</Link>
                                </div>
                            </>
                        }

                    </Stack>

                </div>
                <div className="px-3 col-3 d-flex flex-column justify-content-center align-items-center">
                    <div className="position-relative">
                        <Stack alignItems={"center"}>
                            <Badge badgeContent={cart.items && cart.items.length > 0 ? cart.items.length : ''} invisible={cart.items == null || cart.items.length === 0} color="secondary">
                                <Link className="text-dark h2 m-0 bi bi-cart3" to={'/cart'} component={RouterLink} />
                            </Badge>
                            <Link variant="subtitle2" underline="hover" color="inherit" to={"/cart"} component={RouterLink}>Giỏ hàng</Link>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
});
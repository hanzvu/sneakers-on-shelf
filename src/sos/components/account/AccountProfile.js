import { useSelector } from 'react-redux';
import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom';
// @mui
import { Container, Grid, Stack, Paper, Link, Typography } from '@mui/material';
import { logout } from '../../services/AuthenticationService';
// sections

// ----------------------------------------------------------------------

export default function AccountProfile() {

    const account = useSelector(state => state.account.account)

    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/', { replace: true });
    }

    return (
        <Grid container spacing={3}>
            <Grid container item lg={3} xs={12}>
                <Container disableGutters>
                    <Paper elevation={3} square>
                        <Stack spacing={2} p={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={3}>
                                    <img alt="avatar" src="http://bizweb.dktcdn.net/100/413/756/themes/837736/assets/account.png?1637743737568" />
                                </Grid>
                                <Grid item xs={9} container alignItems={"flex-end"}>
                                    <Typography variant='subtitle1' color={"dimgray"}>
                                        {account.fullname}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Link variant="subtitle1" underline="hover" to={"/account"} color="inherit" component={RouterLink}>Cập Nhật Thông Tin</Link>
                            <Link variant="subtitle1" underline="hover" to={"/account/purchase"} color="inherit" component={RouterLink}>Đơn Hàng</Link>
                            <Link variant="subtitle1" underline="hover" to={"/account/address"} color="inherit" component={RouterLink}>Địa Chỉ</Link>
                            {
                                account.username != null &&
                                <Link variant="subtitle1" underline="hover" to={"/account/change-password"} color="inherit" component={RouterLink}>Đổi Mật Khẩu</Link>
                            }
                            <Link variant="subtitle1" underline="hover" to={"/account/logout"} onClick={handleLogout} color="inherit" component={RouterLink}>Đăng Xuất</Link>
                        </Stack>
                    </Paper>
                </Container>
            </Grid>
            <Grid item lg={9} xs={12}>
                <Outlet />
            </Grid>
        </Grid >
    );
}

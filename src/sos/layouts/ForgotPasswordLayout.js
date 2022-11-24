import { Box, Container, Link, styled, Typography } from "@mui/material";
import Page from "../../components/Page";
import ForgotPassword from "../components/login/ForgotPassword";


const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

export default function ForgotPasswordLayout() {

    return (<>
        <Page title="Quên mật khẩu">
            <RootStyle>
                <Container maxWidth="sm">
                    <Box pt={3}>
                        <Typography variant="h4" textAlign={"center"} gutterBottom>
                            QUÊN MẬT KHẨU
                        </Typography>
                        <ForgotPassword />
                    </Box>
                </Container>
            </RootStyle>
        </Page>
    </>)
}
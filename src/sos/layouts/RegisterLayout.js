import { Box, Container, Link, styled, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import Page from "../../components/Page";
import AuthSocial from "../components/login/AuthSocial";
import RegisterForm from "../components/login/RegisterForm";


const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

export default function RegisterLayout() {

    return (<>
        <Page title="Đăng ký">
            <RootStyle>
                <Container maxWidth="md">
                    <Box pt={3}>
                        <Typography variant="h4" textAlign={"center"} gutterBottom>
                            ĐĂNG KÝ
                        </Typography>
                        <AuthSocial />
                        <RegisterForm />
                    </Box>
                </Container>
            </RootStyle>
        </Page>
    </>)
}
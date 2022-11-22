import { Box, Container } from "@mui/material";
import Page from "../../components/Page";
import AccountProfile from "../components/account/AccountProfile";

export default function AccountLayout() {

    return (<>
        <Page title="Tài Khoản">
            <Container>
                <Box pt={3}>
                    <AccountProfile />
                </Box>
            </Container>
        </Page>

    </>)
}
import { Container } from "@mui/material";
import Page from "../../components/Page";
import AccountProfile from "../components/account/AccountProfile";

export default function AccountLayout() {

    return (<>
        <Page title="Tài Khoản">
            <Container>
                <AccountProfile />
            </Container>
        </Page>

    </>)
}
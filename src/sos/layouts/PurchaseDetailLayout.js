import { Box, Container } from "@mui/material";
import Page from "../../components/Page";
import PurchaseDetail from "../components/purchase/PurchaseDetail";

export default function PurchaseDetailLayout() {

    return (<>
        <Page title="Đơn Hàng">
            <Container>
                <Box pt={3}>
                    <PurchaseDetail />
                </Box>
            </Container>
        </Page>
    </>)
}
import { Container } from "@mui/material";
import Page from "../../components/Page";
import PurchaseDetail from "../components/purchase/PurchaseDetail";

export default function PurchaseDetailLayout() {

    return (<>
        <Page title="Đơn Hàng">
            <Container>
                <PurchaseDetail />
            </Container>
        </Page>
    </>)
}
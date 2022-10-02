import { Container} from '@mui/material';
import Page from '../../components/Page';
import ProductDetail from "../components/product/ProductDetail";
import ProductDetailSidebar from "../components/product/ProductDetailSidebar";


export default function ProductDetailLayout() {
    return (<>
        <Page title="Giày">
            <Container>
                <div className="container-fluid row m-0 p-0 justify-content-center">
                    <div className="row col-12 m-0 p-0">
                        <ProductDetail />
                        <ProductDetailSidebar />
                    </div>
                </div>
            </Container>
        </Page>
    </>)
}
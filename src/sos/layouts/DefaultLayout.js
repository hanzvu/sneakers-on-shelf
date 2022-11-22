import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { Carousel } from "react-bootstrap";
import Page from "../../components/Page";
import BestSellingProduct from "../components/collection/BestSellingProduct";

export default function DefaultLayout() {

    return (<>
        <Page title="Sneakers On Shelf">
            <Carousel>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src="https://bizweb.dktcdn.net/100/347/092/themes/708609/assets/slider_3.jpg?1668579510890"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src="https://bizweb.dktcdn.net/100/347/092/themes/708609/assets/slider_4.jpg?1668579510890"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src="https://bizweb.dktcdn.net/100/347/092/themes/708609/assets/slider_5.jpg?1668579510890"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
            <BestSellingProduct />
        </Page>
    </>)
}
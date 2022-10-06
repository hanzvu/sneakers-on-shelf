import { Box, Paper } from "@mui/material";
import OrderItem from "./OrderItem";

export default function Order() {
    return (<>

        <Paper elevation={3} square>
            <Box p={3}>
                <div className="d-flex border-bottom justify-content-between">
                    <div>
                        <h4 className="text-dark py-2 m-0">Đã xác nhận</h4>
                    </div>
                    <div className="d-flex align-items-center">
                        <a className="text-decoration-none" href='#collapseExample1' > Chi tiết </a>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <a className="float-start">
                            <button type="button" className="btn btn-danger">Hủy Đơn</button>
                        </a>
                    </div>
                    <div className="py-3 px-5 text-end">
                        Tổng số tiền : <span className="text-danger">888đ</span>
                    </div>
                </div>
            </Box>
        </Paper>
    </>)
}
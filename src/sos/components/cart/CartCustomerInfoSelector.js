import { useState, forwardRef } from "react";
import { Box, Button, Chip, Dialog, DialogContent, DialogTitle, Grid, Link, Slide, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Scrollbar from "../../../components/Scrollbar";
import { getAddresses } from "../../services/AccountService";

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CartCustomerInfoSelector({ account, handleSelectCustomerInfo }) {

    const [data, setData] = useState();

    const loadData = () => {
        getAddresses(account.id).then(data => {
            setData(data)
        });
    }

    return (
        <>
            <Button hidden={account.id == null} variant="outlined" onClick={loadData}>
                Chọn Tài Khoản
            </Button>
            <Dialog
                maxWidth={"md"}
                fullWidth
                open={data != null}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => { setData(null) }}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent sx={{ zIndex: 'modal' }}>
                    <Scrollbar>
                        <Stack spacing={3} >
                            {data && data.map(address =>
                                <Grid container key={address.id} py={1} className="border-bottom">
                                    <Grid item lg={8} xs={12}>
                                        <Stack>
                                            <Typography variant="h6" gutterBottom>
                                                {address.fullname}
                                            </Typography>
                                            <Typography variant="body1" gutterBottom>
                                                {address.phone}
                                            </Typography>
                                            <Typography variant="subtitle2" gutterBottom>
                                                {`${address.address}, ${address.wardName}, ${address.districtName}, ${address.provinceName}`}
                                            </Typography>
                                            {
                                                address.id === account.customerInfo.id &&
                                                <Box>
                                                    <Chip label="Địa Chỉ Mặc Định" color="error" />
                                                </Box>
                                            }
                                        </Stack>
                                    </Grid>
                                    <Grid item container lg={4} xs={12} justifyContent={"center"} alignItems={"center"}>
                                        <Stack direction="row" spacing={2}>
                                            <Button variant="contained" onClick={() => { handleSelectCustomerInfo(address); setData(null); }}>Chọn Địa Chỉ</Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            )}
                        </Stack>
                        {
                            data == null &&
                            <Typography variant="h6">
                                Chưa có dữ liệu
                            </Typography>
                        }
                    </Scrollbar>
                </DialogContent>
            </Dialog>
        </>
    )
}
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { deactiveAddress, fetchAccount, setDefaultAddress } from "../../services/AccountService";

export default function AccountAddressContainer({ addresses, id }) {

    const handleSetDefault = async (id) => {
        try {
            await setDefaultAddress(id);
            fetchAccount();
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await deactiveAddress(id);
            fetchAccount();
        } catch (error) {
            console.log(error);
        }
    }

    return (<>
        <Paper elevation={3} square>
            <Stack className={"border-bottom"} spacing={3} p={3}>
                {
                    addresses.map(address => (
                        <Grid container key={address.id}>
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
                                </Stack>
                            </Grid>
                            <Grid item container lg={4} xs={12} justifyContent={"center"} alignItems={"center"}>
                                {
                                    address.id !== id &&
                                    <Stack direction="row" spacing={2}>
                                        <Button variant="contained" onClick={() => { handleSetDefault(address.id) }}>Đặt Làm Mặc Định</Button>
                                        <Button variant="contained" color="error" onClick={() => { handleDelete(address.id) }}>Xóa</Button>
                                    </Stack>
                                }
                                {
                                    address.id === id &&
                                    <Stack direction="row" spacing={2}>
                                        <Button variant="outlined" color="error">Địa Chỉ Mặc Định</Button>
                                    </Stack>
                                }
                            </Grid>

                        </Grid>
                    ))
                }
            </Stack>
        </Paper>
    </>)
}
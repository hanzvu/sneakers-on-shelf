import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";

export default function AccountAddressContainer({ addresses }) {
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
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained">Đặt Làm Mặc Định</Button>
                                    <Button variant="contained" color="error">Xóa</Button>
                                </Stack>
                            </Grid>

                        </Grid>
                    ))
                }
            </Stack>
        </Paper>
    </>)
}
import { Box, Button, Paper, Stack, TextField } from "@mui/material";

export default function AccountChangePassword() {
    return (<>
        <Paper elevation={3} square>
            <Stack spacing={2} p={3} alignItems={"flex-end"}>
                <TextField label="Mật khẩu cũ" type="password" variant="outlined" fullWidth />
                <TextField label="Mật khẩu mới" type="password" variant="outlined" fullWidth />
                <TextField label="Xác nhận mật khẩu mới" type="password" variant="outlined" fullWidth />
                <Box>
                    <Button variant="contained">Đổi Mật Khẩu</Button>
                </Box>
            </Stack>
        </Paper>
    </>)
}
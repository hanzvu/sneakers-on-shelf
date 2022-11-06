import { Paper, Stack, TextField } from "@mui/material";
import { useSelector } from "react-redux";

export default function AccountProfileInfo() {

    const account = useSelector(state => state.account.account);

    return (<>
        <Paper elevation={3} square>
            <Stack spacing={2} p={3}>
                <TextField label="Họ và tên" variant="outlined" value={account.fullname} fullWidth />
                <TextField label="Email" type="email" variant="outlined" value={account.email} fullWidth />
            </Stack>
        </Paper>
    </>)
}
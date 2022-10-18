import { Paper, Stack, TextField } from "@mui/material";

export default function AccountProfileInfo() {
    return (<>
        <Paper elevation={3} square>
            <Stack spacing={2} p={3}>
                <TextField label="Email" type="email" variant="outlined" fullWidth />
            </Stack>
        </Paper>
    </>)
}
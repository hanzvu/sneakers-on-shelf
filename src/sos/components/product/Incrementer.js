import { Box, IconButton, Stack, TextField } from "@mui/material";
import Iconify from "../../../components/Iconify";

export default function Incrementer({ available, quantity, onIncrementQuantity, onDecrementQuantity, onChangeQuantity }) {
    return (
        <Box
            sx={{
                py: 0.5,
                px: 0.75,
                border: 1,
                lineHeight: 0,
                height: 49,
                display: 'flex',
                justifyContent: 'center',
                borderRadius: 1,
                borderColor: 'grey.50032',
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <IconButton size="small" color="inherit" disabled={quantity <= 1} onClick={onDecrementQuantity}>
                    <Iconify icon={'eva:minus-fill'} width={14} height={14} />
                </IconButton>

                <TextField variant="standard" value={quantity} onChange={onChangeQuantity} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, style: { textAlign: 'center' } }} sx={{ width: 40, textAlign: 'center' }} />

                <IconButton size="small" color="inherit" disabled={quantity >= available} onClick={onIncrementQuantity}>
                    <Iconify icon={'eva:plus-fill'} width={14} height={14} />
                </IconButton>
            </Stack>

        </Box>
    );
}
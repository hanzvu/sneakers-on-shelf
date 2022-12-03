import { forwardRef, useState } from "react";
import { Box, Button, CardMedia, Dialog, DialogContent, Grid, Slide, styled, Switch } from "@mui/material";

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

export default function PaymentQRCodeDialog({ paymentQRCode }) {

    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="contained" color="secondary" size="medium" onClick={() => setOpen(true)}>
                Chuyển Khoản Ngân Hàng
            </Button>
            <Dialog
                maxWidth={"md"}
                fullWidth
                open={open}
                onClose={() => { setOpen(false) }}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description">
                <DialogContent sx={{ zIndex: 'modal' }}>
                    <Box p={{ xs: 1, md: 3 }}>
                        <Grid container justifyContent={"center"}>
                            <Grid item md={7} xs={12}>
                                <CardMedia component="img" image={paymentQRCode} alt="green iguana" />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}
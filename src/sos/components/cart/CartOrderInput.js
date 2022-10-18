import { Grid, TextField } from "@mui/material";
import { useState } from "react";

export default function CartOrderInput({ setGHNFullname, setGHNPhone, setGHNAddress, setGHNEmail }) {

    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const handleChangeFullname = event => {
        setGHNFullname(event.target.value)
        setFullname(event.target.value)
    }

    const handleChangePhone = event => {
        setGHNPhone(event.target.value)
        setPhone(event.target.value)
    }

    const handleChangeEmail = event => {
        setGHNEmail(event.target.value)
        setEmail(event.target.value)
    }

    const handleChangeAddress = event => {
        setGHNAddress(event.target.value)
        setAddress(event.target.value)
    }

    return (<>
        <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
                <TextField label="Họ Và Tên" value={fullname} onChange={e => handleChangeFullname(e)} variant="outlined" required fullWidth />
            </Grid>
            <Grid item md={6} xs={12}>
                <TextField label="Số Điện Thoại" type="number" value={phone} onChange={e => handleChangePhone(e)} variant="outlined" required fullWidth />
            </Grid>
            <Grid item xs={12}>
                <TextField label="Email" type="email" value={email} onChange={e => handleChangeEmail(e)} variant="outlined" required fullWidth />
            </Grid>
        </Grid>

        <Grid pt={3} item xs={12}>
            <TextField label="Địa Chỉ" value={address} onChange={e => handleChangeAddress(e)} variant="outlined" required fullWidth />
        </Grid>
    </>)
}
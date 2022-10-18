import { useEffect, useState } from "react";
import { Container, Grid, Stack, TextField } from "@mui/material";
import DistrictSelector from "../cart/DistrictSelector";
import ProvinceSelector from "../cart/ProvinceSelector";
import WardSelector from "../cart/WardSelector";
import { fetchProvincesToStore } from "../../services/DeliveryService";

export default function AccountAddressForm({ haveEmail, addressFormInput }) {

    useEffect(() => {
        fetchProvincesToStore();
    }, [])

    const [input, setInput] = useState({
        fullname: '',
        phone: '',
        address: '',
        email: ''
    })

    const setProvince = province => {
        addressFormInput.current.province = province;
        addressFormInput.current.district = null;
        addressFormInput.current.ward = null;
    }

    const setDistrict = district => {
        addressFormInput.current.district = district;
        addressFormInput.current.ward = null;
    }

    const setWard = ward => {
        addressFormInput.current.ward = ward;
    }

    const setFullname = fullname => {
        addressFormInput.current.fullname = fullname;
        setInput({ ...input, fullname })
    }

    const setPhone = phone => {
        addressFormInput.current.phone = phone;
        setInput({ ...input, phone })
    }

    const setEmail = email => {
        addressFormInput.current.email = email;
        setInput({ ...input, email })
    }

    const setAddress = address => {
        addressFormInput.current.address = address;
        setInput({ ...input, address })
    }

    return (<>
        <Container disableGutters>
            <Stack spacing={2} p={3} alignItems={"flex-end"}>
                <TextField label="Họ và tên" value={input.fullname} onChange={e => { setFullname(e.target.value) }} variant="outlined" fullWidth />
                <TextField label="Số điện thoại" onChange={e => { setPhone(e.target.value) }} variant="outlined" fullWidth />
                {haveEmail && <TextField label="Email" type="email" onChange={e => { setEmail(e.target.value) }} variant="outlined" fullWidth />}
                <Grid container spacing={1}>
                    <Grid item md={4} xs={12}>
                        <ProvinceSelector setProvince={setProvince} />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <DistrictSelector setDistrict={setDistrict} />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <WardSelector setWard={setWard} />
                    </Grid>
                </Grid>
                <TextField label="Địa chỉ" onChange={e => { setAddress(e.target.value) }} variant="outlined" fullWidth />
            </Stack>
        </Container>
    </>)
}
import { useEffect, useState } from "react";
import { Container, Grid, Stack, TextField } from "@mui/material";
import DistrictSelector from "./DistrictSelector";
import { fetchProvincesToStore } from "../../services/DeliveryService";
import ProvinceSelector from "./ProvinceSelector";
import WardSelector from "./WardSelector";

export default function AccountAddressForm({ haveEmail, addressFormInput, handleDone }) {

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
        if (handleDone != null) {
            handleDone();
        }
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
            <Stack spacing={2} alignItems={"flex-end"}>
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
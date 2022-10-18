import { Button, Paper, Stack } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getAddresses } from "../../services/AccountService";
import AccountAddressContainer from "./AccountAddressContainer";
import AccountAddressForm from "./AccountAddressForm";

export default function AccountAddress() {

    const account = useSelector(state => state.account.account);

    const [addresses, setAddresses] = useState();

    const addressFormInput = useRef({
        province: null,
        district: null,
        ward: null,
        fullname: null,
        phone: null,
        address: null,
        email: null
    })

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAddresses(account.id);
            setAddresses(data);
        }
        if (account.id == null) {
            return;
        }
        fetchData();
    }, [])

    return (<>
        <Stack spacing={3}>
            {addresses && <AccountAddressContainer addresses={addresses} />}
            <Paper elevation={3} square><AccountAddressForm addressFormInput={addressFormInput} /></Paper>
            <Button onClick={e => {
                console.log(addressFormInput);
            }}>Click</Button>
        </Stack>
    </>)
}
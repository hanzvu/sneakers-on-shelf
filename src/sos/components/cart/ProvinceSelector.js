import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { fetchDistrictToStore } from "../../services/DeliveryService";


export default function ProvinceSelector({ setProvince }) {

    const [selectedProvince, setSelectedProvince] = useState(``);
    const provinces = useSelector(state => state.ghnProvince.provinces);

    const handleChange = (event) => {
        setProvince(provinces[event.target.value]);
        fetchDistrictToStore(event.target.value);
        setSelectedProvince(event.target.value);
    };

    return (<>
        <FormControl sx={{ minWidth: 120 }} fullWidth>
            <InputLabel id="province-select-helper-label">Tỉnh / Thành Phố</InputLabel>
            <Select
                labelId="province-select-helper-label"
                id="province-select-helper"
                value={selectedProvince}
                label="Tỉnh / Thành Phố"
                onChange={handleChange}>
                {
                    provinces &&
                    Object.values(provinces).map((province) => (
                        <MenuItem key={province.ProvinceID} value={province.ProvinceID}>{province.ProvinceName}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    </>)
}
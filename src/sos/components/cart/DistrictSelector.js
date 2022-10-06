import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { fetchWardToStore } from "../../services/DeliveryService";

export default function DistrictSelector({ setDistrict }) {

    const [selectedDistrict, setSelectedDistrict] = useState(``);

    const districts = useSelector(state => state.ghnDistrict.districts);

    const handleChange = (event) => {
        setDistrict(districts[event.target.value])
        fetchWardToStore(event.target.value);
        setSelectedDistrict(event.target.value);
    };


    return (<>
        <FormControl sx={{ minWidth: 120 }} fullWidth>
            <InputLabel id="district-select-helper-label">Quận / Huyện</InputLabel>
            <Select
                labelId="district-select-helper-label"
                id="district-select-helper"
                value={selectedDistrict}
                label="Quận / Huyện"
                onChange={handleChange}>
                {
                    districts &&
                    Object.values(districts).map(district => (
                        <MenuItem key={district.DistrictID} value={district.DistrictID}>{district.DistrictName}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    </>)
}
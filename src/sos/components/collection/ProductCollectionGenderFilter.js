import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";

export default function ProductCollectionGenderFilter({ productGenders, value, onChangeGender }) {


    return (<>
        <div>
            <Typography variant="subtitle1" gutterBottom>
                Giới Tính
            </Typography>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={value}
                onChange={e => onChangeGender(e.target.value)}
                name="radio-buttons-group">
                {
                    productGenders &&
                    productGenders.map(pg => (
                        <FormControlLabel key={pg} value={pg} control={<Radio />} label={pg} />
                    ))
                }
            </RadioGroup>
        </div>
    </>)
}
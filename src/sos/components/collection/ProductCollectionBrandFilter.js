import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";

export default function ProductCollectionBrandFilter({ brands, value, onChangeBrand }) {

    return (<>
        <div>
            <Typography variant="subtitle1" gutterBottom>
                Thương Hiệu
            </Typography>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={value}
                onChange={e => onChangeBrand(e.target.value)}
                name="radio-buttons-group">
                {
                    brands &&
                    brands.map(brand => (
                        <FormControlLabel key={brand.id} value={brand.id} control={<Radio />} label={brand.name} />
                    ))
                }
            </RadioGroup>
        </div>
    </>)
}
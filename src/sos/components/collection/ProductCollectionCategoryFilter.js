import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";

export default function ProductCollectionCategoryFilter({ categories, value, onChangeCategory }) {

    return (<>
        <div>
            <Typography variant="subtitle1" gutterBottom>
                Danh Mục
            </Typography>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={value}
                onChange={e => onChangeCategory(e.target.value)}
                name="radio-buttons-group">
                {
                    categories &&
                    categories.map(category => (
                        <FormControlLabel key={category.id} value={category.id} control={<Radio />} label={category.name} />
                    ))
                }
            </RadioGroup>
        </div>
    </>)
}
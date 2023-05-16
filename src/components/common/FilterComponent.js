import {
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function Filters(searchInput) {
  return (
    <>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Filter by: </FormLabel>
        <RadioGroup defaultValue="name" name="radio-buttons-group" row>
          <FormControlLabel value="name" control={<Radio />} label="Name" />
          <FormControlLabel
            value="location"
            control={<Radio />}
            label="Location"
          />
          <FormControlLabel
            value="textDescription"
            control={<Radio />}
            label="Description"
          />
          <FormControlLabel
            value="visitingDate"
            control={<Radio />}
            label="Visiting date"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
}

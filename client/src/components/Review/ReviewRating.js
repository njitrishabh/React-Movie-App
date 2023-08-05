import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormLabel';

const ReviewRating = (props) => {

  const [rating, setRating] = React.useState('');
  
  const handleChange = (event) => {
    setRating(event.target.value)
    props.setSelectedRating(event.target.value);
  };

  return (
    <>
    
    {/* JSX block */}
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Enter a rating</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(e) => { handleChange(e); }}
        value={rating}
      >
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
      </RadioGroup>
    </FormControl>
    

    </>
  );
}

export default ReviewRating;

import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, Grid, Select, MenuItem, InputLabel, FormHelperText } from '@mui/material';

const ReviewBody = (props, ref) => {

  //states declarations
  //constants and functions declarations

  const [body, setBody]= React.useState('');
  
  const limitChar = 200;

  // update the input field, and also update the state in parent component by using the state setter method given as prop.
  const handleChange = (event) => {
    if(event.target.value.length > limitChar) return false;
    setBody(event.target.value)
    props.setEnteredReview(event.target.value);
  };


  return (
    <>
    
    {/* JSX block */}

    <TextField
          id="outlined-multiline-static"
          label="Review"
          multiline
          rows={4}
          defaultValue=""
          onChange={(event) => {handleChange(event)}}
          value={body}
        />
        <FormHelperText>Enter a review (Characters left: {limitChar - body.length})</FormHelperText>
    </>
  );
}

export default ReviewBody;

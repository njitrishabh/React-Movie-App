import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
//import Typography from '@mui/material/Typography';
import { FormControl, Grid, Typography, Select, MenuItem, InputLabel, FormHelperText, TextField } from '@mui/material';

const ReviewTitle = React.forwardRef((props, ref) => {


  //states declarations
  //constants and functions declarations

  const [title, setTitle] = React.useState('');
  const handleInput = (event) => {
    setTitle(event.target.value);
    props.setEnteredTitle(event.target.value);
  }

  React.useImperativeHandle(ref, () => ({
    setTitle
  }), [setTitle])

  return (
    <>
    
    {/* JSX block */
     <TextField id="outlined-basic" 
     label="Title" 
     variant="outlined" 
     value = {title}
     onChange = {(e)=> {handleInput(e)}}/>
  }


<FormHelperText>Enter a title</FormHelperText>


    </>
  );
})

export default ReviewTitle;

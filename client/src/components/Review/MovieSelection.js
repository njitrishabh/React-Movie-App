import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
//import Typography from '@mui/material/Typography';
import { FormControl, Grid, Typography, Select, MenuItem, InputLabel, FormHelperText, Menu } from '@mui/material';
import { red } from '@mui/material/colors';

const MovieSelection = (props) => {

  //states declarations
  //constants and functions declarations

  const [movies, setMovies] = React.useState('');
  const handleChange = (event) => {
    setMovies(event.target.value);
    props.setSelectedMovie(event.target.value);
  }

  return (
    <>

      <FormControl sx={{ mt: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Movie</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={movies}
          label="Movies"
          onChange={handleChange}
        >
          <MenuItem value="None">
            <em>None</em>
          </MenuItem>
          {props.movies.map((movie, idx) => <MenuItem key={"movie_" + idx} value={movie.name}>
            {movie.name}
          </MenuItem>
          )}
        </Select>
        <FormHelperText>Select a Movie</FormHelperText>
      </FormControl>
      {/* JSX block */}

    </>
  );
}

export default MovieSelection;

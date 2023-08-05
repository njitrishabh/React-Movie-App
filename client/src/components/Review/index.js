import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
import { FormControl, Grid, Select, MenuItem, InputLabel, FormHelperText, Button, getFormLabelUtilityClasses } from '@mui/material';
const serverURL = "http://localhost:5001";

const Review = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = React.useState([]);
  const [userID, setUserID] = React.useState(1);
  const [selectedMovie, setSelectedMovie] = React.useState('');
  const [enteredTitle, setEnteredTitle] = React.useState('');
  const [enteredReview, setEnteredReview] = React.useState('');
  const [selectedRating, setSelectedRating] = React.useState('');


  let titleRef = React.useRef();

  const [movieError, setMovieError] = React.useState('');
  const [titleError, setTitleError] = React.useState('');
  const [bodyError, setBodyError] = React.useState('');
  const [ratingError, setRatingError] = React.useState('');

  const [hasErrors, setHasErrors] = React.useState(false);
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  //states declarations
  //constants and functions declarations

  const handleChange = (e) => {
    e.preventDefault();
    setHasErrors(false);
    let hasError = false;

    // 0th index = input value, 1st index = Error message, 2nd index = Setter for the error msg
    let inputs = [
      [selectedMovie, "Select your movie", setMovieError],
      [enteredTitle, "Enter your review title", setTitleError],
      [enteredReview, "Enter your review", setBodyError],
      [selectedRating, "Select the rating", setRatingError]
    ];

    for (let i = 0; i < inputs.length; i++)
      inputs[i][2]("");

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i][0] == "" || inputs[i][0] == "None" || inputs[i][0] == null) {
        setHasErrors(true);
        hasError = true;
        inputs[i][2](inputs[i][1]);
      }
    }

    if (!hasError) {
      // Form 
      setFormSubmitted(true);
      //titleRef.current.setTitle("");
    }

    sendReview()
  }

  const getMovies = () => {
    callMovies()
      .then(res => {
        var parsed = JSON.parse(res.express);
        setMovies(parsed);
      })
  }

  React.useEffect(() => {
    getMovies();
  }, []);

  const callMovies = async () => {
    const url = serverURL + "/api/getMovies";
    console.log(url);


    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  function getMovieID(selectedMovie) {
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].name === selectedMovie) {
        return movies[i].id;
      }
    }
    return null;
  }

  const movieID = getMovieID(selectedMovie);

  //function to send to review to mySQL
  const sendReview = async () => {

    const url = serverURL + "/api/addReview";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: parseInt(userID),
        movieID: movieID,
        reviewTitle: enteredTitle,
        reviewContent: enteredReview,
        reviewScore: parseInt(selectedRating)
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Found movies: ", body);
    return body;
  }

  return (

    <div>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Review Page
            </Typography>


            <Link
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={() => navigate('/')}
            >
              <Typography variant="h6" color="inherit" noWrap>
                Landing Page
              </Typography>
            </Link>


            <Link
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={() => navigate('/Search')}
            >
              <Typography variant="h6" color="inherit" noWrap>
                Search Page
              </Typography>
            </Link>


            <Link
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={() => navigate('/FindTrailer')}
            >
              <Typography variant="h6" color="inherit" noWrap>
                Find Trailer
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>

      <>
        {/* JSX block */}

        <form onSubmit={handleChange}>
          <Grid
            container
            spacing={3}
            direcrion="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >

            <Grid item xs={8} style={{ marginRight: '50px', marginTop: '20px' }}>
              <Typography variant="h5">
                Review a Movie
              </Typography>
            </Grid>

            <Grid item xs={8}>
              {<MovieSelection movies={movies} setSelectedMovie={setSelectedMovie} setMovies={setMovies} />}
              <br />
              {movieError ? <Typography variant="p" className="error">{movieError}</Typography> : <></>}

            </Grid>

            <Grid item xs={8}>
              {<ReviewTitle ref={titleRef} setEnteredTitle={setEnteredTitle} />}

              {titleError ? <Typography variant="p" className="error">{titleError}</Typography> : <></>}

            </Grid>

            <Grid item xs={8}>
              {<ReviewBody setEnteredReview={setEnteredReview} />}
              {bodyError ? <Typography variant="p" className="error">{bodyError}</Typography> : <></>}

            </Grid>

            <Grid item xs={8}>
              {<ReviewRating setSelectedRating={setSelectedRating} />}
              <br />
              {ratingError ? <Typography variant="p" className="error">{ratingError}</Typography> : <></>}

              {!hasErrors && formSubmitted ? <div className="movie-info">
                <Typography variant="body2" color="green">You review has been received</Typography>
              </div> : <></>}

            </Grid>


            <Grid item xs={8}>
              <Button variant="contained" type="submit" formSubmitted>Submit</Button>
              <FormHelperText>Press submit</FormHelperText>
            </Grid>

          </Grid>
        </form>
        {!hasErrors && formSubmitted ? <div className="movie-info">
          <hr />
          <Typography variant="h6" color="blue">Submission Results</Typography>
          <br />
          <Typography variant="p">Movie Title: {selectedMovie}</Typography><br />
          <br />
          <Typography variant="p">Review Title: {enteredTitle}</Typography><br />
          <br />
          <Typography variant="p">Movie Review: {enteredReview}</Typography><br />
          <br />
          <Typography variant="p">Movie Rating: {selectedRating}</Typography><br />
        </div> : <></>}
      </>
    </div>

  )
}
export default Review;
import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import axios from "axios";
import { TextField } from '@mui/material';
import { Grid, FormHelperText } from '@mui/material';
import styles from './styles.css';

const serverURL = "http://localhost:5001";
const MyPage = () => {
    const navigate = useNavigate();

    const [enteredTitle, handleTitleChange] = React.useState('');
    const [responseData, setResponseData] = React.useState([]);

    const [movieTitle, setmovieTitle] = React.useState([]);
    const [movieTrailer, setmovieTrailer] = React.useState([]);

    const handleInput1 = (event) => {
        handleTitleChange(event.target.value);
    }



    const handleChange = (event) => {
        event.preventDefault();
        getTrailers();
        handleTitleChange('');
    }

    const getTrailers = () => {
        callTrailers()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setResponseData(parsed);
            })
    }

    const callTrailers = async () => {
        const url = serverURL + "/api/movieTrailer"; // Replace serverURL with your actual server URL

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({

                movieTitle: enteredTitle,
            }),
        });

        const data = await response.json();
        return data;
    };

    const addMovieTrailer = async () => {
        const url = serverURL + "/api/addMovieTrailer"; // Replace serverURL with your actual server URL

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                movieTitle: movieTitle,
                movieTrailer: movieTrailer
            }),
        });

        const data = await response.json();
        return data;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addMovieTrailer();
        setmovieTitle('');
        setmovieTrailer('');
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
                            Find Trailer
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
                            onClick={() => navigate('/Review')}
                        >
                            <Typography variant="h6" color="inherit" noWrap>
                                Review Page
                            </Typography>
                        </Link>

                    </Toolbar>
                </AppBar>
            </Box>

            <form onSubmit={handleSubmit}>
                <label>Save a Movie Trailer in Movies Database:</label>
                <input type="text" value={movieTitle} onChange={(e) => setmovieTitle(e.target.value)} placeholder='Enter Movie Title' />
                <input type="text" value={movieTrailer} onChange={(e) => setmovieTrailer(e.target.value)} placeholder='Enter Movie Trailer link' />
                <input type='submit' value="Save The Trailer" />
            </form>


            <div className='fetchTrailer'>
                <p>View Embedded Video of a Movie Trailer:</p>
                <TextField id="outlined-basic"
                    label="Movie Title"
                    variant="outlined"
                    value={enteredTitle}
                    style={{ marginTop: '20px', marginBottom: '20px' }}
                    onChange={(e) => { handleInput1(e) }} />

                <Grid item xs={8} >
                    <Button variant="contained" onClick={handleChange} formSubmitted> Show Trailer </Button>
                    <FormHelperText>Press submit</FormHelperText>
                </Grid>

            </div>

            {
                responseData && responseData.map((data) => (
                    <iframe width="500" height="345" src={`${data.trailer}`}>
                    </iframe>

                ))
            }




        </div>
    )
}
export default MyPage;
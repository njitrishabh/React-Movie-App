import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { TextField } from '@mui/material';
import { Grid, FormHelperText } from '@mui/material';
import axios from "axios";
import styles from './search.css';
const serverURL = "http://localhost:5001";
const Search = () => {
    const navigate = useNavigate();

    const [enteredTitle, handleTitleChange] = React.useState('');
    const [actorName, handleActorNameChange] = React.useState('');
    const [directorName, handleDirectorNameChange] = React.useState('');
    const [responseData, setResponseData] = React.useState([]);



    const handleInput1 = (event) => {
        handleTitleChange(event.target.value);
    }
    const handleInput2 = (event) => {
        handleActorNameChange(event.target.value);
    }
    const handleInput3 = (event) => {
        handleDirectorNameChange(event.target.value);
    }


    const handleChange = (event) => {
        event.preventDefault();
        getMovies();
    }

    const getMovies = () => {
        callMovies()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setResponseData(parsed);
            })
    }

    const callMovies = async () => {
        const url = serverURL + "/api/search"; // Replace serverURL with your actual server URL

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({

                movieTitle: enteredTitle,
                actorName: actorName,
                directorName: directorName,
            }),
        });

        const data = await response.json();
        return data;
    };


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
                            Search Page
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
                            onClick={() => navigate('/Review')}
                        >
                            <Typography variant="h6" color="inherit" noWrap>
                                Review Page
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

            <div className='flex-container'>
                <TextField
                    id="outlined-title"
                    label="Title"
                    variant="outlined"
                    value={enteredTitle}
                    onChange={(e) => { handleInput1(e) }}
                    style={{ marginTop: '20px' }} // Add bottom margin for space
                />

                <TextField
                    id="outlined-actor"
                    label="Actor Name"
                    variant="outlined"
                    value={actorName}
                    onChange={(e) => { handleInput2(e) }}
                    style={{ marginTop: '20px' }} // Add bottom margin for space
                />

                <TextField
                    id="outlined-director"
                    label="Director Name"
                    variant="outlined"
                    value={directorName}
                    onChange={(e) => { handleInput3(e) }}
                    style={{ marginTop: '20px', marginBottom: '20px' }} // Add bottom margin for space
                />
            </div>

            <Grid item xs={8} style={{ marginBottom: '20px' }}>
                <Button variant="contained" onClick={handleChange} formSubmitted>Submit</Button>
                <FormHelperText>Press submit</FormHelperText>
            </Grid>

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Director Name</th>
                        <th>Review</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        responseData && responseData.map((data) => (
                            <tr >
                                <td>{data.title}</td>
                                <td>{data.directorName}</td>
                                <td>{data.review}</td>
                                <td>{data.score}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Search;
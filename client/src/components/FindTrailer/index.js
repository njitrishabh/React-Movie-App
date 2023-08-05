import React from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { Grid, FormHelperText } from '@mui/material';
import styles from './styles.css';

const serverURL = "http://localhost:5001";
const MyPage = () => {

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
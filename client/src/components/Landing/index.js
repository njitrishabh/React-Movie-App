import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { makeStyles, Stack, Rating } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const Landing = () => {

    const itemData = [
        {
            img: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/12_Angry_Men_%281957_film_poster%29.jpg',
            title: '12 Angry Men',
            author: 'Sidney Lumet',
            link: 'https://www.imdb.com/title/tt0050083/',
            value: 4.5,
        },
        {
            img: 'https://m.media-amazon.com/images/M/MV5BMmNlYzRiNDctZWNhMi00MzI4LThkZTctMTUzMmZkMmFmNThmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg',
            title: '2001: A Space Odyssey',
            author: 'Stanley Kubrick',
            link: 'https://www.imdb.com/title/tt0062622/',
            value: 4.2,

        },
        {
            img: 'https://m.media-amazon.com/images/M/MV5BY2IzOTc2OWEtYTEwYy00ZTk5LWIxZWYtNDc3ZjM4MTZkODk4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg',
            title: '3 Ninjas: High Noon at Mega Mountain',
            author: 'Sean (I) McNamara',
            link: 'https://www.imdb.com/title/tt0118539/',
            value: 1.5,

        },
        {
            img: 'https://www.originalfilmart.com/cdn/shop/products/alien_1979_italian_1p_original_film_art_5000x.jpg?v=1562540709',
            title: 'Alien',
            author: 'Ridley Scott',
            link: 'https://www.imdb.com/title/tt0078748/',
            value: 4.3,

        },
        {
            img: 'https://m.media-amazon.com/images/I/91TYB8gep+L.jpg',
            title: 'Aliens',
            author: 'James (I) Cameron',
            link: 'https://www.imdb.com/title/tt0090605/',
            value: 4.2,
        },
        {
            img: 'https://m.media-amazon.com/images/M/MV5BMTQ3MjcxMjk4Ml5BMl5BanBnXkFtZTgwNTI4NzQ0MjE@._V1_.jpg',
            title: 'All About Eve',
            author: 'Joseph L. Mankiewicz',
            link: 'https://www.imdb.com/title/tt0042192/',
            value: 4.1,

        },
        {
            img: 'https://m.media-amazon.com/images/M/MV5BMDdlMzRjM2MtNjcxNy00MjgyLTkyZmYtY2ExODM0OTBkMzI0XkEyXkFqcGdeQXVyMzg1ODEwNQ@@._V1_FMjpg_UX1000_.jpg',
            title: 'All Quiet on the Western Front',
            author: 'Lewis Milestone',
            link: 'https://www.imdb.com/title/tt1016150/',
            value: 3.9,
        },
        {
            img: 'https://i.etsystatic.com/16821137/r/il/a29aeb/3945562714/il_570xN.3945562714_jfd4.jpg',
            title: 'Amadeus',
            author: 'Milos Forman',
            link: 'https://www.imdb.com/title/tt0086879/',
            value: 4.2,
        },
        {
            img: 'https://m.media-amazon.com/images/M/MV5BOTU1MzExMDg3N15BMl5BanBnXkFtZTcwODExNDg3OA@@._V1_.jpg',
            title: 'American Beauty',
            author: 'Sam Mendes',
            link: 'https://www.imdb.com/title/tt0169547/',
            value: 4.2,
        },
        {
            img: 'https://m.media-amazon.com/images/M/MV5BZTJhN2FkYWEtMGI0My00YWM4LWI2MjAtM2UwNjY4MTI2ZTQyXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg',
            title: 'American History X',
            author: 'Tony (I) Kaye',
            link: 'https://www.imdb.com/title/tt0120586/',
            value: 4.3,

        },
    ];

    return (
        <div>

            <ImageList sx={{ width: 1500, height: 750 }} cols={5}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img} style={{ marginBottom: '20px' }}>
                        <Stack direction="row" alignItems="center">
                            <Link href={item.link}>{item.title}</Link>
                        </Stack>
                        <img
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={<span>Director: {item.author}</span>}
                            position="below"
                        />

                        <Typography component="legend"></Typography>
                        <Rating name="half-rating" value={item.value} precision={0.1} readOnly />
                    </ImageListItem>

                ))}
            </ImageList>

        </div>
    )
}
export default Landing
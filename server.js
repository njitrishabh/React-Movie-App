import mysql from 'mysql2';
import config from './config.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';
import cors from 'cors';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5001;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(
	cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000'] })
);


app.use(express.static(path.join(__dirname, "client/build")));

// Api to fetch all the movies
app.post('/api/getMovies', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT id, name, year, quality FROM movies`;
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});

// Api to add user reviews
app.post('/api/addReview', (req, res) => {

	let connection = mysql.createConnection(config);
	const { userID, movieID, reviewTitle, reviewContent, reviewScore } = req.body;

	let sql = `INSERT INTO Review (userID, movieID,reviewTitle, reviewContent, reviewScore) VALUES (?, ?, ?, ?, ?)`;
	let data = [userID, movieID, reviewTitle, reviewContent, reviewScore];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

// Api to get movieTrailer
app.post('/api/movieTrailer', (req, res) => {
	let connection = mysql.createConnection(config);
	let movieTitle = req.body.movieTitle;

	let sql = `Select trailer from movies where name = ?`;
	let data = [movieTitle];
	//console.log(sql);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		//return res.json(results);
		let string = JSON.stringify(results)
		res.send({ express: string })



	});
	connection.end();
});


// Api to add movieTrailer in the db for a movie
app.post('/api/addMovieTrailer', (req, res) => {
	let connection = mysql.createConnection(config);
	let movieTitle = req.body.movieTitle;
	let movieTrailer = req.body.movieTrailer;

	let sql = `Update movies set trailer = "${movieTrailer}"` + ' ' + `where name = "${movieTitle}"`;
	let data = [movieTitle, movieTrailer];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results)
		res.send({ express: string })

	});
	connection.end();
});

// api to search and fetch movie detaills
app.post('/api/search', (req, res) => {
	let connection = mysql.createConnection(config);
	let movieTitle = req.body.movieTitle;
	let actorName = req.body.actorName;
	let directorName = req.body.directorName;

	let sql2 = ' ';

	let sql1 = `select title, directorName, Group_Concat(DISTINCT RV.reviewContent) as review, avg(RV.reviewScore) as score
	from (
	
		select M.id, M.name as title, CONCAT (D.first_name, ' ', D.last_name) as directorName, CONCAT (A.first_name, ' ', A.last_name) as actorName
	
		from actors A, directors D, movies M, movies_directors MD, roles R
	
		where D.id = MD.director_id
	
		and MD.movie_id = M.id
	
		and M.id = R.movie_id
	
		and R.actor_id = A.id`;

	if (movieTitle) {
		sql2 = sql2 + `and M.name = "${movieTitle}"` + ' ';
		if (directorName) {
			sql2 = sql2 + `and CONCAT(D.first_name, ' ', D.last_name) = "${directorName}"` + ' ';
		}
		if (actorName) {
			sql2 = sql2 + `and CONCAT(A.first_name, ' ', A.last_name) = "${actorName}"`;
		}
	}
	else {
		if (directorName) {
			sql2 = sql2 + `and CONCAT(D.first_name, ' ', D.last_name) = "${directorName}"` + ' ';
		}
		if (actorName) {
			sql2 = sql2 + `and CONCAT(A.first_name, ' ', A.last_name) = "${actorName}"`;
		}
	}

	let sql3 = `) as M
	
	left join Review RV on M.id = RV.movieID
	
	group by title, directorName;`;

	let sql = sql1 + sql2 + sql3;

	connection.query(sql, movieTitle, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		//return res.json(results);
		let string = JSON.stringify(results)
		res.send({ express: string })
	});
	connection.end();
});



app.listen(port, () => console.log(`Listening on port ${port}`));
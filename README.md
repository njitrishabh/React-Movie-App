## Summary: 
Implement a React/NodeJS/MySQL Movie app.

## Development Steps:

1. NodeJS part of the code is in node-react-app/server.js 

2. The App has the following main React components: App, Review, Search, FindTrailer.

Four components (Landing, Search, Review, FindTrailer) correspond to four pages in the rendered app. Used React client-side routing to navigate between these pages. The pages have the following paths:

| Component | Path      |
|---------- |---------- |
| Landing   | /         |
| Search    | /Search   |
| Review    | /Review   |
| FindTrailer    | /FindTrailer   |

  
Here, `Path` represents the affix that will appear at the end of the URL when you navigate to that page. For example, when you use client-side routing to navigate to Search, you will see:

`http://myURL.com/Search`

3. All four pages in the application has a Material UI Appbar (https://mui.com/material-ui/react-app-bar/) at the top of the page, containing text links to all other pages.


4. ### Landing page
   
  a. The code for the landing page is in client/src/components/Landing/index.js
    
  b. Included the MUI Appbar in the `Landing` page with the links to `Search`, `Review`, and `FindTrailer`. 
    
  c. Listed movies as content for the Landing page related to the movie app.

    Reading the list of movies from MySQL:
      i. Upon the first render, the React code would send a request to the NodeJS POST API getMovies in server.js to
      retrieve the list of all movie records from the movies table in MySQL.
      ii. When the React code receives the list of movies, it assigns the received movies list to a stateful list movies.
      iii. populating the MUI Select element with the values from the stateful list.
      iv. In NodeJS there's a POST API getMovies that will receive a POST request from React and retrieve all
      records of movies from movies table in MySQL. For each movie, it retrieves all fields (id, name,
      year, quality). Finally, the API sends the list of records as a JSON object to React.

5. ### Search page
  a. This is a page for searching for movies by title, actor and director. The results show the movie title, director, texts of user-entered reviews (if any) and average user review scores.

  b.	The page contains three MUI text fields for searching by:

    i.	Movie title

    ii.	Actor's first name + last name (as one field)

    iii.	Director's first name + last name (as one field)

  c.	The user may specify multiple or any one of the search criteria at a time. If multiple search criteria are entered, used AND (not OR) when composing SQL statement. For example, if user entered a Director's name and an Actor's name, then the retrieved movies satisfies BOTH of these criteria.

  d.	One Search button. Upon clicking this button, the React code would send all of the search criteria to the NodeJS server. The server will send them as MySQL SELECT statement(s) to the MySQL database, and return back the retrieved data.

  e.	Specifically, the retrieved movie data consist of:  

    i.	the movie title

    ii.	director's first + last name

    iii.	the list of all texts of user-entered reviews (if any) and average user review scores.

  f.	Included the MUI Appbar in the `Search` page with the links to `Landing`, `Review`, and `FindTrailer`.


7.	### Review page

a.	This page includes reading movies from MySQL and writing user-entered reviews into the MySQL tables.

b.	Under client/src/components/ created a new directory `Review` and save this page as index.js under that directory.

c.	Included the MUI Appbar in the `Review` page with the links to `Landing`, `Search`, and `FindTrailer`.

    Writing the user-created movie review to MySQL
      i. When the user clicks Submit button, the React sends all review data (movie id, user id, reviewTitle,
      reviewContent, reviewScore) to the POST API addReview in server.js .
      ii. In server.js a POST API addReview , which receives user-created review from React, and inserts the
      review data into the appropriate table(s) in the database.


8.	### FindTrailer 

a.	This is a page where save/browse/view embedded videos of movie trailers.  The page read and write data from/to the IMDB database based on the movie title.

b.	Under client/src/components/ created a new directory FindTrailer and saved this page as index.js under that directory.

c.	Included the MUI Appbar in the `FindTrailer` page with the links to `Landing`, `Review` and `Search`.


9.	Visual design

The entire app uses visually consistent MUI styling.






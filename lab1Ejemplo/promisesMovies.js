/* axios = require('axios'); 
const fs = require('fs').promises; 
 
 
axios.get('https://ghibliapi.herokuapp.com/films') 
    .then((response) => { 
        console.log('Successfully retrieved our list of movies'); 
        response.data.forEach(movie => { 
            console.log(`${movie['title']}, ${movie['release_date']}`); 
        }); 
    }) */

const axios = require('axios'); 
const fs = require('fs').promises; 
 
axios.get('https://api.coindesk.com/v1/bpi/currentprice.json') 
    .then((response) => { 
        console.log('Successfully retrieved our list of movies'); 
        let movieList = ''; 
        response.data.forEach(movie => { 
            movieList += `${movie['code']}, ${movie['bpi']}\n`; 
        }); 
 
        return fs.writeFile('promiseMovies.csv', movieList); 
    }) 
    .then(() => { 
        console.log('Saved our list of movies to promiseMovies.csv'); 
    }) 
 
 
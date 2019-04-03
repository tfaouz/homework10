
var axios = require('axios');

var dotenv = require("dotenv").config(); // ask ta about .config

var moment = require('moment');

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);


var command = process.argv[2];

var name = process.argv.slice(3).join(" ");
// console.log("working");
console.log(process.env.SPOTIFY_ID);


if ((command === "movie-this") && (!name)) {
    movieThingdefault = "Snatch";
    console.log("It's on Netflix!");
} else if (command === "movie-this") {
    omdb();
} else if (command === "concert-this") {
    band();
    console.log("stuff");
} else if (command === "spotify-this-song") {
    spotifyCommand();
    console.log("spotify test");
} else {
    console.log("something went wrong check it again");
}

function spotifyCommand() {
    console.log("spotify worked");

    spotify.search({
        type: 'track',
        query: input,
        limit: 5
    })
        .then(function (response) {

            anything = response.tracks.items;

            anything.forEach(function (thisTrack) {

                console.log("Song Name: " + thisTrack.name);
                console.log("Artist's Name: " + thisTrack.artists[0].name);
                console.log("Albumb Name: " + thisTrack.album.name);
                console.log("Preview URL: " + thisTrack.external_urls.spotify);

            })
        })
        .catch(function (err) {
            console.log(err);
        });
}

function band() {
    //console.log("band worked")
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
        .then(function (response) {
            for (i = 0; i <= 9; i++) {
                var convertedDate = moment(response.data[i].datetime).format('MMMM Do YYYY, h:mm:ss a');

                console.log("Band Name: " + input);
                console.log("Date of Concert: " + convertedDate);
                console.log("Venue Name: " + response.data[i].venue.name);
                console.log("Venue City: " + response.data[i].venue.city);
            }
        })
        .catch(function (error) {
            //console.log("thingsarentworking")
            //console.log(error);
        });
}


function omdb(movie) {
    console.log(movie);
    console.log("omdb worked")
    axios.get('https://www.omdbapi.com/?y=&plot=short&apikey=trilogy&t=' + movie)
        .then(function (response) {

            console.log(response.data.Title,
                response.data.Year,
                response.data.Ratings[0],
                response.data.Ratings[1],
                response.data.Country,
                response.data.Plot,
                response.data.Actors);
        })
}
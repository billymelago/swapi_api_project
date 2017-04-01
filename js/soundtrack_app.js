//This app Calls for the soundtrack of the movie 
const app = {};

app.spotifyURL = 'https://api.spotify.com/v1/';

//Get name of film title clicked
//Passes the title along to the fnction that 
//Searches Spotify for the soundtrack
app.events = function(f) {
    let filmName = f;
    let search = app.searchAlbum(filmName);
    
    app.retreiveAlbumArt(search);
    app.retreiveAlbumURI(search);
};

//Go to spotify and get the album
app.searchAlbum = (movieTitle) => $.ajax({
    url: `${app.spotifyURL}search`,
    method: 'GET',
    dataType: 'json',
    data: {
        q: movieTitle,
        type: 'album'
    }
});

//Get the album art
app.retreiveAlbumArt = function(search) {
    $.when(search)
        .then((results) => {
            results = results.albums.items[0].images[1].url;
            app.displayCoverArt(results);
        });
};

//Get the album uri
app.retreiveAlbumURI = function(search) {
    $.when(search)
        .then((results) => {
            results = results.albums.items[0].uri;
            app.buildPlaylist(results);
        });
};
//then Build playlist
app.buildPlaylist = function(albumURI) {
    $.when(albumURI)
        .then($('.loader').show())
        .then((albumURI) => {
            
            $('#cover_art').append(`<div class="loader_cont loader"><img class="loader_icon" src="./img/ripple.svg" alt=""></div>`);
       
            const baseUrl = `https://embed.spotify.com/?uri=${albumURI}`;
            $('#film_cont').append(`<div id="soundtrack"><iframe src="${baseUrl}" width="200" height="300" frameborder="0" allowtransparency="true"></iframe></div>`);
        });
};
//Display movie album cover art
app.displayCoverArt = function(coverArt) {
    $.when(coverArt)
        .then((coverArt) => {
            const imgURL = coverArt;
            $('#film_cont').html(`<div id="cover_art"><img src="${imgURL}" alt"Album Cover Art"><img></div>`);
            });
};
//Initilizes the app and
//Passes the films name along to the events function
app.init = function(f) {
  app.events(f);  
};

//$(app.init);
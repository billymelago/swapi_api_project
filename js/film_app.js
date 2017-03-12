//This app displays the character stats for each person in the film
//This gets displayed in the overlay
let showFilmStats = (filmTitle) => {
    $('#data_cont').html("");
    $overlay.append($closeBtn);
    $closeBtn.click(function (){$overlay.hide()});
    //Show Overlay
    $overlay.show();
    let getEpisodeRoman = (episodeID) => {
        switch (episodeID) {
            case 1:
                romanID = 'I';
                break;
            case 2:
                romanID = 'II';
                break;
            case 3:
                romanID = 'III';
                break;
            case 4:
                romanID = 'IV';
                break;
            case 5:
                romanID = 'V';
                break;
            case 6:
                romanID = 'VI';
                break;
            case 7:
                romanID = 'VII';
                break;    
            default:
                alert("Sorry we can't find what you're searching for.");
        }
    };
        //Make call to film API page
        let filmURL = 'http://swapi.co/api/films/?search=' + filmTitle;
        console.log(filmTitle);
        function displayFilmDetails(data) {
            let results = data.results;
            filmHTML = '<p>' + filmTitle + '</p>';
            filmHTML += '<ul>';
            $.each(results, function (i, name) {
                console.log(name.episode_id);
                getEpisodeRoman(name.episode_id);
                filmHTML += '<li class="names film_title">';
                filmHTML += '<h2>Star Wars, Episode ' + romanID + ': ' + name.title + '</h2>';
                filmHTML += '<p>Release Date, ' + name.release_date + '.  Directed by ' + name.director  + ' and Produced by ' + name.producer + '.</p>';
                filmHTML += '<div id="opening_crawl"><p>' + name.opening_crawl + '</p></div>';
                filmHTML += '</li>';
            }); // end each
            $('#data_cont').html(filmHTML);
        }
        $.getJSON(filmURL, displayFilmDetails);
};
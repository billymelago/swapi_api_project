//This app displays the character stats for each person in the film
//This gets displayed in the overlay
let showFilmStats = (filmTitle) => {
    $('#data_cont').html("");
    $overlay.append($closeBtn);
    $closeBtn.click(function (){
        $overlay.hide();
        $('#data_cont').html("");
        $('#main').html("");
    });
    //Show Overlay
    $overlay.show();
    let getEpisodeRoman = (episodeID) => {
        switch (episodeID) {
            case 1:
                romanID = 'I';
                nextFilTitle = 'Attack of the Clones';//5/
                prevFilTitle = 'Return of the Jedi';//3/
                break;
            case 2:
                romanID = 'II';
                nextFilTitle = "Revenge of the Siths";
                prevFilTitle = 'The Phantom Menace'; 
                console.log('nextFilmTitle');
                break;
            case 3:
                romanID = 'III';
                nextFilTitle = 'The Force Awakens';//7/
                prevFilTitle = 'Attack of the Clones';//5/
                break;
            case 4:
                romanID = 'IV';
                nextFilTitle = 'The Empire Strikes Back';//2/
                prevFilTitle = 'The Force Awakens';//7/
                break;
            case 5:
                romanID = 'V';
                nextFilTitle = 'Return of the Jedi';//3/
                prevFilTitle = 'A New Hope';//1/
                break;
            case 6:
                romanID = 'VI';
                nextFilTitle = 'The Phantom Menace';//4/
                prevFilTitle = 'The Empire Strikes Back';//2/
                break;
            case 7:
                romanID = 'VII';
                nextFilTitle = 'A New Hope';//1/
                prevFilTitle = 'Revenge of the Siths';//6/
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
            filmHTML = '<p>' + filmTitle + ' </p>';
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
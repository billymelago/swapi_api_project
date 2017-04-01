//This app displays the stats for each starship in the film
//This gets displayed in the overlay
let showStarshipStats = (starshipName) => {
    $overlay.show(function() {
        $('#data_cont').html('<img src="/img/ripple.svg" alt="">');
    });
    setTimeout(function() {
    //Get person data
    $.getJSON('https://swapi.co/api/films/', function (filmResponse) {
        var films = filmResponse.results;
        //Get People data
        $.getJSON('https://swapi.co/api/starships/?search=' + starshipName, function (starshipResponse) {
            var starData = starshipResponse.results[0];
            console.log(starData);
            var model, starshipClass, manufacturer, cost, length, crew, passengers, atmosphericSpeed, hyperdrive, MGLT, cargo, consumables;
            var starHTML = '<p>Information for the ' + starshipName + '</p>';
            starHTML += '<h2>' + starData.name + '</h2>';
            starHTML += '<div id="data_stats_cont">';
            //$.each(data, function (i, starData) {
                model = starData.model;
                starshipClass = starData.starship_class;
                manufacturer = starData.manufacturer;
                cost = starData.cost_in_credits;
                length = starData.length;
                crew = starData.crew;
                passengers = starData.passengers;
                atmosphericSpeed = starData.max_atmosphering_speed;
                hyperdrive = starData.hyperdrive_rating;
                MGLT = starData.MGLT;
                cargo = starData.cargo_capacity;
                consumables = starData.consumables;
                starHTML += '<ul class="star_stats">';
                starHTML += '<li>Official Name: ' + model + '</li>';
                starHTML += '<li>Starship Class: ' + starshipClass + '</li>';
                starHTML += '<li>Manufactured by: ' + manufacturer + '</li>';
                starHTML += '<li>Cost (galactic credits): ' + cost + '</li>';
                starHTML += '<li>Length: ' + length + ' meters</li>';
                starHTML += '<li>Crew Required: ' + crew + '</li>';
                starHTML += '<li>Maximum Passengers: ' + passengers + '</li>';
                starHTML += '<li>Max Atmospheric Speed: ' + atmosphericSpeed + '</li>';
                starHTML += '<li>Hyperdrive Rated: ' + hyperdrive + '</li>';
                starHTML += '<li>MGLT (Megalights per hour): ' + MGLT + '</li>';
                starHTML += '<li>Cargo Capacity: ' + cargo + ' kilograms</li>';
                starHTML += '<li>Consumables Supply: ' + consumables + '</li>';

                if(starData.films.length){
                    starHTML += '<li><h3>The ' + starshipName + ' has appeared in:</h3></li>';
                    starHTML += '<li><ol>';
                    //Loop thru films data
                    $.each(starData.films, function(i, filmURL) {
                        for (var c = 0; c < films.length; c++) {
                            if (films[c].url === filmURL) {
                                starHTML += '<li class="film_name">';
                                starHTML += films[c].title;
                                starHTML += '</li>';
                                break;   
                            }//end if films match
                        }
                    });//end $.each(filmURL)
                    starHTML += '</ol></li>';
                } //end if films have length
            //}); // end each     
            starHTML += '</ul>';
            starHTML += '</div>';
            $('#data_cont').html(starHTML);
            //Click on title to display overlay, stats and call Spotify
            $('.film_name').click(function(){
                //Get the name of the film that was clicked
                var filmName = $(this).text();
                showFilmStats(filmName);
                app.init(filmName);

            });//end films.click()
        }); // end JSON(peopleResponse)
    }); // end JSON(filmResponse)
    }, 2000);
//}); 
};
//This app displays the stats for each vehicle in the film
//This gets displayed in the overlay
let showvehicleStats = (vehicleName) => {
    $overlay.show(function() {
        $('#data_cont').html('<img src="../ripple.svg" alt="">');
    });
    setTimeout(function() {
    //Get person data
    $.getJSON('http://swapi.co/api/films/', function (filmResponse) {
        var films = filmResponse.results;
        //Get People data
        $.getJSON('http://swapi.co/api/vehicles/?search=' + vehicleName, function (vehicleResponse) {
            var data = vehicleResponse;
            var model, vehicleClass, manufacturer, cost, length, crew, passengers, atmosphericSpeed, cargo, consumables;
            var starHTML = '<p>Information for the ' + vehicleName + '</p>';
            starHTML += '<h2>' + data.results[0].name + '</h2>';
            starHTML += '<div>';
            $.each(data.results, function (i, starData) {
                model = starData.model;
                vehicleClass = starData.vehicle_class;
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
                starHTML += '<ul class="vehicles_stats">';
                starHTML += '<li>Official Name: ' + model + '</li>';
                starHTML += '<li>Vehicle Class: ' + vehicleClass + '</li>';
                starHTML += '<li>Manufactured by: ' + manufacturer + '</li>';
                starHTML += '<li>Cost in Galactic Credits: ' + cost + '</li>';
                starHTML += '<li>Length: ' + length + ' meters</li>';
                starHTML += '<li>Crew Required: ' + crew + '</li>';
                starHTML += '<li>Maximum Passengers: ' + passengers + '</li>';
                starHTML += '<li>Max Atmospheric Speed: ' + atmosphericSpeed + '</li>';
                starHTML += '<li>Cargo Capacity: ' + cargo + ' kilograms</li>';
                starHTML += '<li>Consumables Supply: ' + consumables + '</li>';

                if(starData.films.length){
                    starHTML += '<li><h3>The ' + vehicleName + ' has appeared in:</h3>';
                    starHTML += '<ol>';
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
            }); // end each     
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
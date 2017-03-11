//This app displays the stats for each planet in the film
//This gets displayed in the overlay
let showPlanetsStats = (name) => {
    $('#data_cont').html();
    $closeBtn.click(function (){$overlay.hide()});
    //Get person data
    $.getJSON('http://swapi.co/api/films/', function (filmResponse) {
        var films = filmResponse.results;
        //Get People data
        $.getJSON('http://swapi.co/api/planets/?search=' + name, function (planetResponse) {
            var data = planetResponse;
            var rotation, orbit, diameter, climate, gravity, terrain, water, population;
            var planetHTML = '<p>Information for the Planet: ' + name + '</p>';
            planetHTML += '<h2>' + data.results[0].name + '</h2>';
            planetHTML += '<div>';
            $.each(data.results, function (i, planetData) {
                rotation = planetData.rotation_period;
                orbit = planetData.orbital_period;
                diameter = planetData.diameter;
                climate = planetData.climate;
                gravity = planetData.gravity;
                terrain = planetData.terrain;
                water = planetData.surface_water;
                population = planetData.population;
                planetHTML += '<ul class="planet_stats">';
                planetHTML += '<li>Rotation Period: ' + rotation + '</li>';
                planetHTML += '<li>Orbital Period: ' + orbit + '</li>';
                planetHTML += '<li>Planet Diameter: ' + diameter + '</li>';
                planetHTML += '<li>Planets Climate: ' + climate + '</li>';
                planetHTML += '<li>Gravity Type: ' + gravity + '</li>';
                planetHTML += '<li>Planets Terrain: ' + terrain + '</li>';
                planetHTML += '<li>Surface Water: ' + water + '</li>';
                planetHTML += '<li>Population Size: ' + population + '</li>';

                if(planetData.films.length){
                    planetHTML += '<li><h3>' + name + ' has appeared in:</h3>';
                    planetHTML += '<ol class="film_name">';
                    //Loop thru films data
                    $.each(planetData.films, function(i, filmURL) {
                        for (var c = 0; c < films.length; c++) {
                            if (films[c].url === filmURL) {
                                planetHTML += '<li>';
                                planetHTML += films[c].title;
                                planetHTML += '</li>';
                                break;   
                            }//end if films match
                        }
                    });//end $.each(filmURL)
                    planetHTML += '</ol></li>';
                } //end if films have length
                
            }); // end each     
            planetHTML += '</ul>';
            planetHTML += '</div>';
            $overlay.show();
            $('#data_cont').html(planetHTML);
        
            //If the next button is clicked
            //check and see there is another li
            //grab the name from the li
            //store it as the URL for the getJSON call
            //make the getJSON call and display the results 

      
        }); // end JSON(peopleResponse)
    }); // end JSON(filmResponse)
//}); 
};
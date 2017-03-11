//This app displays the stats for each species in the film
//This gets displayed in the overlay
let showSpeciesStats = (speciesName) => {
    $('#data_cont').html("");
    $closeBtn.click(function (){$overlay.hide()});
    //Get person data
    $.getJSON('http://swapi.co/api/films/', function (filmResponse) {
        var films = filmResponse.results;
        //Get People data
        $.getJSON('http://swapi.co/api/species/?search=' + speciesName, function (speciesResponse) {
            var data = speciesResponse;
            var speciesClass, designation, height, skinColors, hairColors, eyeColors, averageLife, speakLanguage;
            var speciesHTML = '<p>Information for the ' + speciesName + ' Species</p>';
            speciesHTML += '<h2>' + data.results[0].name + '</h2>';
            speciesHTML += '<div>';
            $.each(data.results, function (i, speciesData) {
                speciesClass = speciesData.classification;
                designated = speciesData.designation;
                height = speciesData.average_height;
                skinColors = speciesData.skin_colors;
                hairColors = speciesData.hair_colors;
                eyeColors = speciesData.eye_colors;
                averageLife = speciesData.average_lifespan;
                speakLanguage = speciesData.language;
                speciesHTML += '<ul class="species_stats">';
                speciesHTML += '<li>Classified as: ' + speciesClass + '</li>';
                speciesHTML += '<li>Designated a: ' + designation + '</li>';
                speciesHTML += '<li>Average Height: ' + height + '</li>';
                speciesHTML += '<li>Skin Colors: ' + skinColors + '</li>';
                speciesHTML += '<li>Eye Colors: ' + eyeColors + '</li>';
                speciesHTML += '<li>Hair Colors: ' + hairColors + '</li>';
                speciesHTML += '<li>Average Life: ' + averageLife + '</li>';
                speciesHTML += '<li>Language Spoken: ' + speakLanguage + '</li>';
                

                if(speciesData.films.length){
                    speciesHTML += '<li><h3>The ' + speciesName + ' species has appeared in:</h3>';
                    speciesHTML += '<ol class="film_name">';
                    //Loop thru films data
                    $.each(speciesData.films, function(i, filmURL) {
                        for (var c = 0; c < films.length; c++) {
                            if (films[c].url === filmURL) {
                                speciesHTML += '<li>';
                                speciesHTML += films[c].title;
                                speciesHTML += '</li>';
                                break;   
                            }//end if films match
                        }
                    });//end $.each(filmURL)
                    speciesHTML += '</ol></li>';
                } //end if films have length
                $.getJSON(speciesData.homeworld, function (homeworldResponse) {
                    var homePlanet = homeworldResponse.name;
                    if (homePlanet == 'unknown') {
                        speciesHTML += '<h3>It is not documented on which planet ' + speciesData.name + ' was born.</h3>';
                    } else {
                            speciesHTML += '<p>' + speciesData.name + ' species are from the Planet <span id="homeworld">' + homeworldResponse.name + '</span>.';
                        };
                    $('#data_cont').html(speciesHTML);
                    console.log(homeworldResponse.name);
                });//End getJSON homeworld
            }); // end each     
            speciesHTML += '</ul>';
            speciesHTML += '</div>';
            $overlay.show();
            $('#data_cont').html(speciesHTML);
        
            //If the next button is clicked
            //check and see there is another li
            //grab the name from the li
            //store it as the URL for the getJSON call
            //make the getJSON call and display the results 

      
        }); // end JSON(peopleResponse)
    }); // end JSON(filmResponse)
//}); 
};
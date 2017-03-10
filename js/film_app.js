//This app displays the character stats for each person in the film
let showPeopleStats = (name) => {
    $closeBtn.click(function (){$overlay.hide()});
    //Get person data
    $.getJSON('http://swapi.co/api/films/', function (filmResponse) {
        var films = filmResponse.results;
        //Get People data
        $.getJSON('http://swapi.co/api/people/?search=' + name, function (peopleResponse) {
            var data = peopleResponse;
            var birthday, meters, realfeet, feet, inches, height, mass, gender;
            var peopleHTML = '<p>Character stats for: ' + name + '</p>';
            peopleHTML += '<ul>';
            $.each(data.results, function (i, peopleData) {
                gender = peopleData.gender;
                if (gender === 'male') {
                    gender = 'He';
                } else if (gender === 'female') {
                    gender = 'She';
                } else {
                    gender = peopleData.name;
                }
                meters = peopleData.height;
                birthday = peopleData.birth_year;
                height = peopleData.height;
                mass = peopleData.mass;
                if(birthday === 'unknown') birthday = 'not documented';
                realfeet = height * 0.03280839895;
                feet = Math.floor(realfeet);
                inches = Math.round((realfeet - feet) * 12);
                if(meters === 'unknown') {
                    height = 'not documented';
                } else {
                    meters = (meters * 0.01);
                    height = feet + "ft " + inches + "in (" + meters.toFixed(2) + "meters)";
                    };
                if (mass === 'unknown') {
                    mass = 'not documented';
                } else {
                  mass = Math.floor(mass * 2.20) + 'lbs';  
                }
                if(mass === 'unknown') mass = 'not documented';
                peopleHTML += '<li class="name">';
                peopleHTML += '<h2>' + peopleData.name + '</h2>';
                peopleHTML += '<h5>Year of Birth: ' + birthday + '</h5>';
                peopleHTML += '<h5>Height: ' + height + '</h5>';
                peopleHTML += '<h5>Weight: ' + mass + '</h5>';
                peopleHTML += '<h5>Skin Tone: ' + peopleData.skin_color + '</h5>';
                peopleHTML += '<h5>Eye Color: ' + peopleData.eye_color + '</h5>';

                if(peopleData.films.length){
                    peopleHTML += '<h3>' + name + ' has appeared in the following film(s):</h3>';
                    peopleHTML += '<ul class="film_name">';
                    //Loop thru films data
                    $.each(peopleData.films, function(i, filmURL) {
                        for (var c = 0; c < films.length; c++) {
                            if (films[c].url === filmURL) {
                                peopleHTML += '<li>';
                                peopleHTML += films[c].title;
                                peopleHTML += '</li>';
                                break;   
                            }//end if films match
                        }
                    });//end $.each(filmURL)
                    peopleHTML += '</ul>';
                } //end if films have length
                $.getJSON(peopleData.homeworld, function (homeworldResponse) {
                    var homePlanet = homeworldResponse.name;
                    if (homePlanet == 'unknown') {
                        peopleHTML += '<h3>It is not documented on which planet ' + peopleData.name + ' was born.</h3>';
                    } else {
                            peopleHTML += '<p>' + peopleData.name + ' was born on the Planet <span id="homeworld">' + homeworldResponse.name + '</span>, in the year ' + birthday + '.';
                        };
                    //$('#data_cont').html(peopleHTML);
                    console.log(homeworldResponse.name);
                    $('#homeworld').click(function () {
                        console.log($(this).text());
                    });
                });//End getJSON homeworld
                
                $.getJSON(peopleData.species, function (speciesResponse) {
                    var species = speciesResponse.name;
                    var lifeSpan = speciesResponse.average_lifespan;
                    if (lifeSpan === 'unknown') {
                        lifeSpan = 'The average lifespan of ' + species + 's is not know...'
                    } else if(lifeSpan == 'indefinite') {
                        lifeSpan = species + 'Will live forever!'
                    } else {
                        lifeSpan = ' and are expected to live for ' + lifeSpan + ' years.'
                    }
                    if (species) {
                        peopleHTML += ' ' + gender + ' is from the <span id="species">' + species + ' species.</span> ' + species + 's speak the ' + speciesResponse.language +  ' language ' + lifeSpan + '</p>';
                        }
                    $('#data_cont').html(peopleHTML);
                    console.log(species);
                    $('#species').click(function () {
                        console.log($(this).text());
                    });
                });//End getJSON species
            
            }); // end each     
            peopleHTML += '</li>';
            peopleHTML += '</ul>';
            $overlay.show();
            //$('#data_cont').html(peopleHTML);
        
            //If the next button is clicked
            //check and see there is another li
            //grab the name from the li
            //store it as the URL for the getJSON call
            //make the getJSON call and display the results 

      
        }); // end JSON(peopleResponse)
    }); // end JSON(filmResponse)
    
//}); 
};
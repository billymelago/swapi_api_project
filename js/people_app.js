//This app displays the character stats for each person in the film
//This gets displayed in the overlay
let showPeopleStats = (name) => {
    $overlay.show(function() {
        $('#data_cont').html('<img src="./img/ripple.svg" alt="">');
    });
    setTimeout(function() {
    //Get person data
    $.getJSON('https://swapi.co/api/films/', function (filmResponse) {
        var films = filmResponse.results;
        //Get People data
        $.getJSON('https://swapi.co/api/people/', {search: name}, function (peopleResponse) {
            var data = peopleResponse;
            var birthday, meters, realfeet, feet, inches, height, mass, gender;
            console.log(name);
            var peopleHTML = '<p>Character stats for: ' + name + '</p>';
            peopleHTML += '<h2>' + data.results[0].name + '</h2>';
            peopleHTML += '<div id="data_stats_cont">';
            $.each(data.results, function (i, peopleData) {
                console.log(peopleData);
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
                peopleHTML += '<ul class="name people_stats">';
                peopleHTML += '<li>Year of Birth: ' + birthday + '</li>';
                peopleHTML += '<li>Height: ' + height + '</li>';
                peopleHTML += '<li>Weight: ' + mass + '</li>';
                peopleHTML += '<li>Skin Tone: ' + peopleData.skin_color + '</li>';
                peopleHTML += '<li>Eye Color: ' + peopleData.eye_color + '</li>';

                if(peopleData.films.length){
                    peopleHTML += '<li>';
                    peopleHTML += '<h3>' + name + ' has appeared in:</h3>';
                    peopleHTML += '<ol>';
                    //Loop thru films data
                    $.each(peopleData.films, function(i, filmURL) {
                        for (var c = 0; c < films.length; c++) {
                            if (films[c].url === filmURL) {
                                peopleHTML += '<li class="film_name">';
                                peopleHTML += films[c].title;
                                peopleHTML += '</li>';
                                break;   
                            }//end if films match
                        }
                    });//end $.each(filmURL)
                    peopleHTML += '</ol>';
                    peopleHTML += '</li>';
                    
                } //end if films have length
                $.getJSON(peopleData.homeworld.replace('http', 'https'), function (homeworldResponse) {
                    var homePlanet = homeworldResponse.name;
                    if (homePlanet == 'unknown') {
                        peopleHTML += '<h3>It is not documented on which planet ' + peopleData.name + ' was born.</h3>';
                    } else {
                            peopleHTML += '<p>' + peopleData.name + ' was born on the Planet <span id="homeworld">' + homeworldResponse.name + '</span> in the year ' + birthday + '.';
                        };
                    //$('#data_cont').html(peopleHTML);
                    console.log(homeworldResponse.name);
                });//End getJSON homeworld
                
                $.getJSON(peopleData.species[0].replace('http', 'https'), function (speciesResponse) {
                    var species = speciesResponse.name;
                    var lifeSpan = speciesResponse.average_lifespan;
                    var language = speciesResponse.language;
                    if(language === 'n/a') {
                        language = 'a Binary language ';
                    } else if (language === 'unknown') {
                        language = 'an unknown language';
                    } else {
                        language;
                    }
                    if (lifeSpan === 'unknown') {
                        lifeSpan = '. The average lifespan of ' + species + 's is not known.'
                    } else if(lifeSpan == 'indefinite') {
                        lifeSpan = 'and will live FOREVER!'
                    } else {
                        lifeSpan = ' and are expected to live for ' + lifeSpan + ' years.'
                    }
                    if (species) {
                        peopleHTML += ' ' + gender + ' is from the <span id="species">' + species + ' species.</span> ' + species + 's speak ' + language +  '  ' + lifeSpan + '</p>';
                        };
                    
                    $('#data_cont').html(peopleHTML);
                    $('#data_cont').fadeIn(10000);
                    //Click on title to display overlay, stats and call Spotify
                    $('.film_name').click(function(){
                        //Get the name of the film that was clicked
                        var filmName = $(this).text();
                        showFilmStats(filmName);
                        app.init(filmName);
                    });//end films.click()
                });//End getJSON species
            }); // end each     
            peopleHTML += '</ul>';
            peopleHTML += '</div>';
            
            $('#data_cont').html(peopleHTML);
            
        }); // end JSON(peopleResponse)
        
    }); // end JSON(filmResponse)
    }, 2000);    
};
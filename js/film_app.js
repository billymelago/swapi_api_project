$('.film_app').click(function() {
    var pages = 1;
    $('#photos').html("");
    $('#movie_cont').html("");
    //Get film data
    $.getJSON('http://swapi.co/api/films/', function(filmResponse) {
        var films = filmResponse.results;
        /*var filmsHTML = '<ul>';
        
        //Loop thru film data
        $.each(films, function(i, filmData) {
            filmsHTML += '<li class="filmTitle">';
            filmsHTML += filmData.title;
            filmsHTML += '</li>';
        });// end .each(filmData)
        filmsHTML += '</ul>';
        $('#movie_cont').html(filmsHTML);*/
        
        //Get People data
        $.getJSON('http://swapi.co/api/people/?page=' + pages, function(peopleResponse){
            var people = peopleResponse.results;
            var peopleHTML = '<ul>';

                //Loop thru people results
                $.each(people, function(i, peopleData) {
                    peopleHTML += '<li class="name">';
                    peopleHTML += '<h2>' + peopleData.name + '</h2>';
                    if(peopleData.films.length){
                        peopleHTML += '<h3>Appeared in the following film(s):</h3>';
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
                      
                    peopleHTML += '</li>';
                }); // end $.each(peopleData)
                peopleHTML += '</ul>';
                $('#characters_cont').html(peopleHTML);
            
        }); // end JSON(peopleResponse)
    }); // end JSON(filmResponse)
});    
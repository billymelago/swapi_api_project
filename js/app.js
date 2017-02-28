var $, $searchField, $submitButton, peoppleAPI, person, swapiOptions, nameHTML, filmAPI, film, swapiOptionsF, filmHTML, keyword, keywordAPI, swapiOptionsK, keywordHTML, films, filmsHTML;
var $overlay = $('<div id="overlay"></div>');

$(document).ready(function () {
    "use strict";
    $("body").append($overlay);
    $('form').submit(function (evt) {
        evt.preventDefault();
        $searchField = $('#search');
        $submitButton = $('#submit');
        $searchField.prop('disabled', true);
        $submitButton.attr('disabled', true).val('Looking...');

        // the AJAX part
        peoppleAPI = "http://swapi.co/api/people/";
        person = $('#search').val().toLowerCase();
        swapiOptions = {
            search: person,
            format: "json"
        };
        function displayName(data) {
            nameHTML = '<ul>';
            $.each(data.results, function (i, name) {
                nameHTML += '<li class="names">';
                nameHTML += '<h2>' + name.name + '</h2>';
                nameHTML += '</li>';
            }); // end each
            
            nameHTML += '</ul>';
            $('#photos').html(nameHTML);
            $searchField.prop('disabled', false);
            $submitButton.attr('disabled', false).val('Search');
        }
        $.getJSON(peoppleAPI, swapiOptions, displayName);

        // the AJAX films part
        filmAPI = "http://swapi.co/api/films/";
        film = $('#search').val().toLowerCase();
        swapiOptionsF = {
            search: film,
            format: "json"
        };
        function displayFilm(data) {
            filmHTML = '<ul>';
            $.each(data.results, function (i, film) {
                filmHTML += '<li class="films">';
                filmHTML += '<h2>' + film.title + '</h2>';
                filmHTML += '</li>';
            }); // end each
            filmHTML += '</ul>';
            $('#photos').html(filmHTML);
            $searchField.prop('disabled', false);
            $submitButton.attr('disabled', false).val('Search');
        }
        $.getJSON(filmAPI, swapiOptionsF, displayFilm);

        // the AJAX keyword part
        keyword = $('#search').val().toLowerCase();
        keywordAPI = "http://swapi.co/api/" + keyword + '/';
        swapiOptionsK = {
            //search: keyword,
            format: "json"
        };
        function displayKeyword(data) {
            keywordHTML = '<div>';
            keywordHTML += '<span class="keyword">';
            keywordHTML += '<h2>In the Star Wars API there are a total of  ' + data.count + ' ' + keyword + '!</h2>';
            keywordHTML += '</span>';
            keywordHTML += '</div>';
            $('#photos').html(keywordHTML);
            $searchField.prop('disabled', false);
            $submitButton.attr('disabled', false).val('Search');
        }
        $.getJSON(keywordAPI, swapiOptionsK, displayKeyword);    
    }); // end click
    
    //Navigation click loads first page of swapi results
    $('.resource').click(function () {
        $(".resource").removeClass("selected");
        $(this).addClass("selected");
        var resource = $(this).text().toLowerCase(),
            page = 1,
            swapiAPI = "http://swapi.co/api/" + resource + "/?page=" + page,
            swapiOptionsR = {
            };
        var nameHTML = '<p>' + resource.toUpperCase() + ' Page: ' + page + '</p>';
        function displayResource(data) {
            nameHTML += '<ul>';
            $.each(data.results, function (i, name) {
                nameHTML += '<li class="names">';
                nameHTML += '<h2>' + name.name  + '</h2>';
                nameHTML += '</li>';
            }); // end each
            
            nameHTML += '</ul>';
            $('#characters_cont').html();
            $('#movie_cont').html();
            $('#overlay').html(nameHTML);
            
            $('#next').click(function () {
                $('#photos').html();
                var nextText = data.next;
                console.log(page);
                if (page < 9) {
                    page++;
                    console.log(page);
                    nameHTML = '<p>' + resource.toUpperCase() + ' Page: ' + page + '</p>';
                    function displayNextResource(data) {
                        nameHTML += '<ul>';
                        $.each(data.results, function (i, name) {
                            nameHTML += '<li class="names">';
                            nameHTML += '<h2>' + name.name  + '</h2>';
                            nameHTML += '</li>';
                        }); // end each

                        nameHTML += '</ul>';
                        $('#characters_cont').html();
                        $('#movie_cont').html();
                        $('#overlay').html(nameHTML);
                    }
                    $.getJSON("http://swapi.co/api/" + resource + "/?page=" + page, displayNextResource);
                    console.log(nextText);
                } else {console.log("Nope")}//End IF
            });//End $(#next).click()
            

        }//End displayResource()
        $.getJSON(swapiAPI, swapiOptionsR, displayResource);
    });
                
        //Get film data
    $('.the_films').click(function () {
        $('#photos').html("");
        $('#characters_cont').html("");
        $.getJSON('http://swapi.co/api/films/', function (filmResponse) {
            films = filmResponse.results;
            filmsHTML = '<ul>';

            //Loop thru film data
            $.each(films, function (i, filmData) {
                filmsHTML += '<li class="filmTitle">';
                filmsHTML += filmData.title;
                filmsHTML += '</li>';
            });// end .each(filmData)
            filmsHTML += '</ul>';
            $('#movie_cont').html(filmsHTML);
        });
    });
}); // end ready
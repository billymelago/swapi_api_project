var $,
    $searchField, $submitButton, peoppleAPI, person, swapiOptions, planetsAPI, planet, displayPlanets, speciesAPI, species, displaySpecies, nameHTML, filmAPI, film, swapiOptionsF, filmHTML, keyword, keywordAPI, swapiOptionsK, keywordHTML, films, filmsHTML, nextText, prevText, randomPageNum, count, Rcount,
    $searchField = $('#search'),
    $submitButton = $('#submit'),
    $overlay = $('<div id="overlay"><div id="data_cont"></div><div id="film_cont"></div></div>'),
    $buttons = $('<div id="btn_cont"><button id="prev" class="btn btn-warning btn-sml" role="button">&#10094; Previous</button><button id="next" role="button">Continue &#10095;</button></div>'),
    $nextBtn = ('#next'),
    $prevBtn = ('#prev'),
    $closeBtn = $('<span id="close_btn">X</span>');
$overlay.append($closeBtn);
$overlay.append($buttons);
$(document).ready(function () {
    "use strict";
    $("body").append($overlay);
    $('input[type=reset]').click(() => {});
    //Navigation click loads first page of swapi results
    $('.resource').click(function () {
        var page = 1;
        $(".resource").removeClass("selected");
        $(this).addClass("selected");
        $overlay.show();
        $closeBtn.click(() => {
            $overlay.hide();
            nextText = '';
            prevText = '';
        });
        var resource = $(this).text().toLowerCase(),
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
            $('#data_cont').html(nameHTML);
            $('.names').click(function () {
                let personURL = $(this).text();
                showPeopleStats(personURL);
            });
            nextText = data.next;
            console.log(nextText);
            prevText = data.previous;
            console.log(prevText);
            $('#next').click(function () {
                $('#data_cont').html();
                console.log('current page:' + page);
                if (nextText) {
                    page++;
                    nameHTML = '<p>' + resource.toUpperCase() + ' Page: ' + page + '</p>';
                    function displayNextResource(data) {
                        prevText = data.previous;
                        nextText = data.next;
                        nameHTML += '<ul>';
                        $.each(data.results, function (i, name) {
                            nameHTML += '<li class="names">';
                            nameHTML += '<h2>' + name.name  + '</h2>';
                            nameHTML += '</li>';
                        }); // end each
                        nameHTML += '</ul>';
                        $('#characters_cont').html();
                        $('#movie_cont').html();
                        $('#photos').html();
                        $('#data_cont').html();
                        $('#data_cont').html(nameHTML);
                        $('.names').click(function () {
                            let personURL = $(this).text();
                            showPeopleStats(personURL);
                        });
                    }
                    $.getJSON(nextText, displayNextResource);
                    
                }//End IF
                console.log('Next url:' + nextText);
            });//End $(#next).click()
            
            $('#prev').click(function () {
                $('#data_cont').html();
                if (prevText) {
                    page--;
                    console.log('Current page:' + page);
                    nameHTML = '<p>' + resource.toUpperCase() + ' Page: ' + page + '</p>';
                    function displayPrevResource(data) {
                        prevText = data.previous;
                        nextText = data.next;
                        nameHTML += '<ul>';
                        $.each(data.results, function (i, name) {
                            nameHTML += '<li class="names">';
                            nameHTML += '<h2>' + name.name  + '</h2>';
                            nameHTML += '</li>';
                        }); // end each
                        nameHTML += '</ul>';
                        $('#characters_cont').html();
                        $('#movie_cont').html();
                        $('#data_cont').html();
                        $('#data_cont').html(nameHTML);
                        $('.names').click(function () {
                            let personURL = $(this).text();
                            showPeopleStats(personURL);
                        });
                    }
                    $.getJSON(prevText, displayPrevResource);
                }//End IF
                console.log('Prev url:' + prevText);
            });//End $(#prev).click()
        }//End displayResource()
        $.getJSON(swapiAPI, swapiOptionsR, displayResource);
    });
}); // end ready
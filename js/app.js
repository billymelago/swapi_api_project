var $,
    $searchField, $submitButton, peoppleAPI, person, swapiOptions, planetsAPI, planet, displayPlanets, speciesAPI, species, displaySpecies, nameHTML, filmAPI, film, swapiOptionsF, filmHTML, keyword, keywordAPI, swapiOptionsK, keywordHTML, films, filmsHTML, nextText, prevText, randomPageNum, count, randomAPI, letters, pickLetter, randomLetter, planetHTML, planetData, romanID, filmLogo,
    $searchField = $('#search'),
    $submitButton = $('#submit'),
    $overlay = $('<div id="overlay"><div id="data_cont"></div><div id="film_cont"></div></div>'),
    $random = ('#random'),

$swClose = $('<div id="nav-container" class="pushed"><div class="toggle-icon pushed"><span class="bar pushed"></span><span class="bar pushed"></span><span class="bar pushed"></span></div></div>');

$overlay.append($swClose);
$(document).ready(function () {
    "use strict";
    $("body").append($overlay);
    $('input[type=reset]').click(() => {
        $('main').html("");
        $('#count').html('');
    });
    $(".toggle-icon").click(function() {
        $('#nav-container').toggleClass("pushed");
    });
    $swClose.click(function (){
        $overlay.hide();
        $('#data_cont').html("");
        $('#film_cont').html("");
    });
}); // end ready
var $,
    $searchField, $submitButton, peoppleAPI, person, swapiOptions, planetsAPI, planet, displayPlanets, speciesAPI, species, displaySpecies, nameHTML, filmAPI, film, swapiOptionsF, filmHTML, keyword, keywordAPI, swapiOptionsK, keywordHTML, films, filmsHTML, nextText, prevText, randomPageNum, count, randomAPI, planetHTML, planetData, romanID,
    $searchField = $('#search'),
    $submitButton = $('#submit'),
    $overlay = $('<div id="overlay"><div id="data_cont"></div><div id="film_cont"></div></div>'),
    $buttons = $('<div id="btn_cont"><button id="prev" class="btn btn-warning btn-sml" role="button">&#10094; Previous</button><button id="next" role="button">Continue &#10095;</button></div>'),
    $nextBtn = ('#next'),
    $prevBtn = ('#prev'),
    $random = ('#random'),
    $closeBtn = $('<span id="close_btn">X</span>');
$overlay.append($closeBtn);
//$overlay.append($buttons);
$(document).ready(function () {
    "use strict";
    $("body").append($overlay);
    $('input[type=reset]').click(() => {});
}); // end ready
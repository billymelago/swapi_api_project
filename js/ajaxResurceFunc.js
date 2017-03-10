//These functions are called when a user types in the search box
let searchResource = $('select option:selected').val();

let searchValue = () =>{
    keyword = $('#search').val().toLowerCase();
};

let createRandoNumber = (x) =>{
    randomPageNum = Math.floor((Math.random() * x) + 1);
    return randomPageNum;
};

let searchLooking = () => {
    $searchField.prop('disabled', true);
    $submitButton.attr('disabled', true).val('Looking...');
};

let searchFound = () => {
    $searchField.prop('disabled', false);
    $submitButton.attr('disabled', false).val('Search');
};
    
let displaySearchResults = function display(data) {
    nameHTML = '<ul>';
    $.each(data.results, function (i, name) {
        nameHTML += '<li class="names">';
        nameHTML += '<h2>' + name.name + '</h2>';
        nameHTML += '</li>';
    }); // end each
    nameHTML += '</ul>';
    $('main').html(nameHTML);
    $('.names').click(function () {
        let personURL = $(this).text();
        showPeopleStats(personURL);
    });
    //$('.planets').click();
    //$('.species').click();
    //$('.starships').click();
    //$('.vehicles').click();
};

let displaySearchFilmResults = function displayFilm(data) {
    filmHTML = '<ul>';
    $.each(data.results, function (i, film) {
        filmHTML += '<li class="films">';
        filmHTML += '<h2>' + film.title + '</h2>';
        filmHTML += '</li>';
    }); // end each
    filmHTML += '</ul>';
    $('main').html(filmHTML);

    $('.films').click(function(){
        //Show Overlay
        $overlay.show();
        //Get the name of the film that was clicked
        var filmName = $(this).text();
        //Make call to film API page
        var filmURL = 'http://swapi.co/api/films/?search=' + filmName;
        console.log(filmName);
        function displayFilmDetails(data) {
            var results = data.results;
            filmHTML = '<p>' + results[0].producer + '</p>';
            $('#overlay').html(filmHTML);
            console.log(results[0]);
        }
        $.getJSON(filmURL, displayFilmDetails);
    });//end films.click()
};

let displayRandomSearchResults = (name) => {
    nameHTML = '<ul>';    
            nameHTML += '<li class="names">';
            nameHTML += '<h2>' + name.name + '</h2>';
            nameHTML += '</li>';
            nameHTML += '</ul>';
            $('main').html(nameHTML);
            $('.names').click(function () {
                let personURL = $(this).text();
                showPeopleStats(personURL);
});
};

let getDataCount = (sr) => {
    keywordAPI = "http://swapi.co/api/" + sr;
    
    function displayKeyword(data) {
        count = data.count;
        console.log(count);
        createRandoNumber(count);
        console.log(createRandoNumber);
        peoppleAPI = "http://swapi.co/api/people/" + randomPageNum + "/";
        /*swapiOptions = {
            search: count
        };*/
        function displayRandomSearchResults(data) {
            nameHTML = '<ul>';    
            nameHTML += '<li class="names">';
            nameHTML += '<h2>' + name.name + '</h2>';
            nameHTML += '</li>';
            nameHTML += '</ul>';
            $('main').html(nameHTML);
            $('.names').click(function () {
                let personURL = $(this).text();
                showPeopleStats(personURL);
            });
        $.getJSON(peoppleAPI, displayRandomSearchResults);
    }
    $.getJSON(keywordAPI, swapiOptions, displayKeyword);
 }
};

let searchRandoPeople = (rpn) => {
    peoppleAPI = "http://swapi.co/api/people/" + rpn + "/";
    /*swapiOptions = {
        search: rpn
    };*/
    $.getJSON(peoppleAPI, displayRandomSearchResults);
};

// the AJAX keyword part, how many of each resource are in the API
//People, Films, Planets, Species, Vehicles
let displayCount = () => {
    searchResource = $('select option:selected').val();
    searchResource = searchResource.toLowerCase();
    keywordAPI = "http://swapi.co/api/" + searchResource + "/";
    function   displayKeyword(data) {
        keywordHTML = '<div id="count">';
        keywordHTML += '<span class="keyword">';
        keywordHTML += '<h2>In the Star Wars API there are a total of  ' + data.count + '<span class="resource"> ' + searchResource + '</span> to search!</h2>';
        keywordHTML += '</span>';
        keywordHTML += '</div>';
        $('#count_cont').html(keywordHTML);
    }
    $.getJSON(keywordAPI, displayKeyword);
 };

// the AJAX People part, searches the people API for a character name
let searchPeople = () => {
    peoppleAPI = "http://swapi.co/api/people/";
    swapiOptions = {
        search: keyword
    };
    $.getJSON(peoppleAPI, swapiOptions, displaySearchResults);
};

// the AJAX Planets part, searches the planet API for a planet name
let searchPlanet = () => {
    planetsAPI = "http://swapi.co/api/planets/";
    swapiOptions = {
        search: keyword
    };
    $.getJSON(planetsAPI, swapiOptions, displaySearchResults);
};

// the AJAX Species part, searches the species API for a species type
let searchSpecies = () => {
    speciesAPI = "http://swapi.co/api/species/";
    swapiOptions = {
        search: keyword
    };
    $.getJSON(speciesAPI, swapiOptions, displaySearchResults);        
};

// the AJAX Starships part, searches the starships API for a starships name
let searchStarships = () => {
    starshipsAPI = "http://swapi.co/api/starships/";
    swapiOptions = {
        search: keyword
    };
    $.getJSON(starshipsAPI, swapiOptions, displaySearchResults);        
};

// the AJAX Starships part, searches the starships API for a starships name
let searchVehicles = () => {
    vehiclesAPI = "http://swapi.co/api/vehicles/";
    swapiOptions = {
        search: keyword
    };
    $.getJSON(vehiclesAPI, swapiOptions, displaySearchResults);        
};

// the AJAX films part
let searchFilms = () => {
    filmAPI = "http://swapi.co/api/films/";
    swapiOptions = {
        search: keyword
    };
    $.getJSON(filmAPI, swapiOptions, displaySearchFilmResults);
}; 

let selectResource = (searchResource) => {
    switch (searchResource) {
        case 'People':
            searchPeople();
            break;
        case 'Species':
            searchSpecies();
            break;
        case 'Planets':
            searchPlanet();
            break;
        case 'Starships':
            searchStarships();
            break;
        case 'Vehicles':
            searchVehicles();
            break;
        case 'Films':
            searchFilms();
            break;    
        default:
            alert("Sorry we can't find what you're searching for.");
    }
};


$('select').change(() => {
    displayCount();
    $('main').html('');
    $('#search').val('');
    searchResource = $('select option:selected').val();
    //selectResource(searchResource);
});
$('form').submit((evt) => {
    evt.preventDefault();
    searchResource = $('select option:selected').val();
    console.log(searchResource);
    searchValue();//gets input text    
    searchLooking();//loader
    selectResource(searchResource);
    searchFound();
});
$('#random').click(() => {
    //Get resource to search
    searchResource = searchResource.toLowerCase();
    createRandoNumber(87);
    console.log(randomPageNum);
    //run function that takes the resource and gets a random number between 1 and however many items are in that resource
    searchRandoPeople(randomPageNum);
    //searchlooking
});



let searchResource = $('select option:selected').val();

let searchValue = () => {
    keyword = $('#search').val().toLowerCase();
};

let createRandoNumber = (x) => {
    randomPageNum = Math.floor((Math.random() * x) + 1);
    return randomPageNum;
};

let createRandoLetter = () => {
    letters = 'abcdefghijklmnoprstuvwxyz';
    pickLetter = Math.floor(Math.random() * letters.length);
    randomLetter = letters.charAt(pickLetter);
    return randomLetter;
};

let searchLooking = () => {
    $searchField.prop('disabled', true);
    $submitButton.attr('disabled', true).val('Looking...');
};

let searchFound = () => {
    $searchField.prop('disabled', false);
    $submitButton.attr('disabled', false).val('Search');
};
  
//This function shows just the name of item searched
let displaySearchResults = function display(data) {
    $('#film_cont').html("");
    nameHTML = '<h4>Click an item for more info.</h4>';
    nameHTML += '<ul id="display_search_results">';
    $.each(data.results, function (i, name) {
        searchResource = searchResource.toLowerCase();
        //nameHTML += '<li class="names">';
        switch (searchResource) {
        case 'people':
            nameHTML += '<li class="names">';
            break;
        case 'species':
            nameHTML += '<li class="species">';
            break;
        case 'planets':
            nameHTML += '<li class="planets">';
            break;
        case 'starships':
            nameHTML += '<li class="starships">';
            break;
        case 'vehicles':
            nameHTML += '<li class="vehicles">';
            break;
        case 'films':
                $('#search').val('');
            searchFilms();
            break;    
        default:
            alert("Sorry we can't find what you're searching for.");
    }
        nameHTML += name.name;
        nameHTML += '</li>';
    }); // end each
    nameHTML += '</ul>';
    $('main').html(nameHTML);
    //Click on name to show overlay and display results
    $('.names').click(function () {
        let personURL = $(this).text();
        showPeopleStats(personURL);
    });
    $('.planets').click(function() {
        let planetURL = $(this).text();
        showPlanetsStats(planetURL);
    });
    $('.species').click(function() {
        let speciesURL = $(this).text();
        showSpeciesStats(speciesURL);
    });
    $('.starships').click(function() {
        let starURL = $(this).text();
        showStarshipStats(starURL);
    });
    $('.vehicles').click(function () {
        let vehicleURL = $(this).text();
        showvehicleStats(vehicleURL);
    });
};

//Function called when a film is searched
//It doesn't have a name attr have to use title
let displaySearchFilmResults = function displayFilm(data) {
    filmHTML = '<ul class="main_films_list">';
    var titleName = data.results.title;
    $.each(data.results, function (i, film) {
        filmHTML += '<li class="films">';
        filmHTML += '<h2>' + film.title + '</h2>';
        filmHTML += '</li>';
    }); // end each
    filmHTML += '</ul>';
    
    $('main').html(filmHTML);
    
    //Click on title to display overlay, stats and call Spotify
    $('.films').click(function(){
        //Get the name of the film that was clicked
        var filmName = $(this).text();
        showFilmStats(filmName);
        app.init(filmName);
        
    });//end films.click()
};

//This function shows just the name of item when 'RANDOM' is clicked
let displayRandomSearchResults = (name) => {
    //$('#film_cont').html("");
    nameHTML = '<h4>Click an item for more info.</h4>';
    nameHTML += '<ul>';
    console.log(searchResource);
    switch (searchResource) {
        case 'people':
            nameHTML += '<li class="names">';
            break;
        case 'species':
            nameHTML += '<li class="species">';
            break;
        case 'planets':
            nameHTML += '<li class="planets">';
            break;
        case 'starships':
            nameHTML += '<li class="starships">';
            break;
        case 'vehicles':
            nameHTML += '<li class="vehicles">';
            break;
        case 'films':
            $('#search').val('');
            searchFilms();
            break;    
        default:
            alert("Sorry we can't find what you're searching for.");
    }
    nameHTML += '<h2>' + name.name + '</h2>';
    nameHTML += '</li>';
    nameHTML += '</ul>';
    
    $('main').html(nameHTML);
    //Click on name to show overlay and display results
    $('.names').click(function () {
        let personURL = $(this).text();
        showPeopleStats(personURL);
    });
    $('.planets').click(function () {
        let planetURL = $(this).text();
        showPlanetsStats(planetURL);
    });
    $('.species').click(function() {
        let speciesURL = $(this).text();
        showSpeciesStats(speciesURL);
    });
    $('.starships').click(function() {
        let starURL = $(this).text();
        showStarshipStats(starURL);
    });
    $('.vehicles').click(function() {
        let vehicleURL = $(this).text();
        showvehicleStats(vehicleURL);
    });
};

//Use the name from the resource selected (sr) 
//to figure out which resource to call
//This is the function to call when random button is clicked
let getDataCount = (sr) => {
    sr = sr.toLowerCase();
    keywordAPI = "https://swapi.co/api/" + sr + "/";
    function displayKeyword(data) {
        //Get number of items to search
        count = data.count;
        console.log(count);
        //Creates a random number based on resource count
        //createRandoNumber(count);
        createRandoLetter();
        console.log(randomLetter);
        //Call function and insert the specific resource to display
        searchRandoResource(randomLetter);
    }
    $.getJSON(keywordAPI, displayKeyword);
};

//Gets the selected resource and inserts the random page to search
let searchRandoResource = (rpn) => {
    searchResource = searchResource.toLowerCase();
    randomAPI = "https://swapi.co/api/" + searchResource + "/?search=" + rpn;
    /*randoOptions = {
        search: rpn
    }*/
    $.getJSON(randomAPI, displaySearchResults).fail(function() {
        $('main').html('<p>Sorry, resource number ' + rpn + ' in ' + searchResource + ' has no information to display.</p>');
  });
};

// the AJAX keyword part, how many of each resource are in the API
//People, Films, Planets, Species, Vehicles
//Thisfunction is called when the selected resource is changed
let displayCount = () => {
    searchResource = $('select option:selected').val();
    searchResource = searchResource.toLowerCase();
    keywordAPI = "https://swapi.co/api/" + searchResource + "/";
    function   displayKeyword(data) {
        keywordHTML = '<div id="count">';
        keywordHTML += '<span class="keyword">';
        keywordHTML += '<h2>In the Star Wars API there are a total of <span class="resource"> ' + data.count + ' ' + searchResource + '</span> to search!</h2>';
        keywordHTML += '</span>';
        keywordHTML += '</div>';
        $('.resource').html('<img src="/img/ripple.svg" alt="">');
        $('#count_cont').html(keywordHTML);
    }
    $.getJSON(keywordAPI, displayKeyword);
 };


//Functions to call when the 'SEARCH' button is clicked
// the AJAX People part, searches the people API for a character name
let searchPeople = () => {
    peoppleAPI = "https://swapi.co/api/people/";
    swapiOptions = {
        search: keyword
    };
    $.getJSON(peoppleAPI, swapiOptions, displaySearchResults);
};

// the AJAX Planets part, searches the planet API for a planet name
let searchPlanet = () => {
    planetsAPI = "https://swapi.co/api/planets/";
    swapiOptions = {
        search: keyword
    };
    $.getJSON(planetsAPI, swapiOptions, displaySearchResults);
};

// the AJAX Species part, searches the species API for a species type
let searchSpecies = () => {
    speciesAPI = "https://swapi.co/api/species/";
    swapiOptions = {
        search: keyword
    };
    $.getJSON(speciesAPI, swapiOptions, displaySearchResults);        
};

// the AJAX Starships part, searches the starships API for a starships name
let searchStarships = () => {
    starshipsAPI = "https://swapi.co/api/starships/";
    swapiOptions = {
        search: keyword
    };
    $.getJSON(starshipsAPI, swapiOptions, displaySearchResults);        
};

// the AJAX Starships part, searches the starships API for a starships name
let searchVehicles = () => {
    vehiclesAPI = "https://swapi.co/api/vehicles/";
    swapiOptions = {
        search: keyword
    };
    $.getJSON(vehiclesAPI, swapiOptions, displaySearchResults);        
};

// the AJAX films part
let searchFilms = () => {
    filmAPI = "https://swapi.co/api/films/";
    
    $.getJSON(filmAPI, displaySearchFilmResults);
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
            $('#search').val('');
            searchFilms();
            break;    
        default:
            alert("Sorry we can't find what you're searching for.");
    }
};


$('select').change(() => {
    $('#search').val('');
    $('main').html('');
    $('#count_cont').html('<img src="./img/ripple.svg" alt="">');
    setTimeout(function() {
        displayCount();
        $('#search').val('');
        searchResource = $('select option:selected').val();
        if (searchResource === 'Films') {
            $('main').html('');
            searchFilms()
        }
    }, 700);
    console.log(createRandoLetter());
});
$('form').submit((evt) => {
    evt.preventDefault();
    $('.names').html('<img src="./img/ellipsis.svg" alt="">');
    searchResource = $('select option:selected').val();
    console.log(searchResource);
    searchValue();//gets input text    
    searchLooking();//loader
    selectResource(searchResource);
    searchFound();
    $('#search').val('');
});
$('#random').click(() => {
    $('#search').val('');
    $('main').html('');
    $('main').html('<img src="./img/ellipsis.svg" alt="">');
    //Get resource to search
    //searchResource = searchResource.toLowerCase();
    //run function that takes the resource and gets a random number between 1 and however many items are in that resource
    getDataCount(searchResource);
    console.log(randomLetter);
    //searchlooking
    
});


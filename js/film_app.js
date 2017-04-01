//This app displays the character stats for each person in the film
//This gets displayed in the overlay
let showFilmStats = (filmTitle) => {
    $overlay.show(function() {
        $('#data_cont').html('<img src="/img/ripple.svg" alt="">');
    });
    //Show Overlay
    $overlay.show();
    setTimeout(function() {
    let getEpisodeRoman = (episodeID) => {
        switch (episodeID) {
            case 1:
                romanID = 'I';
                filmLogo = '<img src="/img/Logos/Ep_I_1f2afa8a.jpeg" alt="Movie Logo" width="240px">';
                break;
            case 2:
                romanID = 'II';
                filmLogo = '<img src="/img/Logos/Ep_II_1fbf40b5.jpeg" alt="Movie Logo" width="240px">';
                break;
            case 3:
                romanID = 'III';
                filmLogo = '<img src="../img/Logos/Ep_III_ca924a64.jpeg" alt="Movie Logo" width="240px">';
                break;
            case 4:
                romanID = 'IV';
                filmLogo = '<img src="/img/Logos/Ep_IV_ac00c3f3.jpeg" alt="Movie Logo" width="240px">';
                break;
            case 5:
                romanID = 'V';
                filmLogo = '<img src="/img/Logos/Ep_V-4_61ae0512.jpeg" alt="Movie Logo" width="240px">';
                break;
            case 6:
                romanID = 'VI';
                filmLogo = '<img src="/img/Logos/Ep_VI_58826fba.jpeg" alt="Movie Logo" width="240px">';
                break;
            case 7:
                romanID = 'VII';
                filmLogo = '<img src="/img/Logos/ep_vii_logo_a87c8864.png" alt="Movie Logo" width="240px">';
                break;    
            default:
                alert("Sorry we can't find what you're searching for.");
        }
    };
        
        //Make call to film API page
        let filmURL = 'https://swapi.co/api/films/?search=' + filmTitle;
        console.log(filmTitle);
        function displayFilmDetails(data) {
            let results = data.results;
            console.log(results);
            filmHTML = '<p>Film Title: ' + filmTitle + ' </p>';
            filmHTML += '<ul id="data_cont_head">';
            $.each(results, function (i, name) {
                console.log(name.episode_id);
                getEpisodeRoman(name.episode_id);
                
                filmHTML += '<li class="names film_title">';
                filmHTML += filmLogo + '<h2>Star Wars, Episode ' + romanID + ': ' + name.title + '</h2>';
                filmHTML += '<p>Release Date, ' + name.release_date + '.  Directed by ' + name.director  + ' and Produced by ' + name.producer + '.</p>';
                filmHTML += '<div id="opening_crawl"><div id="crawl_content"><p>' + name.opening_crawl + '</p></div></div>';
                filmHTML += '</li>';
                
            }); // end each
            $('#data_cont').html(filmHTML);
            /*$('#opening_crawl p').animate({
                opacity: 0,
                top: "-1200px"
            }, 38000);*/
        }
        $.getJSON(filmURL, displayFilmDetails);
        }, 2000);  
};
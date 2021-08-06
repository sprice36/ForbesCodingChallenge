var apiKey = '4eeb0c9d';
var a = 1;
function apiPull() {
    var movies = 'http://www.omdbapi.com/?i=tt3896198&t=movie&s=fish&page=' + a + '&apikey=' + apiKey;
    $.get(movies, function (data) {
        var keys = Object.values(data);
        console.log(keys)
        var moviesArr = keys[0];
        console.log(moviesArr)
        moviesArr.forEach(function(movie, i) {
       //     console.log(movie);
            var posters = movie['Poster'];
       //     console.log(posters)
            var newImg = $('<img>');
            newImg.attr('src', posters);
            $('[data-target-movies]').append(newImg);
        })
    })


}


apiPull();

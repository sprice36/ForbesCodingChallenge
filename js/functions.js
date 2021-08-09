$(document).ready(function () {

    var apiKey = '4eeb0c9d';
    localStorage.setItem('page', 1);

// Popover for All pages
    $('[data-toggle="popover"]').popover();

    function apiPull() {
        var page = localStorage.getItem('page');
        var movies = 'http://www.omdbapi.com/?i=tt3896198&t=movie&s=fish&page=' + page + '&apikey=' + apiKey;
        ;
        $.get(movies, function (data) {
            var keys = Object.values(data);
            console.log(keys)
            var moviesArr = keys[0];
            var totalResults = keys[1];
            console.log(moviesArr)
            $('[data-total-results]').append(totalResults);
            $('[data-target-page]').append(page);
            moviesArr.forEach(function (movie, i) {
                var posters = movie['Poster'];
                var newImg = $('<img>');
                newImg.attr('src', posters);
                var movieButton = $('<button class="movieButton">').append(newImg);
                movieButton.attr('id', i);
                $('.movie-container').append(movieButton);
                localStorage.setItem(i, movie.Title + ',' + movie.Year + ',' + movie.Poster)
            })
        })
    }

    function nextPage() {
        $('#nextBtn').on('click', function () {
            $('.movie-container').empty();
            var page = localStorage.getItem('page');
            var nextPage = parseInt(page) + 1;
            console.log(nextPage)
            localStorage.setItem('page', nextPage);
            var movies = 'http://www.omdbapi.com/?i=tt3896198&t=movie&s=fish&page=' + nextPage + '&apikey=' + apiKey;
            $.get(movies, function (data) {
                var keys = Object.values(data);
                console.log(keys)
                var moviesArr = keys[0];
                $('[data-target-page]').empty().append(localStorage.getItem('page'));
                console.log(moviesArr)
                moviesArr.forEach(function (movie, i) {
                    var posters = movie['Poster'];
                    var newImg = $('<img>');
                    newImg.attr('src', posters);
                    var movieButton = $('<button class="movieButton">').append(newImg);
                    movieButton.attr('id', i);
                    $('.movie-container').append(movieButton);
                    localStorage.setItem(i, movie.Title + ',' + movie.Year + ',' + movie.Poster)
                })
            })
        })
    }

    $(document).on('click', 'button.movieButton', function (e) {
        e.preventDefault();
        window.moveTo(0,0);
        console.log('movie button clicked')
        var id = this.id;
        $('#movieModal').removeClass('displayNone');
        $('body').addClass('modal-open');
        $('#movieModal').modal(true);
        $('.modal-body').removeClass('displayNone');

        for (var i = 0; i < localStorage.length; i++){
            var key = localStorage.key(i);
            if (key === id){
                var movieInfo = localStorage.getItem(id);
                movieInfo = movieInfo.split(',');
                console.log(movieInfo)
                var newImg = $('<img>');
                newImg.attr('src', movieInfo[2]);
                var movieTitle = movieInfo[0];
                var movieYear = movieInfo[1];
                $('[data-target-movie]').empty();
                $('[data-target-movie]').append(movieTitle + ' - ').append(movieYear);
                $('[data-target-movie]').append(newImg);
            }
        }
    })

    $('#cancel').on('click', function(){
        $('#movieModal').modal(false);
        $('#movieModal').addClass('displayNone');
        $('div').removeClass('modal-backdrop');
          $('body').removeClass('modal-open');
    })


    apiPull();
    nextPage();
})

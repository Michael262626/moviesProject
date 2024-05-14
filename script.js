// https://api.themoviedb.org/3/movie/157336?api_key=6bdcaad70c4a6e93ada54e4b496a6f0d
// https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg

const API_KEY = "api_key=6bdcaad70c4a6e93ada54e4b496a6f0d";
const API_URL = "https://api.themoviedb.org/3/";
const MOVIE_URL = `${API_URL}movie/popular?${API_KEY}`;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500/";
const SEARCH_URL = `${API_URL}/search/movie?${API_KEY}`;

console.log(MOVIE_URL)
const getMovie = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data.results);
            showMovies(data.results);
        })
        .catch(error => console.log(error));
};

getMovie(MOVIE_URL)

const movieContainer = document.querySelector(".movie-container");

const showMovies = (movies) => {
    movieContainer.innerHTML = ' ';
    movies.forEach(movie => {
        const {overview, poster_path, title, vote_average} = movie;

        const divTag = document.createElement("div");
        divTag.classList.add("movie-details");
        divTag.innerHTML = `
            <img src=${IMAGE_URL}${poster_path} alt="movie poster">
                <div class="movie-title">
                    <p style="color: aqua">${title}</p>
                    <p>${vote_average}</p>
                </div>
                <h2>Overview</h2>
                <p style="color: red">${overview}</p>
            `;

        movieContainer.appendChild(divTag);
    });
};
const form = document.querySelector(".search");
const search = document.querySelector("#searchInput")
form.addEventListener("keyup", (e) =>{
    e.preventDefault();
    const searchValue = search.value
    if(searchValue) {
        getMovie(SEARCH_URL + "&query=" + searchValue);
    }else{
        getMovie(MOVIE_URL)
    }
})




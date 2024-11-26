let APIKey = "a1001ef2";
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const getData = async (movie) => {
    try {
        const fetchData = await fetch(`http://www.omdbapi.com/?apikey=${APIKey}&s=${movie}`);
        const jsonData = await fetchData.json();

        // Clear previous results
        const cardContainer = document.querySelector(".card");
        cardContainer.innerHTML = "";

        if (jsonData.Response === "True") {
            jsonData.Search.forEach((movie) => {
                const div = document.createElement("div");
                div.classList.add("movieCard");
                div.innerHTML = `
                    <div class="card">
                        <img src="${movie.Poster}" alt="${movie.Title}">
                        <div class="cardText">
                            <h1>${movie.Title}</h1>
                            <p>Year: <span>${movie.Year}</span></p>
                            <p>Type: <span>${movie.Type}</span></p>
                            <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">View on IMDb</a>
                        </div>
                    </div>`;
                cardContainer.appendChild(div);
            });
        } else {
            cardContainer.innerHTML = `<h1>No movies found for "${movie}"</h1>`;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        document.querySelector(".card").innerHTML = "<h1>Error fetching movie data</h1>";
    }
};

searchBtn.addEventListener("click", function () {
    const movieName = searchInput.value.trim();
    if (movieName !== "") {
        getData(movieName);
    } else {
        document.querySelector(".card").innerHTML = "<h1>Please enter a movie name to search</h1>";
    }
});

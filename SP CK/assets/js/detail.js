const filmId = JSON.parse(localStorage.getItem("filmId"));
const filmType = JSON.parse(localStorage.getItem("filmType"));
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjczZTg0NDk3NDQzODBjY2RkNTBlMGJiOTZlZjZlYyIsInN1YiI6IjY1NzNkZTdmY2FkYjZiMDBjNjhjZDA1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-kb1M5ZtK3AFYRLz2jD_IALZ4lLhfV6hih4qnyN3Ujo",
  },
};

let overviewFilm = document.getElementById("overviewFilm");
let dateFilm = document.getElementById("DateFilm");
let titleFilm = document.getElementById("TitleFilm");
let posterFilm = document.getElementById("pos-film");

fetch(
  `https://api.themoviedb.org/3/${filmType}/${filmId}?language=vi-VN`,
  options
)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    let nameFilm = "";
    let FilmDate = "";

    switch (filmType) {
      case "movie":
        nameFilm = "title";
        FilmDate = "release_date";
        break;
      case "tv":
        nameFilm = "name";
        FilmDate = "last_air_date";
        break;
    }

    titleFilm.textContent = response[nameFilm];
    dateFilm.textContent = response[FilmDate];
    overviewFilm.textContent = response.overview;
    posterFilm.innerHTML = `<img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2${response.poster_path}" alt="Poster">`;
  })
  .catch((err) => console.error(err));

let currentUserHTMl = "";
let currentUsers = JSON.parse(localStorage.getItem("CurrentUsers"));
if (currentUsers) {
  currentUserHTMl += `
    <div class="last-item">
        <div class="nav-bar-box">
            <h2>Hello ${currentUsers.CurrentUser}</h2>
            <div class="movies-lists">
                <a href="" class = "logout-btn">Logout</a>

            </div>
        </div>
    </div>

    `;
  document.getElementsByClassName("right-item")[0].innerHTML = currentUserHTMl;
} else {
  currentUserHTMl += `
  <div class="last-item">
                <div class="logout-btn"></div>
                <div class="nav-bar-box ">
                    <a href="../SP%20CK/login.html"><h2>Login</h2></a>
                    
                    
                </div>
                <div class="nav-bar-box ">
                    <a href="../SP%20CK/register.html"><h2>Register</h2></a>
                    
                </div>
            </div>

    `;
  document.getElementsByClassName("right-item")[0].innerHTML = currentUserHTMl;
}
let logoutBTN = document.querySelector(".logout-btn");
logoutBTN.addEventListener("click", function (e) {
  localStorage.setItem("CurrentUsers", null);
});

let movieLists = document.querySelectorAll(".movies-list a");
console.log(movieLists);
movieLists.forEach(function (item) {
  item.addEventListener("click", function (event) {
    event.preventDefault();
    let currentStatus = item.id;
    let currentType = "";
    switch (currentStatus) {
      case "popular-movie":
        currentStatus = "popular";
        currentType = "movie";
        break;
      case "top-rated-movie":
        currentStatus = "top_rated";
        currentType = "movie";
        break;
      case "popular-tv":
        currentStatus = "popular";
        currentType = "tv";
        break;
      case "airing-tv":
        currentStatus = "airing_today";
        currentType = "tv";
        break;
      case "on-tv":
        currentStatus = "on_the_air";
        currentType = "tv";
        break;
      case "top-rated-tv":
        currentStatus = "top_rated";
        currentType = "tv";
        break;
    }
    localStorage.setItem("currentStatus", currentStatus);
    localStorage.setItem("currentType", currentType);
    window.location.href = "../SP%20CK/home.html";
  });
});
let dvData = "";

fetch(
  `https://api.themoviedb.org/3/${filmType}/${filmId}/credits?language=en-US`,
  options
)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    for (let index in response.cast) {
      if (
        response.cast[index].original_name != null &&
        response.cast[index].character != null &&
        response.cast[index].profile_path != null
      )
        dvData += `<div class="swiper-slide">
        <div class="film-item">
          <img
            src="https://www.themoviedb.org/t/p/w138_and_h175_face/${response.cast[index].profile_path}"
            alt=""
          />
          <h4 id="name-actor">${response.cast[index].original_name}</h4>
          
          <h5 id="name-phu">${response.cast[index].character}</h5>
        </div>
      </div>`;
    }
    document.querySelector(".swiper-wrapper").innerHTML = dvData;

    // const swiper = new Swiper('.swiper-container', {
    //   slidesPerView: 3,
    //   spaceBetween: 30,
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },
    //   pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    //   },
    // });
  })
  .catch((err) => console.error(err));

let playTrailers = document.getElementsByClassName("icon-play-item");
let vidDisplay = document.getElementById("videoDisplay");
Array.from(playTrailers).forEach((playTrailer) => {
  playTrailer.addEventListener("click", function (e) {
    fetch(
      `https://api.themoviedb.org/3/${filmType}/${filmId}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        let saveItem;
        for (let index in response.results) {
          if (
            response.results[index].type == "Trailer"
          ) {
            saveItem = index;
            console.log(saveItem);
            break;
          }
        }
        console.log(response.results[saveItem].key)
        let youtubeIframe = document.getElementById("youtubeIframe");
        youtubeIframe.src = `https://www.youtube.com/embed/${response.results[saveItem].key}`;
        vidDisplay.classList.add("displayVid");
      })
      .catch((err) => console.error(err));
  });
});

let closeBTNvid = document.getElementById("closeBTN");

closeBTNvid.addEventListener("click", function () {
  vidDisplay.classList.remove("displayVid");
});

let closeButtonIcon = document.querySelector(".video-wrapper-first i");
closeButtonIcon.addEventListener("click", function () {
  vidDisplay.classList.remove("displayVid");
});

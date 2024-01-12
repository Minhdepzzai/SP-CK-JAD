const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjczZTg0NDk3NDQzODBjY2RkNTBlMGJiOTZlZjZlYyIsInN1YiI6IjY1NzNkZTdmY2FkYjZiMDBjNjhjZDA1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-kb1M5ZtK3AFYRLz2jD_IALZ4lLhfV6hih4qnyN3Ujo",
  },
};
let prev_btn = document.getElementById("prev-btn");
let firstPage = document.getElementById("first");
let secondPage = document.getElementById("second");
let thirdPage = document.getElementById("third");
let fourPage = document.getElementById("four");
let fivePage = document.getElementById("five");
let next_btn = document.getElementById("next");
let titleFilm = document.querySelector(".title h2");

if (localStorage.getItem("currentStatus") == null) {
  localStorage.setItem("currentStatus", "popular-movie");
}
if (localStorage.getItem("currentType") == null) {
  localStorage.setItem("currentType", "movie");
}
if (localStorage.getItem("currentPage") == null) {
  localStorage.setItem("currentPage", "1");
}


let currentType = localStorage.getItem("currentType");
let currentStatus = localStorage.getItem("currentStatus");
let currentPage = parseInt(localStorage.getItem("currentPage"));



if (currentPage == 1) {
  fourPage.classList.add("displayNone");
  fivePage.classList.add("displayNone");
} else if (currentPage == 2) {
  fourPage.classList.remove("displayNone");
  fivePage.classList.add("displayNone");
} else if (currentPage >= 3) {
  fourPage.classList.remove("displayNone");
  fivePage.classList.remove("displayNone");
}
if (currentPage != 1) {
  prev_btn.classList.remove("displayNone");
} else {
  prev_btn.classList.add("displayNone");
}
if (currentPage == 1) {
  firstPage.classList.remove("nonactive");
  secondPage.classList.add("nonactive");
  thirdPage.classList.add("nonactive");
  firstPage.classList.add("active");
} else if (currentPage == 2) {
  secondPage.classList.remove("nonactive");
  secondPage.classList.add("active");
  firstPage.classList.add("nonactive");
  thirdPage.classList.add("nonactive");
} else if (currentPage >= 3) {
  thirdPage.classList.remove("nonactive");
  thirdPage.innerText = currentPage;
  secondPage.innerText = currentPage - 1;
  firstPage.innerText = currentPage - 2;
  fourPage.innerText = currentPage + 1;
  fivePage.innerText = currentPage + 2;
  secondPage.classList.add("nonactive");
  firstPage.classList.add("nonactive");
  fourPage.classList.add("nonactive");
  fivePage.classList.add("nonactive");
  thirdPage.classList.add("active");
}
currentStatus = localStorage.getItem("currentStatus");
currentType = localStorage.getItem("filmType");
switch (currentType) {
  case '"movie"':
    switch (currentStatus) {
      case "popular-movie":
        titleFilm.innerText = "Popular Movies";

        break;
      case "top-rated-movie":
        titleFilm.innerText = "Top Rated Movies";

        break;
      case "popular-tv":
        titleFilm.innerText = "Popular TV Shows";
        break;
      case "airing-tv":
        titleFilm.innerText = "TV Shows Airing Today";

        break;
      case "on-tv":
        titleFilm.innerText = "Currently Airing TV Shows";

        break;
      case "top-rated-tv":
        titleFilm.innerText = "Top Rated TV Shows";

        break;
    }
}

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

let movieLists = document.querySelectorAll(".movies-list a");

movieLists.forEach(function (item) {
  item.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.setItem("currentStatus", item.id);
    currentStatus = localStorage.getItem("currentStatus");
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

    fetchPage(currentPage, currentStatus, currentType);

    currentStatus = localStorage.getItem("currentStatus");
    currentType = localStorage.getItem("filmType");
    switch (currentType) {
      case '"movie"':
        switch (currentStatus) {
          case "popular-movie":
            titleFilm.innerText = "Popular Movies";

            break;
          case "top-rated-movie":
            titleFilm.innerText = "Top Rated Movies";

            break;
          case "popular-tv":
            titleFilm.innerText = "Popular TV Shows";
            break;
          case "airing-tv":
            titleFilm.innerText = "TV Shows Airing Today";

            break;
          case "on-tv":
            titleFilm.innerText = "Currently Airing TV Shows";

            break;
          case "top-rated-tv":
            titleFilm.innerText = "Top Rated TV Shows";

            break;
        }
    }
  });
});

fetchPage(currentPage, currentStatus, currentType);

let pageBTN = document.getElementsByClassName("page-btn");
let saveBTNPrev;

function btnCLick() {
  Array.from(pageBTN).forEach(function (item, index) {
    item.addEventListener("click", function (event) {
      let saveIDPage = item.id;
      let saveTextPage = event.target.innerText;
      localStorage.setItem("currentPage", parseInt(saveTextPage));
      pageButtonClicked(event);
    });
  });
}

function pageButtonClicked(event) {
  event.preventDefault();
  let buttonValue = parseInt(localStorage.getItem("currentPage"));

  if (buttonValue == 1) {
    fourPage.classList.add("displayNone");
    fivePage.classList.add("displayNone");
  } else if (buttonValue == 2) {
    fourPage.classList.remove("displayNone");
    fivePage.classList.add("displayNone");
  } else if (buttonValue >= 3) {
    fourPage.classList.remove("displayNone");
    fivePage.classList.remove("displayNone");
  }

  if (buttonValue != 1) {
    prev_btn.classList.remove("displayNone");
  } else {
    prev_btn.classList.add("displayNone");
  }

  if (buttonValue == 1) {
    firstPage.classList.remove("nonactive");
    secondPage.classList.add("nonactive");
    thirdPage.classList.add("nonactive");
    firstPage.classList.add("active");
  } else if (buttonValue == 2) {
    secondPage.classList.remove("nonactive");
    secondPage.classList.add("active");
    firstPage.classList.add("nonactive");
    thirdPage.classList.add("nonactive");
  } else if (buttonValue >= 3) {
    thirdPage.classList.remove("nonactive");
    thirdPage.innerText = buttonValue;
    secondPage.innerText = buttonValue - 1;
    firstPage.innerText = buttonValue - 2;
    fourPage.innerText = buttonValue + 1;
    fivePage.innerText = buttonValue + 2;
    secondPage.classList.add("nonactive");
    firstPage.classList.add("nonactive");
    fourPage.classList.add("nonactive");
    fivePage.classList.add("nonactive");
    thirdPage.classList.add("active");
  }

  fetchPage(buttonValue, currentStatus, currentType);
}

btnCLick();
fetchPage(currentPage, currentStatus, currentType);

function fetchPage(page, list, type) {
  fetch(
    `https://api.themoviedb.org/3/${type}/${list}?language=vi-VN&page=${page}&region=VNM`,
    options
  )
    .then((response) => response.json())

    .then((response) => {
      let productData = "";
      if (type == "movie") {
        for (let index in response.results) {
          if(response.results[index].poster_path != null && response.results[index].title != null && response.results[index].release_date){
          productData += `
          <a href="../SP%20CK/detail.html" class="film-click">
          <div class="film-item">
              <img id="poster" src="http://image.tmdb.org/t/p/w220_and_h330_face${response.results[index].poster_path}" alt="" />
              
              <h4 id="name-film">${response.results[index].title}</h4>
              <h5 id="date-film">${response.results[index].release_date}</h5>
            </div>
        </a>`;
          }
        }
      } else {
        for (let index in response.results) {
          if(response.results[index].poster_path != null && response.results[index].name != null && response.results[index].first_air_date != null){
          productData += `
          <a href="../SP%20CK/detail.html" class="film-click">
        <div class="film-item">
            <img id="poster" src="http://image.tmdb.org/t/p/w220_and_h330_face${response.results[index].poster_path}" alt="" />
            <h4 id="name-film">${response.results[index].name}</h4>
            <h5 id="date-film">${response.results[index].first_air_date}</h5>
          </div>
        </a>`;
          }
        }
      }
      const films = document.getElementsByClassName("film-click");

      document.getElementsByClassName("container")[0].innerHTML = productData;

      Array.from(films).forEach((item, index) => {
        item.onclick = function (e) {
          localStorage.setItem(
            "filmId",
            JSON.stringify(response.results[index].id)
          );
          localStorage.setItem("filmType", JSON.stringify(type));
        };
      });
    })
    .catch((err) => console.error(err));
}

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
  <div class = "logout-btn"></div>
  <div class="last-item">
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

document.querySelector(".example").addEventListener("submit", function (e) {
  e.preventDefault();
  const inputSearch = document.querySelector(".input-search").value;

  if (inputSearch.trim() !== "") {
    fetchSearchResults(inputSearch);
  }
});

function fetchSearchResults(query) {
  fetch(
    `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=vi-VN&page=1&region=VNM`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      changeSearchResults(response);
    })
    .catch((err) => console.error(err));
}

function changeSearchResults(response) {
  let productData = "";

  if (response.results && response.results.length > 0) {
    for (let index in response.results) {
      const item = response.results[index];
      let title, releaseDate;

      if (item.media_type == "movie") {
        title = item.title;
        releaseDate = item.release_date;
      } else if (item.media_type =="tv") {
        title = item.name;
        releaseDate = item.first_air_date;
      }
      if(item.poster_path != null && title != null && releaseDate != null)
      productData += `
        <a href="../SP%20CK/detail.html" class="film-click">
          <div class="film-item">
            <img id="poster" src="http://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}" alt="" />
            <h4 id="name-film">${title}</h4>
            <h5 id="date-film">${releaseDate}</h5>
          </div>
        </a>`;
    }

    const films = document.getElementsByClassName("film-click");

    document.querySelector(".container").innerHTML = productData;

    Array.from(films).forEach((item, index) => {
      item.onclick = function (e) {
        localStorage.setItem(
          "filmId",
          JSON.stringify(response.results[index].id)
        );

        if (response.results[index].media_type == "movie") {
          localStorage.setItem("filmType", JSON.stringify("movie"));
        } else {
          localStorage.setItem("filmType", JSON.stringify("tv"));
        }
        
      };
    });
  } else {
    productData = "<p>No results found</p>";
    document.querySelector(".container").innerHTML = productData;
  }
}

prev_btn.addEventListener("click", function (event) {
  event.preventDefault();
  let currentPage = parseInt(localStorage.getItem("currentPage"));
  if (currentPage > 1) {
    localStorage.setItem("currentPage", currentPage - 1);
    pageButtonClicked(event);
  }
});

next_btn.addEventListener("click", function (event) {
  event.preventDefault();
  let currentPage = parseInt(localStorage.getItem("currentPage"));
  localStorage.setItem("currentPage", currentPage + 1);
  pageButtonClicked(event);
});
let reloadPageImg = document.getElementsByClassName("click-img")[0];

reloadPageImg.addEventListener("click", function(){
  localStorage.clear();
});

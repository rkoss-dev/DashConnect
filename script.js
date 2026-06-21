const dogButton = document.getElementById("dog-button");
const dogOutput = document.getElementById("dog-output");

const catButton = document.getElementById("cat-button");
const catOutput = document.getElementById("cat-output");

const weatherButton = document.getElementById("weather-button");
const weatherOutput = document.getElementById("weather-output");

const currencyButton = document.getElementById("currency-button");
const currencyOutput = document.getElementById("currency-output");

const moviesButton = document.getElementById("movies-button");
const moviesOutput = document.getElementById("movies-output");

const githubButton = document.getElementById("github-button");
const githubOutput = document.getElementById("github-output");
const userField = document.getElementById("username");

const jokeButton = document.getElementById("joke-button");
const jokeOutput = document.getElementById("joke-output");

const apodButton = document.getElementById("apod-button");
const apodOutput = document.getElementById("apod-output");

async function getDogImage() {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const data = await response.json();

  dogOutput.innerHTML = "";

  const dogImg = document.createElement("img");
  dogImg.src = data.message;

  dogOutput.appendChild(dogImg);
}

async function getCatImage() {
  const response = await fetch("https://api.thecatapi.com/v1/images/search");
  const data = await response.json();

  catOutput.innerHTML = "";

  const catImg = document.createElement("img");
  catImg.src = data[0].url;

  catOutput.appendChild(catImg);
}

async function getWeather() {
  const response = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=39.9098&longitude=-87.8211&models=gfs_seamless&current=temperature_2m&timezone=America%2FChicago&temperature_unit=fahrenheit",
  );
  const data = await response.json();
  const temp = data.current.temperature_2m;
  weatherOutput.innerHTML = "";
  weatherOutput.innerText = `The current temperature in Sidell is ${temp} degrees.`;
}

async function convertCurrency() {
  const response = await fetch(
    "https://v6.exchangerate-api.com/v6/8a692567395713b168871622/latest/USD",
  );
  const data = await response.json();
  const rate = data.conversion_rates.EUR;
  currencyOutput.innerHTML = "";
  currencyOutput.innerText = `The current exchange rate from USD to EUR is ${rate}`;
}

async function tellJoke() {
  const response = await fetch(
    "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit",
  );
  const data = await response.json();
  const setup = data.setup;
  const punch = data.delivery;
  const joke = data.joke;
  console.log(data);
  console.log(setup);
  console.log(punch);
  console.log(joke);
  jokeOutput.innerHTML = "";

  if (joke === undefined) {
    jokeOutput.innerText = `${setup} \n` + `\n ${punch}`;
  } else {
    jokeOutput.innerText = `${joke}`;
  }
}

async function getMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjkwY2M5Yzg0ZmM4YjdjYjgxODQwMDY5MDE1M2Q0NyIsIm5iZiI6MTc4MTk5MjE4OC4zMTYsInN1YiI6IjZhMzcwYWZjNjA5NmUyYzdkNWNlZDM3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aMHyK76iVhhT2IrHXb2tHVAYgmKz25m_ER6pOiQp6bQ",
    },
  };
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/2062/images",
    options,
  );
  const data = await response.json();
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const numberOfImages = data.backdrops.length;
  const randomImageIndex = Math.floor(Math.random() * numberOfImages);
  const randomImageFilePath = data.backdrops[randomImageIndex].file_path;

  moviesOutput.innerHTML = "";

  const randomImage = document.createElement("img");
  randomImage.src = `${imageBaseUrl}${randomImageFilePath}`;

  moviesOutput.appendChild(randomImage);
}

async function getAPOD() {
  const response = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=QGg4RPkPGqiiyRVW0i03xThUd0fSmydFAheTWkci",
  );
  const data = await response.json();

  apodOutput.innerHTML = "";

  const apodImg = document.createElement("img");
  apodImg.src = data.url;

  apodOutput.appendChild(apodImg);
}

async function getUser(userInput) {
  const baseQueryURL = "https://api.github.com/search/users?q=";
  const queryInfo = userInput;
  const response = await fetch(`${baseQueryURL}${queryInfo}`);
  const data = await response.json();

  console.log(data);
  console.log(data.items);
  console.log(data.items[0]);
  console.log(data.items[0].login);
  console.log(data.items[0].html_url);
  console.log(data.items[0].avatar_url);

  const topUsername = data.items[0].login;
  const topURL = data.items[0].html_url;
  const topAvatar = data.items[0].avatar_url;

  githubOutput.innerHTML = "";

  githubOutput.innerText = `Most Relevant Username: ${topUsername}`;
  const avatarImage = document.createElement("img");
  avatarImage.src = `${topAvatar}`;

  githubOutput.appendChild(avatarImage);

  const userLink = document.createElement("a");
  userLink.textContent = "Visit User Profile";
  userLink.href = topURL;
  userLink.target = "_blank";
  githubOutput.appendChild(userLink);
}

dogButton.addEventListener("click", getDogImage);
catButton.addEventListener("click", getCatImage);
weatherButton.addEventListener("click", getWeather);
currencyButton.addEventListener("click", convertCurrency);
jokeButton.addEventListener("click", tellJoke);
moviesButton.addEventListener("click", getMovies);
apodButton.addEventListener("click", getAPOD);
githubButton.addEventListener("click", () => {
  const userInput = userField.value;
  getUser(userInput);
});

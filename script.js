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

const jokeButton = document.getElementById("joke-button");
const jokeOutput = document.getElementById("joke-output");

const pubButton = document.getElementById("pub-button");
const pubOutput = document.getElementById("pub-output");

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

dogButton.addEventListener("click", getDogImage);
catButton.addEventListener("click", getCatImage);
weatherButton.addEventListener("click", getWeather);
currencyButton.addEventListener("click", convertCurrency);
jokeButton.addEventListener("click", tellJoke);

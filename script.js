// DOM Elements

const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherIcon = document.getElementById("weatherIcon");
const uvIndex = document.getElementById("uvIndex");

const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");

const forecastContainer = document.getElementById("forecastContainer");

// Weather COde Mapping
// Convert WMO weather code to icon and description

function getWeatherDescription(code) {
    const weatherCodes = {
        0: { icon: "☀️", description: "Clear Sky" },

        1: { icon: "⛅", description: "Partly Cloudy" },
        2: { icon: "⛅", description: "Partly Cloudy" },
        3: { icon: "⛅", description: "Partly Cloudy" },

        45: { icon: "🌫️", description: "Foggy" },
        48: { icon: "🌫️", description: "Foggy" },

        51: { icon: "🌦️", description: "Drizzle" },
        53: { icon: "🌦️", description: "Drizzle" },
        55: { icon: "🌦️", description: "Drizzle" },

        61: { icon: "🌧️", description: "Rain" },
        63: { icon: "🌧️", description: "Rain" },
        65: { icon: "🌧️", description: "Rain" },

        71: { icon: "❄️", description: "Snow" },
        73: { icon: "❄️", description: "Snow" },
        75: { icon: "❄️", description: "Snow" },

        80: { icon: "🌦️", description: "Rain Showers" },
        81: { icon: "🌦️", description: "Rain Showers" },
        82: { icon: "🌦️", description: "Rain Showers" },

        95: { icon: "⛈️", description: "Thunderstorm" },
        96: { icon: "⛈️", description: "Thunderstorm" },
        99: { icon: "⛈️", description: "Thunderstorm" },
    };

    return (
        weatherCodes[code] || {
            icon: "❓",
            description: "Unknown",
        }
    );
}

// Get City COordinates
// Fetch latitude and longitude from city name

async function getCoordinates(city) {
    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`,
    );

    const data = await response.json();

    if (!data.results) {
        throw new Error("City not found");
    }

    return data.results[0];
}

// Get Weather Data

// Fetch weather using coordinates

async function getWeather(latitude, longitude) {
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,uv_index&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`,
    );

    return await response.json();
}

// Display Current Weather

// Update hero section

function displayCurrentWeather(weatherData, city, country) {
    const weather = getWeatherDescription(weatherData.current.weather_code);

    cityName.textContent = `${city}, ${country}`;

    temperature.textContent = `${Math.round(weatherData.current.temperature_2m)}°C`;

    description.textContent = weather.description;

    humidity.textContent = `${weatherData.current.relative_humidity_2m}%`;

    windSpeed.textContent = `${Math.round(weatherData.current.wind_speed_10m)} km/h`;

    uvIndex.textContent = `${Math.round(weatherData.current.uv_index)}`;

    weatherIcon.textContent = weather.icon;
}

// Display FOrecast

// Render 5-day forecast

function displayForecast(daily) {
    forecastContainer.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        const dayName = new Date(daily.time[i]).toLocaleDateString("en-US", {
            weekday: "long",
        });

        const weather = getWeatherDescription(daily.weather_code[i]);

        const forecastCard = `
      <div class="forecast-card">
        <p class="day-name">${dayName}</p>

        <p class="forecast-icon">${weather.icon}</p>

        <div class="forecast-temperature">
          <p>${Math.round(daily.temperature_2m_max[i])}°</p>

          <p>${Math.round(daily.temperature_2m_min[i])}°</p>
        </div>
      </div>
    `;

        forecastContainer.innerHTML += forecastCard;
    }
}

// Error Handling
// Show error message

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
}

// Hide error message

function hideError() {
    errorMessage.style.display = "none";
}

// Show loading message

function showLoading() {
    loadingMessage.textContent = "Loading...";
    loadingMessage.style.display = "block";
}

// Hide loading message

function hideLoading() {
    loadingMessage.style.display = "none";
}

// Main Search Function
// Called when Search button is clicked

async function handleSearch() {
    const city = cityInput.value.trim();

    if (!city) {
        showError("Please enter a city name");
        return;
    }

    try {
        hideError();
        showLoading();

        const location = await getCoordinates(city);

        const weatherData = await getWeather(location.latitude, location.longitude);

        displayCurrentWeather(weatherData, location.name, location.country);

        displayForecast(weatherData.daily);
    } catch (error) {
        showError("City not found. Please try again.");
        console.error("Search error:", error);
    } finally {
        hideLoading();
    }
}

// Event Listeners

searchButton.addEventListener("click", handleSearch);

cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        handleSearch();
    }
});

// Load default city on page load

window.addEventListener("load", async function () {
    cityInput.value = "Lagos";
    await handleSearch();
});
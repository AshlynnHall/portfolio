// Weather configuration
const latitude = 30.0799;  // Spring, TX
const longitude = -95.4171;
const units = "imperial";
const key = "3d23aa6c5383ef16e852f3466e80c738";

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${key}`;

async function weatherApiFetch() {
    try {
        let response = await fetch(currentUrl);

        if (response.ok) {
            let data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
        renderError();
    }
}

function capitalize(str) {
    let words = str.split(" ");
    let capitalizedWord = "";

    words.forEach((word) => {
        capitalizedWord = `${capitalizedWord} ${word[0].toUpperCase()}${word.substring(1)}`;
    });

    return capitalizedWord.trimStart();
}

function getWeatherIcon(iconId) {
    return `https://openweathermap.org/img/wn/${iconId}@2x.png`;
}

function buildWeatherRow(object) {
    let weatherDesc = document.querySelector("#weather-desc");
    let container = document.createElement("div");
    container.classList.add("weather-desc-item");

    let img = document.createElement("img");
    img.setAttribute("src", getWeatherIcon(object.icon));
    img.setAttribute("alt", "weather icon");
    img.setAttribute("height", "32");
    img.setAttribute("width", "32");

    let span = document.createElement("span");
    span.textContent = capitalize(object.description);

    container.appendChild(img);
    container.appendChild(span);
    weatherDesc.appendChild(container);
}

function displayResults(data) {
    // Show content directly
    const content = document.querySelector(".weather-content");
    if (content) content.style.display = "block";

    document.querySelector("#alert-temp").textContent = data.main.temp_max.toFixed(0);
    document.querySelector("#humidity").textContent = data.main.humidity;
    document.querySelector("#temperature").textContent = data.main.temp.toFixed(0);

    data.weather.forEach(buildWeatherRow);
}

function renderError() {
    const weatherContainer = document.getElementById('weather-widget');
    if (!weatherContainer) return;

    weatherContainer.innerHTML = `
        <div class="weather-error">
            <h3>Weather Unavailable</h3>
            <p>Unable to load weather data at this time.</p>
        </div>
    `;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    weatherApiFetch();
});

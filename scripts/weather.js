// Weather configuration
const latitude = 30.0799;  // Spring, TX
const longitude = -95.4171;
const units = "imperial";
const key = "3d23aa6c5383ef16e852f3466e80c738";

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${key}`;

async function weatherApiFetch() {
    showLoadingState();
    
    try {
        let response = await fetch(currentUrl);

        if (response.ok) {
            let data = await response.json();
            displayResults(data);
        } else {
            throw new Error(`Weather API error: ${response.status}`);
        }
    } catch (error) {
        console.log('Weather fetch failed:', error);
        showErrorState();
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
    try {
        let weatherDesc = document.querySelector("#weather-desc");
        if (!weatherDesc) return;

        let container = document.createElement("div");
        container.classList.add("weather-desc-item");

        let img = document.createElement("img");
        img.setAttribute("src", getWeatherIcon(object.icon));
        img.setAttribute("alt", "weather icon");
        img.setAttribute("height", "32");
        img.setAttribute("width", "32");
        
        img.onerror = function() {
            this.style.display = 'none';
        };

        let span = document.createElement("span");
        span.textContent = capitalize(object.description || 'Weather info');

        container.appendChild(img);
        container.appendChild(span);
        weatherDesc.appendChild(container);
    } catch (error) {
        console.log('Error building weather row:', error);
    }
}

function displayResults(data) {
    try {
        hideLoadingState();
        hideErrorState();
        
        const content = document.querySelector(".weather-content");
        if (content) content.style.display = "block";

        const tempMax = document.querySelector("#alert-temp");
        const humidity = document.querySelector("#humidity");
        const temperature = document.querySelector("#temperature");

        if (tempMax) tempMax.textContent = data.main?.temp_max?.toFixed(0) || '--';
        if (humidity) humidity.textContent = data.main?.humidity || '--';
        if (temperature) temperature.textContent = data.main?.temp?.toFixed(0) || '--';

        const weatherDesc = document.querySelector("#weather-desc");
        if (weatherDesc) weatherDesc.innerHTML = '';

        if (data.weather && data.weather.length > 0) {
            data.weather.forEach(buildWeatherRow);
        }
    } catch (error) {
        console.log('Error displaying weather:', error);
        showErrorState();
    }
}

function showLoadingState() {
    const loading = document.querySelector(".weather-loading");
    const content = document.querySelector(".weather-content");
    const error = document.querySelector(".weather-error");
    
    if (loading) loading.style.display = "block";
    if (content) content.style.display = "none";
    if (error) error.style.display = "none";
}

function hideLoadingState() {
    const loading = document.querySelector(".weather-loading");
    if (loading) loading.style.display = "none";
}

function showErrorState() {
    hideLoadingState();
    
    const content = document.querySelector(".weather-content");
    const error = document.querySelector(".weather-error");
    
    if (content) content.style.display = "none";
    if (error) error.style.display = "block";
    
    const retryBtn = document.querySelector(".retry-btn");
    if (retryBtn) {
        retryBtn.onclick = () => {
            weatherApiFetch();
        };
    }
}

function hideErrorState() {
    const error = document.querySelector(".weather-error");
    if (error) error.style.display = "none";
}

document.addEventListener('DOMContentLoaded', () => {
    weatherApiFetch();
});

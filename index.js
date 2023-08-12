const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const searchInput = document.querySelector('.search-box input');

search.addEventListener('click', searchWeather);
searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchWeather();
    }
});

function searchWeather() {
    const APIKey = 'Sua API Aqui';
    const city = searchInput.value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    document.body.className = 'clear';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    document.body.className = 'rain';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    document.body.className = 'snow';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    document.body.className = 'clouds';
                    break;
                case 'Haze':
                    image.src = 'images/mist.png';
                    document.body.className = 'haze';
                    break;
                default:
                    image.src = '';
                    document.body.className = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        })
}

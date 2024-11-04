
document.addEventListener('DOMContentLoaded', function() {
    const inputBox = document.querySelector('.input-box');
    const searchBtn = document.getElementById('searchBtn');
    const weather_img = document.querySelector('.Weather-img');
    const temperature = document.querySelector('.temperature');
    const description = document.querySelector('.description');
    const humidity = document.getElementById('humidity');
    const wind_speed = document.getElementById('Wind-speed');
  
    async function checkWeather(city) {
        const api_key = "e9b8beeaba42cd6cb2bd4a9c71158a72";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const weather_data = await response.json();
  
            temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)} °C`;
            description.innerHTML = `${weather_data.weather[0].description}`;
            humidity.innerHTML = `${weather_data.main.humidity}%`;
            wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;
  
            switch (weather_data.weather[0].main) {
                case 'Clouds':
                    weather_img.src = "images/rainCloud.png";
                    break;
                case 'Clear':
                case 'Haze':
                    weather_img.src = "images/sun.png";
                    break;
                case 'Rain':
                    weather_img.src = "images/rain.png";
                    break;
                case 'Mist':
                case 'Smoke':
                    weather_img.src = "images/mist.png";
                    break;
                case 'Snow':
                    weather_img.src = "images/snow.png";
                    break;
                default:
                    weather_img.src = "images/default.png";
            }
        } catch (error) {
            console.error(error);
            weather_img.src = "images/error.png";
            temperature.innerHTML = "";
            description.innerHTML = "Sorry, location is not available";
            humidity.innerHTML = "";
            wind_speed.innerHTML = "";
        }
    }
  
    searchBtn.addEventListener('click', () => {
        checkWeather(inputBox.value);
    });
  
    inputBox.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            checkWeather(inputBox.value);
        }
    });
  });
  
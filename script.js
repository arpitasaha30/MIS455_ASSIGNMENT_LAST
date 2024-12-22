document.getElementById('searchButton').addEventListener('click', async () => {
  const countryName = document.getElementById('countrySearch').value.trim();
  if (!countryName) {
      alert('Please enter a country name');
      return;
  }

  const resultsContainer = document.getElementById('countryResults');
  resultsContainer.innerHTML = '';

  try {
      const countryResponse = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
      if (!countryResponse.ok) throw new Error('Country not found');

      const countries = await countryResponse.json();
      countries.forEach(async (country) => {
          const countryCard = document.createElement('div');
          countryCard.className = 'country-card col-md-4';

          countryCard.innerHTML = `
              <img src="${country.flags.svg}" alt="${country.name.common} flag">
              <div class="card-body">
                  <h5>${country.name.common}</h5>
                  <p>Population: ${country.population.toLocaleString()}</p>
                  <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
                  <button class="btn btn-info weather-button" data-country="${country.name.common}">More Details</button>
              </div>
          `;

          resultsContainer.appendChild(countryCard);
      });
  } catch (error) {
      alert('Error fetching country data. Please try again.');
  }
});

document.getElementById('countryResults').addEventListener('click', async (event) => {
  if (!event.target.classList.contains('weather-button')) return;

  const countryName = event.target.getAttribute('data-country');

  try {
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=YOUR_API_KEY&units=metric`);
      if (!weatherResponse.ok) throw new Error('Weather data not found');

      const weatherData = await weatherResponse.json();
      const weatherInfo = `
          Weather in ${weatherData.name}:
          - Temperature: ${weatherData.main.temp}°C
          - Feels Like: ${weatherData.main.feels_like}°C
          - Weather: ${weatherData.weather[0].description}
          - Humidity: ${weatherData.main.humidity}%
      `;

      alert(weatherInfo);
  } catch (error) {
      alert('Error fetching weather data. Please try again.');
  }
});

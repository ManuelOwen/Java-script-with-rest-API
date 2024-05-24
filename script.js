
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const searchInput = document.getElementById('search');
    const regionFilter = document.getElementById('region-filter');
    const countriesContainer = document.getElementById('countries-container');
  
    let countriesData = [];
  
    // Load the user's theme preference from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    document.body.className = savedTheme;
  
    themeSwitcher.addEventListener('click', () => {
      // Toggle the theme
      const currentTheme = document.body.className;
      const newTheme = currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
  
      // Apply the new theme and save it to localStorage
      document.body.className = newTheme;
      localStorage.setItem('theme', newTheme);
    });
    //search input
  
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      displayCountries(countriesData.filter(country => country.name.toLowerCase().includes(searchTerm)));
    });
    // for region filter
  
    regionFilter.addEventListener('change', (e) => {
      const region = e.target.value;
      displayCountries(region === 'all' ? countriesData : countriesData.filter(country => country.region === region));
    });
  // fetching data from the api
    const fetchCountries = async () => {
      try {
        const res = await fetch('https://restcountries.com/v2/all');
        countriesData = await res.json();
        displayCountries(countriesData);
      } catch (err) {
        console.error(err);
      }
    };
    //display  countries
  
    const displayCountries = (countries) => {
      countriesContainer.innerHTML = '';
      countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.className = 'country-card';
        countryCard.innerHTML = `
          <img src="${country.flag}" alt="${country.name}">
          <h2>${country.name}</h2>
          <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> ${country.region}</p>
          <p><strong>Capital:</strong> ${country.capital}</p>
        `;
        countryCard.addEventListener('click', () => {
          window.location.href = `detail.html?name=${country.name}`;
        });
        countriesContainer.appendChild(countryCard);
      });
    };
  
    fetchCountries();
  });
  
  
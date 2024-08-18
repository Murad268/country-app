async function searchCountry(query) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; 

  if (query.trim() === '') {
    resultsContainer.innerHTML = '<p>Please enter a country name.</p>';
    return;
  }

  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${query}`);
    if (!response.ok) {
      throw new Error('Country not found');
    }
    const countries = await response.json();
    countries.forEach(country => {
      const countryDiv = document.createElement('div');
      countryDiv.classList.add('country');
      countryDiv.onclick = () => {
        window.location.href = `country.html?name=${encodeURIComponent(country.name.common)}`;
      };
      countryDiv.innerHTML = `
        <h2>${country.name.common}</h2>
        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" />
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      `;
      resultsContainer.appendChild(countryDiv);
    });
  } catch (error) {
    resultsContainer.innerHTML = `<p>${error.message}</p>`;
  }
}


document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const query = document.getElementById('searchInput').value;
  searchCountry(query); 
});

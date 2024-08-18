async function getCountryDetails() {
  const params = new URLSearchParams(window.location.search);
  const countryName = params.get('name');

  if (!countryName) {
    document.getElementById('countryDetails').innerHTML = '<p>No country selected.</p>';
    return;
  }

  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    if (!response.ok) {
      throw new Error('Country not found');
    }
    const countries = await response.json();
    const country = countries[0]; 
    const detailsContainer = document.getElementById('countryDetails');
    detailsContainer.innerHTML = `
      <h1>${country.name.common}</h1>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" />
      <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Subregion:</strong> ${country.subregion}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Area:</strong> ${country.area ? country.area.toLocaleString() + ' km²' : 'N/A'}</p>
      <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
      <p><strong>Currencies:</strong> ${Object.values(country.currencies).map(currency => currency.name).join(', ')}</p>
    `;
  } catch (error) {
    document.getElementById('countryDetails').innerHTML = `<p>${error.message}</p>`;
  }
}


getCountryDetails();

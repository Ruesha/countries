fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    let countries = data; 
    renderCountries(countries); 

    const search = document.querySelector("[data-search]");
    const regionFilter = document.getElementById("filter");

    const filterCountries = () => {
      const searchValue = search.value.toLowerCase();
      const selectedRegion = regionFilter.value;

      const filteredCountries = countries.filter(country => {
        const matchesSearch = country.name.toLowerCase().includes(searchValue);
        const matchesRegion = selectedRegion ? country.region === selectedRegion : true;
        return matchesSearch && matchesRegion;
      });

      renderCountries(filteredCountries); 
    };

    search.addEventListener("input", filterCountries);
    regionFilter.addEventListener("change", filterCountries);
  })
  .catch((error) => console.log('An error occurred', error));


function renderCountries(countries) {
  const flagsContainer = document.querySelector('.body'); 
  flagsContainer.innerHTML = '';
  countries.forEach((country) => {
    flagsContainer.innerHTML += `
      <div class="flag">
        <img src="${country.flags.svg}" alt="" width="150">
        <span class="name">${country.name}</span>
        <span class="popu">Population: ${country.population}</span>
        <span class="reg">Region: ${country.region}</span>
        <span class="cap">Capital: ${country.capital}</span>
      </div>
    `;
  });
}

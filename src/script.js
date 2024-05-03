const searchInput = document.getElementById('searchInput');
const recommendations = document.querySelector('.recomendations');

let data = {};
fetch('../resources/travel_recommendation_api.json')
  .then((response) => response.json())
  .then((json) => (data = json));

function resetSearch() {
  searchInput.value = '';
  recommendations.innerHTML = '';
}

function search() {
  const userEntry = searchInput.value.toLowerCase();
  const places = [];
  places.push(...searchByKeyword(userEntry));
  places.push(...searchByCity(userEntry));
  showRecommendations(places);
}

function showRecommendations(places) {
  recommendations.innerHTML = '';
  places.forEach((place) => {
    const card = `
    <div class="recommendation-card">
    <img src="resources/${place.imageUrl}" alt="">
    <h1>${place.name}</h1>
    <p>${place.description}</p>
    <button>Visit</button>
    </div>
    `;
    recommendations.innerHTML += card;
  });
}

function searchByKeyword(userEntry) {
  if ('country'.includes(userEntry) || 'countries'.includes(userEntry)) {
    const cities = [];
    data['countries'].forEach((country) => cities.push(...country.cities));
    return cities;
  } else if ('beaches'.includes(userEntry)) {
    return data['beaches'];
  } else if ('temples'.includes(userEntry)) return data['temples'];
  return [];
}

function searchByCity(userEntry) {
  for (const country of data.countries) {
    if (country.name.toLowerCase().includes(userEntry)) return country.cities;
  }
  return [];
}

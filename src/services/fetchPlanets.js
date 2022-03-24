const fetchPlanets = async () => {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  return fetch(url)
    .then((promise) => promise.json())
    .then((response) => response.results)
    .catch((error) => console.log(error));
};

export default fetchPlanets;

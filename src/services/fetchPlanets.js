const fetchPlanets = () => {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export default fetchPlanets;

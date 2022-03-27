import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchPlanets from '../services/fetchPlanets';
import MyContext from './myContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterInput, setFilterInput] = useState({
    filterByName: '',
    filterByNumericValues: {
      column: 'population',
      operator: 'maior que',
      value: 0,
    },
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetchPlanets();
      setPlanets(response);
      setFilteredPlanets(response);
    }

    fetchData();
  }, []);

  const onInputChange = ({ target: { id, value } }) => {
    if (id === 'filterByName') {
      setFilterInput((prevState) => ({ ...prevState, [id]: value }));
    } else {
      setFilterInput((prevState) => ({
        ...prevState,
        filterByNumericValues: {
          ...prevState.filterByNumericValues,
          [id]: value,
        },
      }));
    }
  };

  const applyFilter = () => {
    const { column, operator, value } = filterInput.filterByNumericValues;
    let newPlanets = [];
    const numValue = Number(value);
    switch (operator) {
    case 'maior que':
      newPlanets = planets.filter((planet) => Number(planet[column]) > numValue);
      setFilteredPlanets(newPlanets);
      break;
    case 'menor que':
      newPlanets = planets.filter((planet) => Number(planet[column]) < numValue);
      setFilteredPlanets(newPlanets);
      break;
    case 'igual a':
      newPlanets = planets.filter((planet) => Number(planet[column]) === numValue);
      setFilteredPlanets(newPlanets);
      break;
    default:
      return planets;
    }
  };

  const contextValue = {
    onInputChange,
    applyFilter,
    planets,
    setPlanets,
    filterInput,
    setFilterInput,
    filteredPlanets,
    setFilteredPlanets,
  };

  return (
    <MyContext.Provider value={ contextValue }>{children}</MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Provider;

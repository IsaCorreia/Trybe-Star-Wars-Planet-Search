import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchPlanets from '../services/fetchPlanets';
import MyContext from './myContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [savedFilters, setSavedFilters] = useState([]);
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

  const runNumFilter = ({ column, operator, value }, filteredPlanets) => {
    const numValue = Number(value);

    switch (operator) {
    case 'maior que':
      return filteredPlanets.filter((planet) => Number(planet[column]) > numValue);
    case 'menor que':
      return filteredPlanets.filter((planet) => Number(planet[column]) < numValue);
    case 'igual a':
      return filteredPlanets.filter((planet) => Number(planet[column]) === numValue);
    default:
      return filteredPlanets;
    }
  };

  const applyNumFilter = (planetsToFilter) => {
    let filteredPlanets = planetsToFilter;
    savedFilters.forEach((filter) => {
      filteredPlanets = runNumFilter(filter, filteredPlanets);
    });
    return filteredPlanets;
  };

  const contextValue = {
    onInputChange,
    planets,
    setPlanets,
    filterInput,
    setFilterInput,
    savedFilters,
    setSavedFilters,
    applyNumFilter,
  };

  return (
    <MyContext.Provider value={ contextValue }>{children}</MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Provider;

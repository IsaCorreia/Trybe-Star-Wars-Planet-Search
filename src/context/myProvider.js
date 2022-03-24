import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchPlanets from '../services/fetchPlanets';
import MyContext from './myContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterInput, setFilterInput] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetchPlanets();
      setPlanets(response);
    }

    fetchData();
  }, []);

  const onInputChange = ({ target }) => {
    switch (target.id) {
    case 'filterByName':
      setFilterInput({ [target.id]: target.value });
      break;
    default: break;
    }
  };

  useEffect(() => {
    const { filterByName } = filterInput;
    const final = planets.filter((planet) => planet.name !== filterByName);
    console.log(final);
    // PERIGO ABAIXO!!!
    // setPlanets(final);
  }, [filterInput, planets]);

  const contextValue = {
    planets,
    setPlanets,
    filterInput,
    setFilterInput,
    onInputChange,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Provider;

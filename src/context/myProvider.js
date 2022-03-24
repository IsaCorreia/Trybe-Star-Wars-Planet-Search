import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchPlanets from '../services/fetchPlanets';
import MyContext from './myContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterInput, setFilterInput] = useState({
    filterByName: '',
    filterByNumColumn: '',
    filterByNumOperator: '',
    filterByNumValue: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetchPlanets();
      setPlanets(response);
    }

    fetchData();
  }, []);

  const onInputChange = ({ target }) => {
    setFilterInput((prevState) => ({
      ...prevState,
      [target.id]: target.value,
    }));
  };
  const contextValue = {
    planets,
    setPlanets,
    filterInput,
    setFilterInput,
    onInputChange,
  };

  return (
    <MyContext.Provider value={ contextValue }>{children}</MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Provider;

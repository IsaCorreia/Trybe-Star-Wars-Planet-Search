import React, { useEffect, useState } from 'react';
import fetchPlanets from '../services/fetchPlanets';
import MyContext from './myContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const contextValue = {
    planets,
    setPlanets,
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetchPlanets();
      setPlanets(response);
    }

    fetchData();
  }, []);
  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

export default Provider;

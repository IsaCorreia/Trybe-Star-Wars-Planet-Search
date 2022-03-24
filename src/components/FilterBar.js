import React, { useContext } from 'react';
import MyContext from '../context/myContext';

function FilterBar() {
  const { onInputChange } = useContext(MyContext);
  return (
    <>
      <h3>Filtros:</h3>
      <input
        type="text"
        data-testid="name-filter"
        id="filterByName"
        placeholder="Nome do Planeta"
        onChange={ onInputChange }
      />
    </>
  );
}

export default FilterBar;

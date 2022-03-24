import React, { useContext } from 'react';
import MyContext from '../context/myContext';

function FilterBar() {
  const {
    planets,
    onInputChange,
    applyFilters,
    filterInput: { filterByNumValue },
  } = useContext(MyContext);

  const columnOptionGen = () => {
    if (planets.length) {
      const desiredHeads = [
        'population',
        'orbital_period',
        'diameter',
        'rotation_period',
        'surface_water',
      ];
      return desiredHeads.map((stat, index) => (
        <option key={ index }>{stat}</option>
      ));
    }
  };
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
      <label htmlFor="filterByNumColumn">
        Coluna
        <select
          id="filterByNumColumn"
          data-testid="column-filter"
          onChange={ onInputChange }
        >
          {columnOptionGen()}
        </select>
      </label>

      <label htmlFor="filterByNumOperator">
        Operador
        <select
          id="filterByNumOperator"
          data-testid="comparison-filter"
          onChange={ onInputChange }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <input
        type="number"
        id="filterByNumValue"
        data-testid="value-filter"
        onChange={ onInputChange }
        value={ filterByNumValue }
      />
      <button type="button" data-testid="button-filter" onClick={ applyFilters }>
        Filtrar
      </button>
    </>
  );
}

export default FilterBar;

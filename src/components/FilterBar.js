import React, { useContext } from 'react';
import MyContext from '../context/myContext';

function FilterBar() {
  const {
    planets,
    onInputChange,
    setSavedFilters,
    savedFilters,
    filterInput: {
      filterByNumericValues,
      filterByNumericValues: { column, operator, value },
    },
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
      <label htmlFor="column">
        Coluna
        <select
          id="column"
          data-testid="column-filter"
          onChange={ onInputChange }
          value={ column }
        >
          {columnOptionGen()}
        </select>
      </label>

      <label htmlFor="operator">
        Operador
        <select
          id="operator"
          data-testid="comparison-filter"
          onChange={ onInputChange }
          value={ operator }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <input
        type="number"
        id="value"
        data-testid="value-filter"
        onChange={ onInputChange }
        value={ value }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          setSavedFilters([...savedFilters, filterByNumericValues]);
          console.log(savedFilters);
        } }
      >
        Filtrar
      </button>
    </>
  );
}

export default FilterBar;

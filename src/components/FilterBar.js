import React, { useContext } from 'react';
import MyContext from '../context/myContext';

function FilterBar() {
  const {
    planets,
    onInputChange,
    setSavedFilters,
    savedFilters,
    desiredHeads,
    filterInput,
    filterInput: {
      filterByNumericValues,
      filterByNumericValues: { column, operator, value },
    },
  } = useContext(MyContext);

  const columnOptionGen = () => {
    if (planets.length) {
      const newFilterOptions = desiredHeads
        .filter((originalColumns) => (
          savedFilters.every(({ column: incomingColumn }) => (
            originalColumns !== incomingColumn))
        ));
      console.log('no state:', filterInput.filterByNumericValues.column);
      console.log('local:', newFilterOptions[0]);

      // RESET_FILTER_INPUT = { ...RESET_FILTER_INPUT, column: newFilterOptions[0] };
      // setFilterInput(RESET_FILTER_INPUT);

      return newFilterOptions.map((stat, index) => (
        <option key={ index }>{ stat }</option>
      ));
    }
  };

  const handleClick = () => {
    setSavedFilters([...savedFilters, filterByNumericValues]);
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
        onClick={ handleClick }
      >
        Filtrar
      </button>
      {savedFilters.length
        ? savedFilters.map((filter, index) => (
          <p key={ index }>
            {`${filter.column} ${filter.operator} ${filter.value}`}
          </p>
        ))
        : null}
    </>
  );
}

export default FilterBar;

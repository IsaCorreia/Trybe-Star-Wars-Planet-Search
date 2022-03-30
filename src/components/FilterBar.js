import React, { useContext } from 'react';
import MyContext from '../context/myContext';

function FilterBar() {
  const {
    planets,
    onInputChange,
    setSavedFilters,
    savedFilters,
    desiredHeads,
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

      return newFilterOptions.map((stat, index) => (
        <option key={ index }>{ stat }</option>
      ));
    }
  };

  const handleClick = () => {
    setSavedFilters([...savedFilters, filterByNumericValues]);
  };
  const handleRemoveFilter = ({ target }) => {
    const newSavedFilters = savedFilters
      .filter((filter) => filter.column !== target.name);
    setSavedFilters(newSavedFilters);
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

      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => setSavedFilters([]) }
      >
        Limpar Filtros
      </button>

      {/*
      Excluir 1 filtro:
      button com "X", name=column, onClick => setDesiredHeads((prevState) => {...prevState, name})
       setSavedFilters.filter( filter.name != name)
       */}

      {savedFilters.length
        ? savedFilters.map((filter, index) => (
          <div data-testid="filter" key={ index }>
            <span>
              {`${filter.column} ${filter.operator} ${filter.value}`}
            </span>
            <button
              type="button"
              name={ filter.column }
              onClick={ handleRemoveFilter }
            >
              X
            </button>
          </div>
        ))
        : null}
    </>
  );
}

export default FilterBar;

import React, { useContext, useState } from 'react'
import StarWarsContext from '../context/StartWarsContext'

export default function Filters() {
  const {
    data,
    originalData,
    setData,
    filters,
    setFilters,
    options,
    setOptions,
    originalOptions,
  } = useContext(StarWarsContext);
  const [selectedColumn, setSelectedColumn] = useState(options[0]);
  const [selectedComparison, setSelectedComparison] = useState('menor que');
  const [numberValue, setNumberValue] = useState('');

  const nameFilter = ({ target: { value } }) => {
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });

    if (value === '') return setData(originalData);

    const newData = originalData.filter(({ name }) => (
      name.toLowerCase().includes(value.toLowerCase())));
    return setData(newData);
  }

  const numberFilter = (column, comparison, value) => {
    const underlineColumm = column.replace(' ', '_');
    switch (comparison) {
    case 'maior que':
      setData(
        data
          .filter((planet) => Number(planet[underlineColumm]) > Number(value)),
      );
      break;
    case 'menor que':
      setData(
        data
          .filter((planet) => Number(planet[underlineColumm]) < Number(value)),
      );
      break;
    case 'igual a':
      setData(
        data
          .filter((planet) => Number(planet[underlineColumm]) === Number(value)),
      );
      break;
    default: break;
    }
  };

  const handleSelected = () => {
    const numericValues = {
      column: selectedColumn,
      comparison: selectedComparison,
      value: numberValue,
    };

    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, numericValues],
    });
    numberFilter(selectedColumn, selectedComparison, numberValue);
    const newOptions = options.filter((option) => option !== selectedColumn.replace(' ', '_'));
    setOptions(newOptions);
    setSelectedColumn(newOptions[0])
    setNumberValue('');
  };

  const removeFilter = (index) => {
    const { filterByNumericValues } = filters;
    const newFilters = filterByNumericValues.filter((value, i) => index !== i);
    setFilters({
      ...filters,
      filterByNumericValues: newFilters,
    });
    if (newFilters.length === 0) {
      setData(originalData);
      return setOptions(originalOptions);
    }
    setOptions(originalOptions);
    return newFilters
      .forEach(({ column, comparison, value }) => {
        setOptions(options.filter((option) => option !== column));
        return numberFilter(column, comparison, value);
      });
  };

  return (
    <div className="filters-container">
      <input
        className="filter-name"
        type="text"
        placeholder="Type a Name"
        onChange={ nameFilter }
        name="name-filter"
      />

      <select
        name="filter-option"
        className="select-input"
        value={ selectedColumn }
        onChange={ ({ target: { value } }) => setSelectedColumn(value) }
      >
        {
          options.map((option) => (
            <option key={ option }>{ option.replace('_', ' ') }</option>
          ))
        }
      </select>

      <select
        name="filter-option"
        onChange={ ({ target: { value } }) => setSelectedComparison(value) }
        className="select-input"
      >
        <option value="menor que">menor que</option>
        <option value="maior que">maior que</option>
        <option value="igual a">igual a</option>
      </select>
      
      <input
        type="number"
        value={ numberValue }
        onChange={ ({ target: { value } }) => setNumberValue(value) }
        placeholder="Type a Number"
      />
      
      <button
        type="button"
        className="filter-btn"
        onClick={ handleSelected }
      >
        Filter
      </button>

      <div>
        <h2>in use</h2>
        {
          filters.filterByNumericValues.map(({ column, comparison, value }, index) => (
            <div key={ index }>
              <p>
                {`column: ${column} - comparison: ${comparison} - value: ${value} `}
              </p>
              <button
                type="button"
                onClick={ () => removeFilter(index) }
              >
                x
              </button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

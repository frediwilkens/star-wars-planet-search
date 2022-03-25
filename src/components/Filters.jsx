import React, { useContext, useState } from 'react'
import StarWarsContext from '../context/StartWarsContext'

export default function Filters() {
  const {
    originalData,
    setData,
    filters,
    setFilters,
    options,
    setOptions,
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
    </div>
  )
}

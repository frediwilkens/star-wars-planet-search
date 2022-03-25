import React, { useContext } from 'react'
import StarWarsContext from '../context/StartWarsContext'

export default function Filters() {
  const {
    originalData,
    setData,
    filters,
    setFilters,
  } = useContext(StarWarsContext);

  const nameFilter = ({ target: { value } }) => {
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
    const result = originalData.filter(({ name }) => {
      if (value === '') return name
      return name.toLowerCase().includes(value.toLowerCase());
    });
    return setData(result);
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
    </div>
  )
}

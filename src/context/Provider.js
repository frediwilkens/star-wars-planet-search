import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StartWarsContext';

const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
const numericColumns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water'
];

function Provider({ children }) {
  const [data, setData] = useState([{}]);
  const [originalData, setOriginalData] = useState([{}]);
  const [filters, setFilters] = useState({});
  const [options, setOptions] = useState(numericColumns);

  useEffect(() => {
    async function fetchStarWarsPlanets() {
      const { results } = await fetch(endpoint).then((response) => response.json());
      setData(results);
      setOriginalData(results);
    }
    fetchStarWarsPlanets();
  }, []);

  const context = {
    originalData,
    data,
    setData,
    filters,
    setFilters,
    options,
    setOptions,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      { children }
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
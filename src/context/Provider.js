import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StartWarsContext';

const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

function Provider({ children }) {
  const [data, setData] = useState([{}]);
  const [originalData, setOriginalData] = useState([{}]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    async function fetchStarWarsPlanets() {
      const { results } = await fetch(endpoint).then((response) => response.json());
      setData(results);
      setOriginalData(results);
    }
    fetchStarWarsPlanets();
  }, []);

  const context = {
    data,
    setData,
    filters,
    setFilters,
    originalData,
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
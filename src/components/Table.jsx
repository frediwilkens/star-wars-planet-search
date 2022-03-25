import React, { useContext } from 'react'
import StarWarsContext from '../context/StartWarsContext'

export default function Table() {
  const { data } = useContext(StarWarsContext);
  console.log(data);

  return (
    <div>Table will come here</div>
  );
}

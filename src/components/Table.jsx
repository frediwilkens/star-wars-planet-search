import React, { useContext } from 'react'
import StarWarsContext from '../context/StartWarsContext'

export default function Table() {
  const { data, originalData } = useContext(StarWarsContext);
  const tableHeaders = Object.keys(originalData[0])
    .filter((key) => (
      (key !== 'films') && (key !== 'residents') && (key !== 'edited') && (key !== 'created')
    ));

  return (
    <table className="star-wars-table">
      <thead>
        <tr>
          {
            tableHeaders.map((header) => (
              <th key={header}>{ header.replace('_', ' ') }</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          data.map((planet, index) => {
            const {
              name,
              rotation_period,
              orbital_period,
              diameter,
              climate,
              gravity,
              terrain,
              surface_water,
              population,
              url,
            } = planet;
            return (
              <tr key={ index }>
                <td>{ name }</td>
                <td>{ rotation_period }</td>
                <td>{ orbital_period }</td>
                <td>{ diameter }</td>
                <td>{ climate }</td>
                <td>{ gravity }</td>
                <td>{ terrain }</td>
                <td>{ surface_water }</td>
                <td>{ population }</td>
                <td>{ url }</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
}

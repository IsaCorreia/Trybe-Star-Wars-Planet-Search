import React, { useContext } from "react";
import MyContext from "../context/myContext";

function Table() {
  const {
    planets,
    applyNumFilter,
    filterInput: { filterByName },
  } = useContext(MyContext);

  const tableHeadGen = () => {
    if (planets.length) {
      const tableHeadText = Object.keys(planets[0]);
      return tableHeadText
        .filter((header) => header !== "residents")
        .map((header, index) => <th key={index}>{header}</th>);
    }
  };

  const tableContentGen = () => {
    if (planets.length) {
      const filtered = planets.filter((planet) =>
        planet.name.toUpperCase().includes(filterByName.toUpperCase())
      );

      return applyNumFilter(filtered).map(
        (
          {
            name,
            rotation_period: rotation,
            orbital_period: orbital,
            diameter,
            climate,
            gravity,
            terrain,
            surface_water: surface,
            population,
            films,
            created,
            edited,
            url,
          },
          index
        ) => (
          <tr key={index}>
            <td key={name + index}>{name}</td>
            <td key={rotation + index}>{rotation}</td>
            <td key={orbital + index}>{orbital}</td>
            <td key={diameter + index}>{diameter}</td>
            <td key={climate + index}>{climate}</td>
            <td key={gravity + index}>{gravity}</td>
            <td key={terrain + index}>{terrain}</td>
            <td key={surface + index}>{surface}</td>
            <td key={population + index}>{population}</td>
            <td key={films + index}>{films}</td>
            <td key={created + index}>{created}</td>
            <td key={edited + index}>{edited}</td>
            <td key={url + index}>{url}</td>
          </tr>
        )
      );
    }
  };

  return (
    <table>
      <thead>
        <tr>{tableHeadGen()}</tr>
      </thead>
      <tbody>{tableContentGen()}</tbody>
    </table>
  );
}

export default Table;

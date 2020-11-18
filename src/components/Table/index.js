import React from "react";

// Node modules
import numeral from "numeral";

// Local files
import "./index.scss";

/**
 * Table that displays live cases by country
 *
 * @param {Object} countries => contains countries covid-19 statistics
 */
function Table({ countries }) {
  return (
    <div className="table">
      <table>
        <tbody>
          {countries.map(({ country, cases }) => (
            <tr key={country}>
              <td>{country}</td>
              <td>
                <strong>{numeral(cases).format()}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

import React, { useState } from "react";
import "./App.scss";
import { FormControl, Select, MenuItem } from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState([
    { name: "worldwide" },
    { name: "tunisia" },
  ]);
  return (
    <div className="app">
      <div className="app__header">
        <h1>Covid 19 Update</h1>
        <FormControl className="app__header__dropdown">
          <Select variant="outlined" value={countries[0].name}>
            {countries.map((country) => (
              <MenuItem value={country.name}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* <Header /> */}

      {/* <InfoBox/> */}
      {/* <InfoBox/> */}
      {/* <InfoBox/> */}

      {/* <Table/> */}
      {/* <Graph/> */}

      {/* <Map/> */}
    </div>
  );
}

export default App;

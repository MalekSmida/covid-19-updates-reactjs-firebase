import React, { useState, useEffect } from "react";
import "./App.scss";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__left__header">
          <h1>Covid 19 Update</h1>
          <FormControl className="app__left__header__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem key={0} value="worldwide">
                Worldwide
              </MenuItem>
              {countries.map((country, index) => (
                <MenuItem key={index + 1} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__left__stats">
          <InfoBox title="Coronavirus cases" cases="100M" total="84B" />
          <InfoBox title="Recoverd" cases="100M" total="84B" />
          <InfoBox title="Deaths" cases="100M" total="84B" />
        </div>

        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* <Table/> */}
          <h3>Worldwide new Cases</h3>
          {/* <Graph/> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

import Http from "./Http";

/**
 * Fetch all data from disease based
 */
const getCovidAllData = async () => {
  let data = { response: undefined, error: undefined };
  try {
    const res = await Http.get("all");
    data.response = res;
  } catch (err) {
    data.error = err;
    console.log(err);
  }
  return data;
};

/**
 * Fetch countries data from disease based
 */
const getCountriesData = async () => {
  let data = { response: undefined, error: undefined };
  try {
    const res = await Http.get("countries");
    data.response = res;
  } catch (err) {
    data.error = err;
    console.log(err);
  }
  return data;
};

/**
 * Fetch specific country data
 *
 * @param {String} countryCode
 */
const getCountryData = async (countryCode) => {
  let data = { response: undefined, error: undefined };
  try {
    const res = await Http.get(`countries/${countryCode}`);
    data.response = res;
  } catch (err) {
    data.error = err;
    console.log(err);
  }
  return data;
};

/**
 * Fetch historical data of covid-19 in the last 120 day
 */
const getHistoricalData = async () => {
  let data = { response: undefined, error: undefined };
  try {
    const res = await Http.get("historical/all?lastdays=120");
    data.response = res;
  } catch (err) {
    data.error = err;
    console.log(err);
  }
  return data;
};

export { getCovidAllData, getCountriesData, getCountryData, getHistoricalData };

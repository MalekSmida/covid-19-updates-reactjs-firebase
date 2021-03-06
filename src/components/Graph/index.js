import React, { useState, useEffect } from "react";

// Node modules
import { Line } from "react-chartjs-2";
import numeral from "numeral";

// Local files
import "./index.scss";
import { getHistoricalData } from "../../services/Covid";

/**
 * Graph configuration
 */
const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0.0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

/**
 * Filter data based on {casesType}
 *
 * @param {Object} data => historical data of covid-19 in the last 120 day
 * @param {String} casesType => could be: cases, recovered or deaths
 */
const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

/**
 * Graph component that displays statistics as chart
 *
 * @param {String} casesType => could be: cases, recovered or deaths
 */
function Graph({ casesType, ...props }) {
  const [data, setData] = useState({});
  const [error, setError] = useState({});

  // Fetch historical data of covid-19 in the last 120 day
  useEffect(() => {
    let ignore = false;

    (async function () {
      const res = await getHistoricalData();
      if (ignore) return;
      if (res.error) {
        setError(res.error);
        return;
      }
      const chartData = buildChartData(res.response.data, casesType);
      setData(chartData);
    })();

    return () => {
      ignore = true;
    };
  }, [casesType]);

  return (
    <div className="graph">
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204,16,52,0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default Graph;

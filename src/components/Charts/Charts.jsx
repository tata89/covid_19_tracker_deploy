import React, { useState, useEffect } from "react";
import { fetchdatadaily } from "../../api";
import { Line, Bar } from "react-chartjs-2";

import styles from "./Charts.module.css";
const Charts = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailydata, setdailydata] = useState([]);
  useEffect(() => {
    const fetchapi = async () => {
      setdailydata(await fetchdatadaily());
    };
    fetchapi();
  }, []);
  const Linechart = dailydata.length ? (
    <Line
      data={{
        labels: dailydata.map(({ date }) => date),
        datasets: [
          {
            data: dailydata.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailydata.map(({ deaths }) => deaths),
            label: "Death",
            borderColor: "red",
            backgroundColor: "rgb(255,0,0,0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;
  console.log(confirmed, recovered, deaths);
  const Barchart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "people",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current sate in ${country}` },
      }}
    />
  ) : null;
  return (
    <div className={styles.container}>{country ? Barchart : Linechart}</div>
  );
};

export default Charts;

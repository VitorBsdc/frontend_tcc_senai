import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import Service from "../../services";

const srv = new Service();

export default function ChartTemperature({ statusMachine }) {
  const [data, setData] = useState([]);
  const [datahora, setDatahora] = useState([]);

  async function getTemperature() {
    await srv.machineList().then((res) => {

      for(const i in res.infos){
        setData((arr) => [...arr, res.infos[i].temperatura]);

        const date = new Date(res.infos[i].datahora);
        setDatahora((arr) => [...arr, `${date.getHours()}:${date.getMinutes()}:${date.getMinutes()}`])
      }
    })
  }
  
  useEffect(() => {
    if (data.length == 0) {
      getTemperature()
    } else {
      const interval = setInterval(async () => {
        if(!statusMachine) return;
        await srv.lastInfo()
          .then((res) => {
            let newData = [...data, res.fItem.temperatura]

            let date = new Date(res.fItem.datahora);
            let newDatahora = [...datahora, `${date.getHours()}:${date.getMinutes()}:${date.getMinutes()}`]

            newData.shift()
            newDatahora.shift()

            ApexCharts.exec("temperatura", "updateOptions", {
              xaxis: {
                categories: newDatahora
              }
            })

            ApexCharts.exec("temperatura", "updateSeries", [{
              data: newData
            }])

            setData(newData)
            setDatahora(newDatahora)
          })
      }, 21000);
    }
  }, [statusMachine]);

  const mockData = {
    labels: {
      categories: datahora,
    },
    series: [
      {
        name: "°C",
        data: data,
      },
    ],
  };

  const options = {
    chart: {
      id: "temperatura",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      },
    },
    fill: {
      colors: ["#ff6a0d"],
    },
    xaxis: {
      categories: mockData.labels.categories,
    },
  };

  return (
    <div className="container-chart">
      <h2 style={{ fontFamily: "Nunito" }}>Temperatura</h2>
      <Chart
        options={{ ...options }}
        series={mockData.series}
        type="bar"
        height="300"
      />
    </div>
  );
}

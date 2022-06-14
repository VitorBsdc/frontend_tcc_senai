import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import Service from '../../services';

const srv = new Service();

export default function ChartArea({ statusMachine }) {
  const [data, setData] = useState([]);
  const [datahora, setDatahora] = useState([]);

  async function getRotation() {
    await srv.machineList().then((res) => {

      for(const i in res.infos){
        setData((arr) => [...arr, res.infos[i].rotacao]);

        const date = new Date(res.infos[i].datahora);
        setDatahora((arr) => [...arr, `${date.getHours()}:${date.getMinutes()}:${date.getMinutes()}`])
      }
    })
  }
  
  useEffect(() => {
    if (data.length == 0) {
      getRotation()
    } else {
      const interval = setInterval(async () => {
        if(!statusMachine) return;
        await srv.lastInfo()
          .then((res) => {
            let newData = [...data, res.fItem.rotacao]

            let date = new Date(res.fItem.datahora);
            let newDatahora = [...datahora, `${date.getHours()}:${date.getMinutes()}:${date.getMinutes()}`]

            newData.shift()
            newDatahora.shift()

            ApexCharts.exec("rotacao", "updateOptions", {
              xaxis: {
                categories: newDatahora
              }
            })

            ApexCharts.exec("rotacao", "updateSeries", [{
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
        name: "RPM",
        data: data,
      },
    ],
  };

  const options = {
    chart: {
      id: "rotacao",
      toolbar: {
        show: true,
        tools: {
          download: false,
          pan: false,
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 7,
        inverseColors: false,
        opacityFrom: 10,
        opacityTo: 0,
        stops: [],
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: mockData.labels.categories,
    },
    colors: ["#713bb8"],
  };

  return (
    <div className="container-chart">
      <h2 style={{ fontFamily: "Nunito" }}>Rotação por minuto</h2>
      <Chart
        options={{ ...options }}
        type="area"
        height="300"
        series={mockData.series}
      />
    </div>
  );
}

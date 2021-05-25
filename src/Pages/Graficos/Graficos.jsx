import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import './grafico.css';
import { useContext } from 'react';
import { GlobalContext } from '../../Contexts/tractian';

export default function Graficos() {
  const global = useContext(GlobalContext)
  const ativos = global.ativos;
  const inAlert = ativos.length !== undefined && ativos.filter(ativo => ativo.status === 'inAlert')
  const inDowntime = ativos.length !== undefined && ativos.filter(ativo => ativo.status === 'inDowntime')
  const inOperation = ativos.length !== undefined && ativos.filter(ativo => ativo.status === 'inOperation')

  function filtrando(modo) {
    let soma
    switch (modo) {
      case 'inAlert':
        soma = inAlert;
        break;
      case 'inDowntime':
        soma = inDowntime;
        break;
      case 'inOperation':
        soma = inOperation;
        break;
      default:
        soma = 0;
        break;
    }
    return soma.length;
  }
  function dados() {
    let vetor = []
    ativos.length !== undefined && ativos.map(({ sensors, healthscore }) => (
      vetor.push({ name: sensors, y: healthscore })
    ))
    vetor.sort(function (a, b) { return a.y - b.y });

    return vetor
  }

  const options = {
    chart: { type: 'column' },
    title: { text: '<span style="font-size:48px;"> Grafico com estado atual x Quantidade</span>' },
    yAxis: { title: { text: '<span style="font-size:20px;">Quantidade por estado</span>' } },
    xAxis: { type: 'category' },
    tooltip: {
      headerFormat: "",
      pointFormat: '<span style="font-size:13px; color:{point.color}">{point.name}</span>: <b>{point.y:.0f}%</b> total<br/>'
    },
    series: [
      {
        name: "Estados Atuais",
        colorByPoint: true,
        data: [
          {
            name: "inAlert",
            y: filtrando('inAlert')
          },
          {
            name: "inDowntime",
            y: filtrando('inDowntime')
          },
          {
            name: "inOperation",
            y: filtrando('inOperation')
          }
        ]
      }]
  }
  const options3dCharts = {
    chart: {
      type: 'column'
    },
    title: {
      text: '<span style="font-size:48px;">Qualidade do sensor</span>'
    },
    yAxis: { title: { text: '<span style="font-size:20px;">Qualidade em porcentagem (%)</span>' } },
    xAxis: { type: 'category' },
    tooltip: {
      headerFormat: "",
      pointFormat: '<span style="font-size:18px; color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> total<br/>'
    },
    legend: {
      layout: 'horizontal',
      borderWidth: 0,
      backgroundColor: 'rgba(255,255,255,0.85)',
      floating: true,
      verticalAlign: 'top',
      y: 25
    },
    colorAxis: {
      min: 1,
      type: 'logarithmic',
      minColor: '#EEEEFF',
      maxColor: '#000022',
      stops: [
        [0, '#EFEFFF'],
        [0.5, '#4444FF'],
        [1, '#000022']
      ]
    },
    series: [
      {
        name: "Sensores",
        colorByPoint: false,
        data: dados()
      }
    ]
  }

  return (
    <>
      <div className="grafico">
        <HighchartsReact
          className="highcharts-root"
          highcharts={Highcharts}
          options={options} /></div>
      <div className="grafico">
        <HighchartsReact
          className="highcharts-root"
          highcharts={Highcharts}
          options={options3dCharts} /></div>
    </>
  )
};

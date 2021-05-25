import { Table } from "antd";
import { useEffect, useState } from "react"
import { pegarTudo } from "../../api/api";
import headers from "./Header/Header";


export default function InfoTable() {
  const [dados, setDados] = useState({});
  const data = [];
  
  useEffect(() => {
    pegarTudo(setDados, '/assets')
  }, [])
  
  for (let i = 0; i < dados.length; i++) {
    data.push({
      key: i,
      id: dados[i].id,
      sensors:dados[i].sensors,
      name: dados[i].name,
      image:dados[i].image,
      status: dados[i].status,
      healthscore: dados[i].healthscore,
      especifies: "...",
      metrics: "..."
    });
  }
    
  if(dados.length > 1){
    return (
    <Table dataSource={data} columns={headers} />)
  } else { return null }
  
}
import { Table } from "antd";
import { useContext } from "react"
import { GlobalContext } from "../../../Contexts/tractian"
import headers from "../Header/Header";

export default function Body() {
  const global = useContext(GlobalContext)
  const ativos = global.ativos;
  
  return (
    <Table dataSource={ativos} columns={headers} />
  )
}

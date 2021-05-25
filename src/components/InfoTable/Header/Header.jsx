import { Image } from "antd";
import { Link } from "react-router-dom";
import PopUp from "../../PopUp/PopUp";
const headers = [
  {
    title: 'Sensores',
    dataIndex: 'sensors',
    key: 'sensors',
  },
  {
    title: 'Imagens',
    dataIndex: 'imagens',
    key: 'imagens',
    render: (_, record) => (
      <Image src={record.image} style={{width:'5rem'}}/>
    )},
  {
    title: 'Estado atual',
    dataIndex: 'status',
    key: 'status',
    filters: [
      {
        text: 'inAlert',
        value: 'inAlert',
      },
      {
        text: 'inDowntime',
        value: 'inDowntime',
      },
      {
        text: 'inOperation',
        value: 'inOperation',
      }
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
  },
  {
    title: 'Saúde em %',
    dataIndex: 'healthscore',
    key: 'healthscore',
    sorter: (a, b) => a.healthscore - b.healthscore,
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.healthscore - b.healthscore,
  },
  {
    title: 'Especificações',
    dataIndex: 'especifies',
    key: 'especifies',
    render: (_, record) => (
      <PopUp modo={"especifies"} especifies={record.especifies} id={record.id} />
    )
  },
  {
    title: 'Metricas',
    dataIndex: 'metrics',
    key: 'metrics',
    render: (_, record) => (
      <PopUp modo={"metrics"} especifies={record.metrics} id={record.id} />
    )
  },
  {
    title: 'Editar',
    dataIndex: 'editar',
    key: 'editar',
    render: (_, record) => (
      <Link to={`/edit/assets/${record.id}`}><Image src="./edit.svg"  style={{width:'3rem'}} preview={false} /></Link>
    )
  }
];
export default headers;
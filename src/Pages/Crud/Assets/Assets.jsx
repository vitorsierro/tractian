import { useContext, useEffect, useState } from 'react';
import {
  Form, Input, Button, Row, DatePicker, TimePicker, Image,
} from 'antd';
import moment from 'moment';
import { GlobalContext } from '../../../Contexts/tractian';
import { Typography, Select } from 'antd';
import { criar, atualizar, deletar, pegarUm } from '../../../api/api';
import styled from "../../../styles/assets.module.css"
import { useNavigate } from 'react-router-dom';


const { Title } = Typography;
const { Option } = Select;

export default function Assets({ modo }) {
  const global = useContext(GlobalContext);
  const companies = global.companies;
  const units = global.units;
  const navigate = useNavigate();
  const dateFormat = 'DD/MM/YYYY';

  //Inputs dados
  const [sensors, setSensors] = useState("");
  const [modelo, setModelo] = useState("");
  const [status, setStatus] = useState("");
  const [nome, setNome] = useState("");
  const [healthscore, setHealthscore] = useState("");
  const [urlFotos, setUrlFotos] = useState("");
  //especificações
  const [maxTemp, setMaxTemp] = useState("");
  const [power, setPower] = useState("");
  const [rpm, setRpm] = useState("");
  //metricas
  const [totalCollectsUpTime, setTotalCollectsUpTime] = useState();
  const [totalUpTime, setTotalUpTime] = useState();
  const [calendario, setCalendario] = useState("");
  const [horario, setHorario] = useState("");

  const [unitId, setUnitId] = useState();
  const [companyId, setCompanyId] = useState();

  const [dados, setDados] = useState({});
  const id = window.location.pathname.split("/")[3];
  

  var data = new Date();
  var formulario;

  var mes = data.getMonth() + 1
  if (mes === 13) {
    mes = 12;
  }
  useEffect(() => {
    if (id !== undefined && modo === 'editar' ){
        pegarUm(setDados, "assets", id)
    }
  }, [id, modo]);
  
  useEffect(() => {
    const specifications = { ...dados.specifications }
    const metrics = { ...dados.metrics };
    if (dados !== {} && modo === 'editar' ){
        setSensors(dados.sensors)
        setModelo(dados.model)
        setStatus(dados.status)
        setNome(dados.name)
        setHealthscore(dados.healthscore)
        setUrlFotos(dados.image)
        //especificações
        if (specifications.maxTemp !== undefined) {
          setMaxTemp(specifications.maxTemp)
        }
        if (specifications.power !== undefined) {
          setPower(specifications.power)
        } else { setPower("null") }
        if (specifications.rpm !== undefined) {
          setRpm(specifications.rpm)
        } else { setRpm("null") }
        //metricas
        if (metrics !== {}) {
          setTotalCollectsUpTime(metrics.totalCollectsUptime)
          setTotalUpTime(metrics.totalUptime)
          if (metrics.lastUptimeAt !== undefined) {
            const lastUptimeAt = metrics.lastUptimeAt.split("T")
            setCalendario(lastUptimeAt[0].split('-'))
            setHorario(lastUptimeAt[1].split(".")[0])
          }
        }
        //vinculo 
        setUnitId(dados.unitId)
        setCompanyId(dados.companyId)
      }
  }, [dados, modo])

  function handleEnviar() {
    formulario = {
      'sensors': sensors,
      'modelo': modelo,
      'status': status,
      'nome': nome,
      'healthscore': healthscore,
      'urlFotos': urlFotos,
      "specifications": {
        'maxTemp': maxTemp === undefined ? 'null': maxTemp,
        'power': power  === undefined ? 'null': power,
        'rpm': rpm  === undefined ? 'null': rpm
      },
      "metrics": {
        'totalCollectsUptime': totalCollectsUpTime,
        'totalUptime': totalUpTime,
        'lastUpTimeAt': `${calendario}T${horario}:${data.getMilliseconds}Z`
      },
      'unitId': unitId,
      'companyId': companyId
    };
    criar(`/assets/`, formulario);
    global.clearAtivos();
    setDados({})
    navigate('/');
  }

  function handleEdit() {
    formulario = {
      'id': id,
      'sensors': sensors,
      'modelo': modelo,
      'status': status,
      'nome': nome,
      'healthscore': healthscore,
      'urlFotos': urlFotos,
      "specifications": {
        'maxTemp': maxTemp,
        'power': power,
        'rpm': rpm
      },
      "metrics": {
        'totalCollectsUptime': totalCollectsUpTime,
        'totalUptime': totalUpTime,
        'lastUpTimeAt': `${calendario}T${horario}:${data.getMilliseconds}Z`
      },
      'unitId': unitId,
      'companyId': companyId
    };
    atualizar(`/assets/${id}`, formulario);
    global.clearAtivos();
    setDados({})
    navigate('/')
  }
  function handleDelete() {
    deletar(`/assets/${id}`)
    global.clearAtivos();
    setDados({})
    navigate('/')
  }
  
  return (
    <>
      <Title className={styled.Titulo}>Ativos</Title>
      <Form
        layout="vertical"
        className={styled.Container}
        onSubmit={() => handleEnviar()}>
        <Row>
          <Form.Item label="Sensors" required tooltip="nome do sensor"
            className={styled.AtivosInput}>
            <Input placeholder="Exemplo: GSJ1535"
              value={sensors}
              onChange={(event) => setSensors(event.target.value)} />
          </Form.Item>
          <Form.Item label="Modelo" required tooltip="nome do modelo"
            className={styled.AtivosInput}>
            <Input placeholder="Exemplo: Motor"
              value={modelo}
              onChange={(event) => setModelo(event.target.value)} />
          </Form.Item>
          <Form.Item label="Status" required tooltip="status do sensor"
            className={styled.AtivosInput}>
            <Select defaultValue="" value={status}
              onChange={(value) => (setStatus(value))} >
              <Option value=""></Option>
              <Option value="inAlert">InAlert</Option>
              <Option value="inDownTime">inDownTime</Option>
              <Option value="inOperation">inOperation</Option>
            </Select>
          </Form.Item>
        </Row>
        <Row>
          <Form.Item label="Nome" required tooltip="Nome"
            className={styled.AtivosInput}>
            <Input placeholder="Exemplo: Motor H13D-1"
              value={nome}
              onChange={(event) => setNome(event.target.value)} />
          </Form.Item>
          <Form.Item label="Saúde em %" required tooltip="qualidade do sensor em %"
            className={styled.AtivosInput}>
            <Input placeholder="Exemplo: 70"
              value={healthscore}
              onChange={(event) => setHealthscore(event.target.value)} />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item label="Imagem" required tooltip="link da imagem"
            className={styled.Imagens}>
            <Input placeholder="Exemplo: url da imagem"
              value={urlFotos}
              onChange={(event) => setUrlFotos(event.target.value)} />
          </Form.Item>
          <Image width="13%" height="40%" src={urlFotos} alt="imagem da url" preview={false} style={{ marginLeft: "3rem", bottom: "5rem", position: 'relative' }} />
        </Row>
        <hr className={styled.Hr} />
        <div style={{ marginTop: 10 }}>
          <h2 className={styled.SubTitulo}>Especificações</h2>
          <Row>
            <Form.Item label="Tempo maximo em Celsuys" tooltip="Tempo maximo em Celsuys" className={styled.AtivosInput}>
              <Input placeholder="Exemplo: 80"
                value={maxTemp}
                onChange={(event) => setMaxTemp(event.target.value)} />
            </Form.Item>

            <Form.Item label="Energia" tooltip="potência em kWh"
              className={styled.AtivosInput}>
              <Input placeholder="Exemplo: 1.5"
                value={power}
                onChange={(event) => setPower(event.target.value)} />
            </Form.Item>

            <Form.Item label="RPM" tooltip="ciclo de rotações por minuto" className={styled.AtivosInput}>
              <Input placeholder="Exemplo: 1750"
                value={rpm}
                onChange={(event) => setRpm(event.target.value)} />
            </Form.Item>
          </Row>
          <hr className={styled.Hr} />
        </div>

        <div style={{ marginTop: 10 }}>
          <h2 className={styled.SubTitulo}>Metricas</h2>
          <Row>
            <Form.Item label="Total de Coletas Uptime" tooltip="Total de Coletas Uptime(Ligado)" className={styled.AtivosInput}>
              <Input placeholder="Exemplo: 889"
                value={totalCollectsUpTime}
                onChange={(event) => setTotalCollectsUpTime(event.target.value)} />
            </Form.Item>

            <Form.Item label="Total de Horas de Coletas Uptime" tooltip="Total de Horas de Coletas Uptime(Ligado)" className={styled.AtivosInput}>
              <Input placeholder="Exemplo: 1500.2918963886"
                value={totalUpTime}
                onChange={(event) => setTotalUpTime(event.target.value)} />
            </Form.Item>

            <Form.Item label="Data da Ultima Coleta Uptime" tooltip="Data da Ultima Coleta Uptime(Ligado)" className={styled.AtivosInput}>
              {modo === 'editar' ?
                <Row>
                  {calendario !== undefined &&
                    <DatePicker
                    value={
                      moment(`${calendario[2]}/${calendario[1]}/${calendario[0]}`, dateFormat)} format={dateFormat} className={styled.Calendario} onChange={(event) => (setCalendario(event.target.value))} />}
                  {horario !== undefined &&
                    <TimePicker value={moment(horario, 'HH:mm:ss')}
                      onChange={(event) => (setHorario(event.target.value))} />}
                </Row>
                :
                <>
                  <DatePicker defaultValue={
                    moment(`${data.getDate()}/${mes}/${data.getFullYear()}`, dateFormat)} format={dateFormat} onChange={(event) => (setCalendario(event.target.value))} style={{ marginRight: '0.5rem' }} />
                  <TimePicker defaultValue={moment(`${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`, 'HH:mm:ss')}
                    onChange={(event) => (setHorario(event.target.value))} />
                </>
              }
            </Form.Item>
          </Row>
          <hr className={styled.Hr} />
        </div>

        <Row style={{ marginTop: 10 }}>
          <Form.Item label="Qual a unidade" required tooltip="Unidade a qual a peça se encontra" className={styled.AtivosInput}>
            <Select defaultValue=""
              value={unitId}
              onChange={(value) => (setUnitId(value))}>
              <Option value=""></Option>
              {units.length !== undefined ? units.map((unit) => (
                <Option value={unit.id} key={unit.id}>{unit.name}</Option>
              )) : null}
            </Select>
          </Form.Item>

          <Form.Item label="Qual a Empresa" required tooltip="Empresa a qual a peça se encontra" className={styled.AtivosInput}>
            <Select defaultValue=""
              value={companyId}
              onChange={(value) => (setCompanyId(value))}>
              <Option value=""></Option>
              {companies.length !== undefined ? companies.map((companie) => (
                <Option value={companie.id} key={companie.id}>{companie.name}</Option>
              )) : null}
            </Select>
          </Form.Item>
        </Row>
        {modo === 'editar' ?
          <Row>
          <Form.Item style={{ position: 'relative', left: '80%' }} >
            <Button type="primary" htmlType='submit' size='large' onClick={() => handleDelete()} danger style={{ marginRight: '3rem' }}>Deletar</Button>
            <Button type="primary" size='large' onClick={(event) => handleEdit(event)}>Editar</Button>
          </Form.Item>
        </Row>
        :
        <Form.Item style={{ position: 'relative', left: '90%' }} >
          <Button type="primary" htmlType='submit' size='large' onClick={(event) => handleEnviar(event)}>Enviar</Button>
        </Form.Item>
        }
      </Form>
    </>
  )
}

import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../Contexts/tractian";
import { Form, Input, Button, Select, Typography, Row } from 'antd';
import { criar, atualizar, deletar, pegarUm } from '../../../api/api';
import styled from "../../../styles/other.module.css"
import { useNavigate } from "react-router-dom";

export default function Other({ page, modo }) {
  const global = useContext(GlobalContext);
  const companies = global.companies;
  const navigate = useNavigate();

  const { Option } = Select;
  const { Title } = Typography;
  //Inputs dados
  const [name, setName] = useState("");
  const [companyId, setCompanyId] = useState();
  const [dados, setDados] = useState({});
   
  var formulario = {}
  useEffect(() => {
    if (modo === 'editar' && global.id !== undefined) {
      if (page === 'units') {
        pegarUm(setDados, 'units', global.id);
      } else {
        pegarUm(setDados, 'companies', global.id);
      }
    }
  },[global.id]);
  
  useEffect(() => {
      if (page === 'units') {
        setName(dados.name);
        setCompanyId(dados.companyId);
      } else {
        pegarUm(setDados, 'companies', global.id);
        setName(dados.name);
    }
  }, [dados]);
  
  function handleEnviar() {
    if(page === "units"){
      formulario = {"name": name, "companyId": companyId};
      criar(`/units`, formulario);
      global.clearUnits();
    } else {
      formulario = { "name": name };
      criar(`/companies`, formulario);
      global.clearCompanies();
    }
    navigate('/')
    setDados({})
  }
  function handleEdit() {
    if(page === "units"){
      formulario = {"id": global.id,"name": name,
        "companyId": companyId};
      atualizar(`/units/${global.id}`, formulario);
    } else {
      formulario = { "id": global.id, "name": name };
      atualizar(`/companies/${global.id}`, formulario);
  }
    setDados({})
    global.clearUsers();
    navigate('/')
  }

  function handleDelete() {
    deletar(`/${page}/${global.id}`);
    navigate('/');
    setDados({})
    global.clearUsers();
  }
  
  if (page === 'units') {
    return (
      <>
        <Title className={styled.Titulo}>Unidade</Title>
        <Form
          layout="vertical"
          onSubmit={() => handleEnviar()}>
          <Row>
            <Form.Item label="Nome" required tooltip="nome da unidade"
              className={styled.AtivosInput}>
              <Input placeholder="Exemplo: Unidade Jaguar"
                value={name}
                onChange={(event) => setName(event.target.value)} />
            </Form.Item>
            <Form.Item label="Qual a empresa" required tooltip="Empresa a qual a unidade pertence" className={styled.AtivosInput}>
              <Select defaultValue={modo === 'editar' ? companyId : ""}
                value={companyId !== undefined && companyId}
                onChange={(value) => (setCompanyId(value))}>
                <Option value=""></Option>
                {companies.length !== undefined && companies.map((companie) => (<Option value={companie.id} key={companie.id}>{companie.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Row>

          {modo === 'editar' ?
            <Form.Item className={styled.Button} >
              <Row><Button type="primary" htmlType='submit' size='large' danger style={{ marginRight: '3rem' }} onClick={() => handleDelete()}>Deletar</Button>
                <Button type="primary" size='large' onClick={() => handleEdit()}>Enviar</Button></Row>
            </Form.Item>
            :
            <Form.Item className={styled.Button} >
              <Button type="primary" htmlType='submit' size='large' onClick={() => handleEnviar()}>Enviar</Button>
            </Form.Item>
          }
        </Form>
      </>
    )
  } else {
    return (
      <>
        <Title className={styled.Titulo}>Empresa</Title>
        <Form
          layout="vertical"
          onSubmit={() => handleEnviar()}>
          <Form.Item label="Nome" required tooltip="nome da empresa"
            className={styled.AtivosInput}>
            <Input placeholder="Exemplo: Empresa Teste"
              value={name}
              onChange={(event) => setName(event.target.value)} />
          </Form.Item>

          {modo === 'editar' ?
          <Form.Item className={styled.Button} >
          <Row><Button type="primary" htmlType='submit' size='large' danger style={{ marginRight: '3rem' }} onClick={() => handleDelete()}>Deletar</Button>
            <Button type="primary" size='large' onClick={() => handleEdit()}>Enviar</Button></Row>
        </Form.Item>
        :
        <Form.Item className={styled.Button} >
          <Button type="primary" htmlType='submit' size='large' onClick={() => handleEnviar()}>Enviar</Button>
        </Form.Item>
          }
        </Form>
      </>
    )
  }
}

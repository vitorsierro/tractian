import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../Contexts/tractian";
import { Form, Input, Button, Select, Row, Typography } from 'antd';
import { criar, atualizar, deletar, pegarUm } from '../../../api/api';
import styled from "../../../styles/other.module.css"
import { useNavigate } from "react-router-dom";

export default function Users({ modo }) {
  const global = useContext(GlobalContext);
  const companies = global.companies;
  const units = global.units;
  const navigate = useNavigate();
  const { Option } = Select;
  const { Title } = Typography;
  //Inputs dados
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [unitId, setUnitId] = useState();
  const [companyId, setCompanyId] = useState();
  const [dados, setDados] = useState({});
  const id = global.id;
  var formulario;

  useEffect(() => {
    if (modo === 'editar' && id !== undefined) {
      pegarUm(setDados, "users", id)
    }
  }, [id])

  useEffect(() => {
    if (modo === 'editar' && id !== undefined) {
      setEmail(dados.email);
      setName(dados.name);
      setUnitId(dados.unitId);
      setCompanyId(dados.CompanyId);
    }
  }, [dados]);

  function handleEnviar() {
    formulario = {
      "email": email,
      "name": name,
      "unitId": unitId,
      "companyId": companyId
    };
    criar(`/users`, formulario);
    setDados({})
    global.clearUsers();
    navigate('/');  
  }
  
  function handleEdit() {
    formulario = {
      "id": id,
      "email": email,
      "name": name,
      "unitId": unitId,
      "companyId": companyId
    };
    atualizar(`users/${id}`, formulario);
    setDados({})
    global.clearUsers();
    navigate('/')
  }

  function handleDelete() {
    deletar(`/users/${id}`)
    setDados({})
    global.clearUsers();
    navigate('/');
  }

  return (
    <div>
      <Title className={styled.Titulo}>Usuário</Title>
      <Form
        layout="vertical"
        onSubmit={() => handleEnviar()}>
        <Form.Item label="Email" required tooltip="nome do email"
          className={styled.AtivosInput}>
          <Input placeholder="Exemplo: teste@teste.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)} />
        </Form.Item>
        <Form.Item label="Nome" required tooltip="nome do usuario"
          className={styled.AtivosInput}>
          <Input placeholder="Exemplo: Teste"
            value={name}
            onChange={(event) => setName(event.target.value)} />
        </Form.Item>
        <hr className={styled.Hr} />
        <Row style={{ marginTop: 10 }}>
          <Form.Item label="Qual a unidade" required tooltip="Unidade a qual o usuario se encontra" className={styled.AtivosInput}>
            <Select defaultValue=""
              value={unitId}
              onChange={(value) => (setUnitId(value))}>
              <Option value=""></Option>
              {units.length !== undefined ? units.map((unit) => (
                <Option value={unit.id} key={unit.id}>{unit.name}</Option>
              )) : null}
            </Select>
          </Form.Item>
          <Form.Item label="Qual a Empresa" required tooltip="Empresa a qual o usuario se encontra" className={styled.AtivosInput}>
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
    </div>
  )
}

import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  BarChartOutlined,
  DiffOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useContext, useState } from 'react';
import { GlobalContext } from '../../Contexts/tractian';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function SideBar() {
  const global = useContext(GlobalContext);
  const users = global.users;
  const companies = global.companies;
  const units = global.units;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false)

  function onCollapse(){
    setCollapsed(!collapsed);
  }
  function handleUser(id){
    global.adicionarId(id);
    navigate(`/edit/users/${id}`);
  }
  function handleUnits(id){
    global.adicionarId(id);
    navigate(`/edit/units/${id}`);
  }
  function handleCompanies(id){
    global.adicionarId(id);
    navigate(`/edit/companies/${id}`);
  }
  
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div style={{marginTop: '1rem'}}>
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1" icon={<DesktopOutlined />} onClick={() => (navigate("/"))}>
          Dados Gerais
    </Menu.Item>
        <Menu.Item key="2" icon={<BarChartOutlined />} onClick={() => (navigate("/grafics"))}>
          Graficos
    </Menu.Item>
        <SubMenu key="sub1" icon={<DiffOutlined />} title="Adicionar">
          <Menu.Item key="3" onClick={() => (navigate("/adicionar/assets"))}>Ativos</Menu.Item>
          <Menu.Item key="4" onClick={() => (navigate("/adicionar/users"))}>Usuarios</Menu.Item>
          <Menu.Item key="5" onClick={() => (navigate("/adicionar/units"))}>Unidades</Menu.Item>
          <Menu.Item key="6" onClick={() => (navigate("/adicionar/companies"))}>Empresa</Menu.Item>
        </SubMenu>
        
        <SubMenu key="sub2" icon={<UserOutlined />} title="Usuarios">
          {users.length !== undefined ? users.map(({ name, id }) => (
            <Menu.Item key={name} onClick={() => (handleUser(id))}>{name} 
            </Menu.Item>
          )) : null}
  
        </SubMenu>
  
        <SubMenu key="sub3" icon={<TeamOutlined />} title="Unidades">
          {units.length !== undefined ? units.map(({ name, id }) => (
            <Menu.Item key={name} onClick={() => (handleUnits(id))}>{name} 
            </Menu.Item>
          )) : null}
        </SubMenu>
  
        <SubMenu key="sub4" icon={<TeamOutlined />} title="Empresas">
          {companies.length !== undefined ? companies.map(({ name, id }) => (
            <Menu.Item key={name} onClick={() => (handleCompanies(id))}>{name} 
            </Menu.Item>)
          ) : null}
        </SubMenu>
      </Menu>
      </div>
    </Sider>
  )
};

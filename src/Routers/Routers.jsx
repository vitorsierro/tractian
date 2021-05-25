import { Routes, Route } from 'react-router-dom';
import Crud from '../Pages/Crud/Crud'
import DadosGerais from '../Pages/DadosGerais/DadosGerais';
import Graficos from '../Pages/Graficos/Graficos';
export default function Routers() {
  return (
    <Routes>
      <Route path="/" exact element={<DadosGerais />} />
      <Route path="/grafics"  element={<Graficos />} />
      {/*Adicionar*/}
      <Route path="/adicionar/assets" 
        element={<Crud modo={'adicionar'} name={"assets"} />} />
        
      <Route path="/adicionar/users" 
      element={<Crud modo={'adicionar'} name={"users"} />} />
      
      <Route path="/adicionar/units" 
      element={<Crud modo={'adicionar'} name={"units"} />} />
      
      <Route path="/adicionar/companies" 
      element={<Crud modo={'adicionar'} name={"companies"} />} />
      
      {/* Edit */}
      <Route path={`/edit/assets/:id`} 
        element={<Crud modo={'editar'} name={"assets"} />} />
        
      <Route path={`/edit/users/:id`}
        element={<Crud modo={'editar'} name={"users"} />} />
      
      <Route path={`/edit/units/:id`}
      element={<Crud modo={'editar'} name={"units"} />} />
      
      <Route path={`/edit/companies/:id`} 
      element={<Crud modo={'editar'} name={"companies"} />} />
    </Routes>
  )
};

import React, { createContext, useEffect, useState } from 'react'
import { pegarTudo } from '../api/api';

export const GlobalContext = createContext();

export function TractianContext({children}){
  const [ativos, setAtivos] = useState({})
  const [users, setUsers] = useState({})
  const [units, setUnits] = useState({})
  const [companies, setCompanies] = useState({})
  const [mudou, setMudou] = useState(false)
  const [id, setId] = useState()
  var location = window.location.pathname.split("/")[3];

  useEffect(() => {
    location !== undefined &&  setId(location);
  }, [location])
  
  useEffect(() => {
    pegarTudo(setAtivos, '/assets')
    pegarTudo(setUsers, '/users')
    pegarTudo(setUnits, '/units')
    pegarTudo(setCompanies, '/companies')    
  }, [mudou]);
  
  function adicionarId(id){
    setId(id)
  }
  function clearAtivos(){setAtivos({}); setMudou(!mudou); }
  function clearUsers(){ setUsers({});  setMudou(!mudou);}
  function clearUnits(){ setUnits({});  setMudou(!mudou);}
  function clearCompanies(){ setCompanies({});  setMudou(!mudou);}
  
  return (
    <GlobalContext.Provider value={{ativos, users, units, companies, id, clearAtivos, clearUsers, clearUnits, clearCompanies, adicionarId}}>
        {children }
    </GlobalContext.Provider>
  ) 
}
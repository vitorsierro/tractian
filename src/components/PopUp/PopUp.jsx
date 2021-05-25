import { Button, Modal } from "antd";
import React, { useEffect, useState } from 'react';
import { pegarUm } from "../../api/api";
export default function PopUp({modo,  especifies, id}) {
  const [ modalVisible, setModalVisible] = useState(false)
  const [ ativo, setAtivo] = useState({})
  const specifications = ativo.specifications;
  const metrics = ativo.metrics
  useEffect(() => {
    return pegarUm(setAtivo, '/assets', id);
  }, [id]);
 
  if (ativo.id !== undefined){
    return(
      <>
      <Button type="text" style={{background:'none', fontSize:'3rem', bottom:'1rem'}}onClick={() => setModalVisible(true)}  >
        { especifies }
      </Button>
        <Modal
          title={modo === "especifies" ? "Especificações" : "Metricas"}
          centered
          visible={ modalVisible }
          onOk={() => setModalVisible(false)}
          onCancel={() => setModalVisible(false)}
        >     
        { modo === "especifies" ? 
            <div>
              <h2>Especificações Maximo Tempo:</h2>
              <p>{specifications.maxTemp !== undefined ?specifications.maxTemp : " - " }</p>
              <h2>Especificações Power:</h2>
              <p>{specifications.power === undefined ? " - " 
                  : specifications.power}</p>
              <h2>Especificações RPM:</h2>
              <p>{specifications.rpm === undefined ? " - " 
                  : specifications.rpm}</p>
            </div>
          : 
            <div>
              <h2>Metricas Ultimo tempo:</h2>
              <p>{metrics.lastUptimeAt === undefined ? " - " 
              : metrics.lastUptimeAt}</p>
              <h2>Metricas total de tempo coletado:</h2>
              <p>{metrics.totalCollectsUptime === undefined ? " - "  : metrics.totalCollectsUptime }</p>
              <h2>Metricas total de tempo:</h2>
              <p>{metrics.totalUptime === undefined ? " - " 
              : metrics.totalUptime }</p> 
            </div>
        }
        </Modal>
    </>
  ) } else { return (
    <Button type="text" onClick={() => setModalVisible(true)}>
      { especifies }
    </Button>
  )}
};

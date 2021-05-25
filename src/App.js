import { Layout } from 'antd';
import SideBar from "./components/SideBar/SideBar";
import { TractianContext } from "./Contexts/tractian";
import Routers from './Routers/Routers';

function App() {
  return (
    <TractianContext>
      <Layout style={{ minHeight: '100vh' }}>
          <SideBar />
        <Layout>
          <Routers />
        </Layout>
      </Layout>
    </TractianContext>
  );
}

export default App;

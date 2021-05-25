import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import 'antd/dist/antd.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
    </BrowserRouter>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import { ProvideAuth } from './services/use-auth';
import {ProvideService} from './services/use-service'
import 'semantic-ui-less/semantic.less'
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <ProvideAuth>
      <ProvideService>
        <App/>
      </ProvideService>
    </ProvideAuth>
  </BrowserRouter>,
  document.getElementById('root')
);


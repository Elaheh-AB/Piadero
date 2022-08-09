import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {Auth0Provider} from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENTID
const audience= process.env.AUDIENCE
const scope= process.env.SCOPE
const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(clientId+"cli");
root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    audience={audience}
    scope={scope}
  >
    <App />
  </Auth0Provider>,
);

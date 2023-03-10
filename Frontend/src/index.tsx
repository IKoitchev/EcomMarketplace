import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react';
import history from './utils/history';
import { getConfig } from './config/config';
import NavBar from './Components/NavBar/Navbar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const onRedirectCallback = (appState: any) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};
const config = getConfig();

const providerConfig: Auth0ProviderOptions = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: window.location.origin,
  useRefreshTokens: true,
  cacheLocation: 'localstorage',
  onRedirectCallback,
};
root.render(
  <Auth0Provider {...providerConfig}>
    <App />
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

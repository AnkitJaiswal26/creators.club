import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CrowdFundingContextProvider } from './contexts/ContentContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <CrowdFundingContextProvider>
        <App />
      </CrowdFundingContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
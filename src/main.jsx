import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthProvider.jsx'
import { HelmetProvider } from 'react-helmet-async'
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// Configure NProgress
NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.1 });

// Global Axios Interceptors for Progress Bar
axios.interceptors.request.use((config) => {
    NProgress.start();
    return config;
}, (error) => {
    NProgress.done();
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    NProgress.done();
    return response;
}, (error) => {
    NProgress.done();
    return Promise.reject(error);
});

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </AuthProvider>
  </BrowserRouter>,
)
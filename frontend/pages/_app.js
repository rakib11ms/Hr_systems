import '../styles/globals.css'
import Script from "next/script";
import Head from "next/head";
import axios from 'axios';
import { useState, useEffect } from 'react';

import Router from 'next/router';

axios.defaults.baseURL = 'http://localhost:9000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

// Add request interceptor to include the token in headers
// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Add response interceptor to handle token errors
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle token expiration or invalid token error
      // You can redirect to the login page or perform other actions
      // ...
    }
    return Promise.reject(error);
  }
);
function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  const handleRouteChangeStart = () => {
    setLoading(true);
  };

  const handleRouteChangeComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', handleRouteChangeStart);
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);
    Router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart);
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
      Router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, []);

  return (
    <>

      <div>
        {loading ? (
          // Render your loader component here
          <div className=''>Loading...</div>
        ) : (
          // Render the actual page component when not loading
          <Component {...pageProps} />
        )}
      </div>    </>)
}

export default MyApp

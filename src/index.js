import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { getDoctors } from './features/doctor/doctorSlice';

store.dispatch( getDoctors() );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={ store }>
    <Router>
      <Routes>
        <Route path='/*' element={ <App /> } />
      </Routes>
    </Router>
  </Provider>
);

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.baseURL = 'https://group-prop-backend.onrender.com';

createRoot(document.getElementById('root')).render(<App />);

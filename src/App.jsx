import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '../public/css/all.css'
import '../public/js/jquery.js'
import '../public/js/swal.js'
import Home from './components/Home';
import { Route, Router, Routes } from 'react-router-dom';
import PageNotFound from './components/errors/not_found';

function App() {
  return (

    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<Home />} />
    </Routes>

  );
}

export default App

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NotesPage from './Pages/NotesPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';



function App() {
  return (
    <Router>
      <nav className='navMenu'>
      <ul>
      <li><button className='link'><Link to="/">Notatki</Link></button></li>
      <li><button className='link'><Link to="/login">Logowanie</Link></button></li>
      <li><button className='link'><Link to="/register">Rejestracja</Link></button></li>
      </ul>
      </nav>
      <Routes>
        <Route path="/" element={<NotesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
    </Routes>
  </Router>
  );  
}

export default App;
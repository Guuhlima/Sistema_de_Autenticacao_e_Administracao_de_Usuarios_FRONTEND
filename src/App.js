import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import RecuperarSenha from './components/RecuperarSenha';
import Usuarios from './components/Usuarios';
import Logs from './components/Logs';
import Permissoes from './components/Permissoes';
import PrivateRoute from './components/PrivateRoute';
import AccessDenied from './components/AccessDenied';
import MudarSenha from './components/MudarSenha';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recuperarsenha" element={<RecuperarSenha />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mudarsenha" element={<MudarSenha />} />

        <Route
          path="/usuarios"
          element={
            <PrivateRoute permissionsRequired={1}>
              <Usuarios />
            </PrivateRoute>
          }
        />

        <Route
          path="/permissoes"
          element={
            <PrivateRoute permissionsRequired={1}>
              <Permissoes />
            </PrivateRoute>
          }
        />

        <Route
          path="/logs"
          element={
            <PrivateRoute permissionsRequired={1}>
              <Logs />
            </PrivateRoute>
          }
        />
        
        <Route path="/access-denied" element={<AccessDenied />} />
      </Routes>
    </Router>
  );
};

export default App;

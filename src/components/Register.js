import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!nome || !email || !senha) {
      setErrorMessage("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const res = await fetch('http://127.0.0.1:8000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await res.json();
      if (res.status === 200) {
        navigate('/');
      } else {
        setErrorMessage(data.detail || "Erro ao registrar.");
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      setErrorMessage("Erro na conexão com o servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Registrar</h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label htmlFor="nome-register" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              id="nome-register"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email-register" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email-register"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="senha-register" className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              id="senha-register"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Registrar
          </button>
          {errorMessage && (
            <p className="text-sm text-red-600 text-center mt-3">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;

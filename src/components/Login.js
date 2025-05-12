import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!email || !senha) {
      setErrorMessage("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const res = await fetch('http://127.0.0.1:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (res.status === 200) {
        const token = data.access_token;
        const userId = data.id;

        if (!token || !userId) {
          setErrorMessage("Token ou ID do usuário não fornecido pela API.");
          return;
        }

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        const permissionsRes = await fetch(`http://127.0.0.1:8000/auth/usuarios/${userId}/permissoes`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const permissionsData = await permissionsRes.json();

        if (permissionsRes.status === 200) {
          localStorage.setItem("permissions", JSON.stringify(permissionsData.permissoes));
          navigate('/dashboard');
        } else {
          console.error('Erro ao obter permissões:', permissionsData);
          setErrorMessage('Erro ao obter permissões do usuário.');
        }

      } else {
        setErrorMessage(data.detail || "Erro ao realizar login.");
      }
    } catch (error) {
      console.error("Erro ao realizar o login:", error);
      setErrorMessage("Erro na conexão com o servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email-login" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email-login"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password-login" className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              id="password-login"
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
            Entrar
          </button>
          {errorMessage && (
            <p className="text-sm text-red-600 text-center mt-3">{errorMessage}</p>
          )}
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Registre-se aqui
            </Link>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <Link to="/recuperarsenha" className="text-indigo-600 hover:underline">
              Esqueceu a senha?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

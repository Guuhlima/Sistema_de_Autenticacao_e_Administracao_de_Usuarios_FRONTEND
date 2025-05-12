import React, { useState } from 'react';

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [message, setMessage] = useState('');

  const API = "http://127.0.0.1:8000";

  const solicitarToken = async () => {
    try {
      const res = await fetch(`${API}/senha/recuperar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setMessage(data.token ? "Token gerado: " + data.token : data.detail);
    } catch (error) {
      console.error("Erro ao solicitar token:", error);
      setMessage("Erro ao solicitar token.");
    }
  };

  const redefinirSenha = async () => {
    try {
      const res = await fetch(`${API}/senha/redefinir`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, nova_senha: novaSenha })
      });
      const data = await res.json();
      alert(data.mensagem || data.detail);
      if (res.ok) window.location.href = "/";
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      alert("Erro ao redefinir senha.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Recuperar Senha</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
        />
        <button
          onClick={solicitarToken}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg"
        >
          Gerar Token
        </button>
        <p className="text-center mt-4 text-sm text-green-600">{message}</p>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
          />
          <input
            type="password"
            placeholder="Nova senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
          />
          <button
            onClick={redefinirSenha}
            className="w-full bg-green-600 text-white py-2 rounded-lg"
          >
            Redefinir
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecuperarSenha;

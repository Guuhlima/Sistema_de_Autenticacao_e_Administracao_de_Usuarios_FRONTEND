import React, { useEffect, useState } from 'react';

const API = 'http://localhost:8000';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarLogs();
  }, []);

  async function carregarLogs() {
    try {
      const response = await fetch(`${API}/logs`);
      if (!response.ok) throw new Error("Erro ao buscar logs");

      const logsData = await response.json();
      setLogs(logsData);
    } catch (error) {
      setError("Erro ao carregar logs");
      console.error(error);
    }
  }

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    console.log("Usuário deslogado!");
    window.location.href = "/";
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <nav className="bg-indigo-600 p-4 text-white mb-6">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <a href="/dashboard" className="text-2xl font-semibold mb-2 md:mb-0">Dashboard</a>
          <div className="flex flex-wrap gap-4 items-center">
            <a href="/usuarios" className="hover:underline">Usuários</a>
            <a href="/permissoes" className="hover:underline">Permissões</a>
            <a href="/logs" className="hover:underline font-bold">Logs</a>
            {/* <a href="/mudarsenha" className="hover:underline">Redefinir Senha</a> */}
            <button onClick={logoutUser} className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700">
              Sair
            </button>
          </div>
        </div>
      </nav>

      <h1 className="text-3xl font-bold mb-6">Logs de Atividade</h1>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Usuário ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Ação</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">IP</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center text-gray-500">Nenhum log encontrado</td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id}>
                  <td className="px-4 py-2 text-sm">{log.id}</td>
                  <td className="px-4 py-2 text-sm">{log.usuario_id}</td>
                  <td className="px-4 py-2 text-sm">{log.tipo_evento}</td>
                  <td className="px-4 py-2 text-sm">{log.ip_origem}</td>
                  <td className="px-4 py-2 text-sm">{new Date(log.data_evento).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Logs;

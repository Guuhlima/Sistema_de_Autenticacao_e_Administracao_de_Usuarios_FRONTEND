import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState('Carregando informações...');
  const [permissions, setPermissions] = useState([]);
  const [hasAdminPermission, setHasAdminPermission] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      return;
    }

    fetch(`http://127.0.0.1:8000/auth/usuarios/${userId}/permissoes`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.permissoes) {
          localStorage.setItem("permissions", JSON.stringify(data.permissoes));
          setPermissions(data.permissoes);
          setUserInfo('Bem-vindo!');

          const isAdmin = data.permissoes.includes(1);
          setHasAdminPermission(isAdmin);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar permissões:', error);
        window.location.href = "index.html";
      });
  }, []);  

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("permissions");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <nav className="bg-indigo-600 p-4 text-white rounded-md shadow-md mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/dashboard" className="text-2xl font-semibold">Dashboard</a>
          <div className="flex gap-6 items-center">
            {hasAdminPermission && (
              <>
                <a id="nav-usuarios" href="/usuarios" className="text-lg hover:underline">Usuários</a>
                <a id="nav-logs" href="/logs" className="text-lg hover:underline">Logs</a>
                <a id="nav-permissoes" href="/permissoes" className="text-lg hover:underline">Permissões</a>
              </>
            )}
            {/* <a href="/mudarsenha" className="text-lg hover:underline">Redefinir Senha</a> */}
            <button
              onClick={logoutUser}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Painel de Controle</h1>

        {userInfo && <p className="text-gray-600 mb-4 text-center">{userInfo}</p>}

        {hasAdminPermission && (
          <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Lista de Usuários</h3>
            <ul id="users" className="space-y-3">
              <li className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p>Nome do Usuário - Email</p>
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">Permissões de Usuário</h3>
            <ul id="permissions-list" className="space-y-3">
              {permissions.map((perm, index) => (
                <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">{perm}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

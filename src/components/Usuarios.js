import React, { useEffect, useState } from 'react';

const API = 'http://127.0.0.1:8000';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API}/auth/usuarios`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const usuariosData = await res.json();
      setUsuarios(usuariosData);
    } catch (err) {
      setError("Erro ao carregar usuários");
      console.error(err);
    }
  }

  async function atribuirPermissao(usuarioId, permissaoId) {
    const token = localStorage.getItem("token");

    if (!permissaoId) return alert("Digite o ID da permissão");

    try {
      const res = await fetch(`${API}/auth/usuarios/${usuarioId}/permissoes?permissao_id=${permissaoId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      alert(data.mensagem || "Permissão atribuída");
      carregarUsuarios();
    } catch (err) {
      alert("Erro ao atribuir permissão");
      console.error(err);
    }
  }

  async function removerPermissao(usuarioId, permissaoId) {
    const token = localStorage.getItem("token");

    if (!permissaoId) return alert("Digite o ID da permissão");

    try {
      const res = await fetch(`${API}/auth/usuarios/${usuarioId}/permissoes/${permissaoId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      alert(data.mensagem || "Permissão removida");
      carregarUsuarios();
    } catch (err) {
      alert("Erro ao remover permissão");
      console.error(err);
    }
  }

  async function excluirUsuario(usuarioId) {
    const token = localStorage.getItem("token");

    const isConfirmed = window.confirm("Tem certeza que deseja excluir este usuário?");
    if (!isConfirmed) return;

    try {
      const res = await fetch(`${API}/auth/usuarios/${usuarioId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      alert("Usuário excluído");
      carregarUsuarios();
    } catch (err) {
      alert("Erro ao excluir usuário");
      console.error(err);
    }
  }

  const logoutUser = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    console.log("Usuário deslogado!");
    window.location.href = "/";
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <nav className="bg-indigo-600 p-4 text-white rounded-md shadow-md mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/dashboard" className="text-2xl font-semibold">Dashboard</a>
          <div className="flex gap-6 items-center">
            <a href="/usuarios" className="text-lg hover:underline">Usuários</a>
            <a href="/permissoes" className="text-lg hover:underline">Permissões</a>
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
        <h1 className="text-3xl font-bold mb-6 text-center">Gestão de Usuários</h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div id="usuarios-container" className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          {usuarios.length === 0 ? (
            <p className="text-gray-600 text-center">Nenhum usuário encontrado.</p>
          ) : (
            usuarios.map((usuario) => (
              <div
                key={usuario.id}
                className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-lg">{usuario.nome}</h3>
                  <p className="text-sm text-gray-500">{usuario.email}</p>
                </div>
                <div className="space-x-2 flex items-center">
                  <input
                    type="number"
                    placeholder="ID da Permissão"
                    id={`perm-${usuario.id}`}
                    className="p-2 border border-gray-300 rounded-lg w-32"
                  />
                  <button
                    onClick={() => {
                      const permissaoId = document.getElementById(`perm-${usuario.id}`).value;
                      atribuirPermissao(usuario.id, permissaoId);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Atribuir
                  </button>
                  <button
                    onClick={() => {
                      const permissaoId = document.getElementById(`perm-${usuario.id}`).value;
                      removerPermissao(usuario.id, permissaoId);
                    }}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Remover
                  </button>
                  <button
                    onClick={() => excluirUsuario(usuario.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Usuarios;

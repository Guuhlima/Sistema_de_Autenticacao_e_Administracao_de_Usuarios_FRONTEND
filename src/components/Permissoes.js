import React, { useState, useEffect } from 'react';

const API = "http://localhost:8000";
const token = localStorage.getItem("token");

const Permissoes = () => {
  const [permissoes, setPermissoes] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarPermissoes();
  }, []);

  const carregarPermissoes = async () => {
    try {
      const res = await fetch(`${API}/permissoes`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const permissoesData = await res.json();
        setPermissoes(permissoesData);
      } else {
        throw new Error("Erro ao carregar permissões");
      }
    } catch (err) {
      setError("Erro ao carregar permissões");
      console.error(err);
    }
  };

  const criarPermissao = async (e) => {
    e.preventDefault();

    if (!nome || !descricao) {
      return alert("Nome e descrição são obrigatórios.");
    }

    try {
      const res = await fetch(`${API}/permissoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ nome, descricao }),
      });

      if (res.ok) {
        setNome("");
        setDescricao("");
        carregarPermissoes();
      } else {
        const err = await res.json();
        alert(err.detail || "Erro ao criar permissão");
      }
    } catch (err) {
      alert("Erro ao criar permissão");
      console.error(err);
    }
  };

  const excluirPermissao = async (id) => {
    if (!window.confirm("Deseja realmente excluir esta permissão?")) return;

    try {
      const res = await fetch(`${API}/permissoes/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (res.status === 204) {
        carregarPermissoes();
      } else {
        alert("Erro ao excluir permissão.");
      }
    } catch (err) {
      alert("Erro ao excluir permissão");
      console.error(err);
    }
  };

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
        <h1 className="text-3xl font-bold mb-6 text-center">Gerenciar Permissões</h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form
          onSubmit={criarPermissao}
          className="space-y-6 bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <div>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome da Permissão"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <input
              type="text"
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
          >
            Criar Permissão
          </button>
        </form>

        <ul className="space-y-4">
          {permissoes.length === 0 ? (
            <p className="text-gray-600 text-center">Nenhuma permissão encontrada.</p>
          ) : (
            permissoes.map((permissao) => (
              <li
                key={permissao.id}
                className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-lg">{permissao.nome}</h3>
                  <p className="text-gray-600">{permissao.descricao}</p>
                </div>
                <button
                  onClick={() => excluirPermissao(permissao.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-500"
                >
                  Excluir
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Permissoes;

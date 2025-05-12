import React, { useState } from 'react';

const MudarSenha = () => {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagemSucesso('');

    if (novaSenha !== confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/mudar-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senha_atual: senhaAtual,
          nova_senha: novaSenha,
        }),
      });

      if (!response.ok) throw new Error('Erro ao alterar a senha');

      const data = await response.json();
      setMensagemSucesso(data.mensagem || 'Senha alterada com sucesso!');
    } catch (error) {
      setErro('Falha ao mudar a senha. Tente novamente.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <nav className="bg-indigo-600 p-4 text-white mb-6">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <a href="/dashboard" className="text-2xl font-semibold mb-2 md:mb-0">Dashboard</a>
          <div className="flex flex-wrap gap-4 items-center">
            <a href="/usuarios" className="hover:underline">Usuários</a>
            <a href="/permissoes" className="hover:underline">Permissões</a>
            <a href="/logs" className="hover:underline">Logs</a>
            {/* <a href="/mudarsenha" className="hover:underline font-bold">Redefinir Senha</a> */}
            <button onClick={() => window.location.href = "/"} className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700">
              Sair
            </button>
          </div>
        </div>
      </nav>

      <h1 className="text-3xl font-bold mb-6">Mudar Senha</h1>

      {erro && <p className="text-red-500 mb-4 text-center">{erro}</p>}
      {mensagemSucesso && <p className="text-green-500 mb-4 text-center">{mensagemSucesso}</p>}

      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="senha-atual" className="block text-sm font-medium text-gray-700">Senha Atual</label>
            <input
              id="senha-atual"
              type="password"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nova-senha" className="block text-sm font-medium text-gray-700">Nova Senha</label>
            <input
              id="nova-senha"
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmar-senha" className="block text-sm font-medium text-gray-700">Confirmar Nova Senha</label>
            <input
              id="confirmar-senha"
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
            Alterar Senha
          </button>
        </form>
      </div>
    </div>
  );
};

export default MudarSenha;

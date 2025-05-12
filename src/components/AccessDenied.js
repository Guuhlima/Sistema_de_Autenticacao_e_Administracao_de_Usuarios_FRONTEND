import React from 'react';

const AccessDenied = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-red-600">Acesso Negado</h1>
        <p className="mt-2 text-gray-600">Você não tem permissão para acessar esta página.</p>
      </div>
    </div>
  );
};

export default AccessDenied;

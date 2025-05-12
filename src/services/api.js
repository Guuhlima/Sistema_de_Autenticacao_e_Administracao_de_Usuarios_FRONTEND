const API = 'http://127.0.0.1:8000';

export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha: password })
    });

    const data = await res.json();

    if (res.status === 200) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user_id", data.id);

      const usuario_id = data.id;

      const permissionsRes = await fetch(`${API}/auth/usuarios/${usuario_id}/permissoes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.access_token}`
        }
      });

      const permissionsData = await permissionsRes.json();

      if (permissionsRes.status === 200) {
        localStorage.setItem("permissions", JSON.stringify(permissionsData.permissoes));
        return true;
      } else {
        throw new Error("Erro ao carregar permissões.");
      }
    } else {
      throw new Error(data.detail || "Erro ao realizar login.");
    }
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
};

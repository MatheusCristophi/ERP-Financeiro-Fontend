import type { AuthType } from "../types/AuthType";

const baseUrl = import.meta.env.VITE_API_URL;

// Autenticação do usuário

export async function login(authBody: AuthType) {

    const response = await fetch(baseUrl + 'auth', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            cnpj: authBody.cnpj,
            email: authBody.email,
            senha: authBody.senha
        })
    })

    if (!response.ok) {
        throw new Error(response.status === 401 ? 'Dados inválidos' : 'Erro ao fazer login')
    }
}

export async function buscarSessao() {
    const response = await fetch(baseUrl + 'auth/me', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) {
        throw new Error('Erro ao buscar sessão')
    }

    const data = await response.json();

    localStorage.setItem('nome' , data.nome)
    localStorage.setItem('role' , data.role)
    localStorage.setItem('empresaId', data.empresaId)

    return data;
}

export async function logout() {
    const response = await fetch('' + baseUrl + 'auth/logout', {
        method: 'POST',
        credentials: 'include'    
    })

    if (!response.ok) {
        throw new Error('Erro ao fazer logout')
    }

    localStorage.clear();
    sessionStorage.clear();

    window.location.href = '/login'
}

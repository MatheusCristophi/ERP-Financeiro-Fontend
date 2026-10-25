import type { AuthType } from "../types/AuthType";

const baseUrl = import.meta.env.VITE_API_URL;

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
        credentials: 'include'
    })

    if (!response.ok) {
        throw new Error('Erro ao buscar sessão')
    }
}

export async function logout() {
    const response = await fetch('' + baseUrl + 'auth/logout', {
        method: 'POST',
        credentials: 'include'    
    })

    if (!response.ok) {
        throw new Error('Erro ao fazer logout')
    }

    window.location.href = '/login'
}
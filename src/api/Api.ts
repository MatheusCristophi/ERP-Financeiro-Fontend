import type { AuthType } from "../types/AuthType";

const baseUrl = import.meta.env.VITE_API_URL;

function getHeaders(contentType = 'application/json') {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {
        'Content-Type': contentType
    }

    if(token) {
        const user = JSON.parse(token);
        const tokenV = user.token;
        headers['Authorization'] = `Bearer ${tokenV}`
    }

    return headers;
}

function logoutUser() {
    localStorage.clear();

    window.location.href = "http://localhost:5173/login"
}

export async function login(authBody: AuthType) {
    try {
        const response = await fetch(baseUrl + 'auth', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({
                cnpj: authBody.cnpj,
                email: authBody.email,
                senha: authBody.senha
            })
        })

        if(!response.ok) {
            throw new Error(`Error: ${response.status}: ${response.statusText}`)
        }
        const data = await response.json()

        localStorage.setItem('user', JSON.stringify({
            'email' : data.email,
            'token': data.token,
            'name' : data.name
        }));

        window.location.href = 'http://localhost:5173/main'

    } catch (err) {
        throw err
    }
}
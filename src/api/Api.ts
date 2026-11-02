import type { AccountType } from "../types/AccountType";
import type { AuthType } from "../types/AuthType";

const baseUrl = import.meta.env.VITE_API_URL;

// ==========================================
// Autenticação do usuário
// ==========================================

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
    const response = await fetch(baseUrl + 'auth/logout', {
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

// ==========================================
// Chamadas da Empresa
// ==========================================

export async function criarEmpresa(empresaBody: any): Promise<any> {
    const response = await fetch(baseUrl + 'empresas', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            descricao: empresaBody.descricao,
            cnpj: empresaBody.cnpj,
            empresaTiposAtividade: empresaBody.empresaTiposAtividade,
            empresaRegimeTributario: empresaBody.empresaRegimeTributario,
            empresaNaturezaPessoa: empresaBody.empresaNaturezaPessoa
        })
    })

    if (!response.ok) {
        throw new Error("Erro ao criar empresa");
    }

    return await response.json();
}

export async function buscarEmpresaAtual(): Promise<any> {
    const empresaId = localStorage.getItem('empresaId')

    const response = await fetch(baseUrl + 'empresas/' + empresaId, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    })

    if(!response.ok) {
        throw new Error("Erro ao buscar a empresa");
    }

    const data = await response.json()
    return data
}

export async function atualizarEmpresa(empresaBody: any): Promise<any> {
    const empresaId = localStorage.getItem('empresaId');

    const response = await fetch(baseUrl + 'empresas', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            descricao: empresaBody.descricao,
            cnpj: empresaBody.cnpj,
            empresaTiposAtividade: empresaBody.empresaTiposAtividade,
            empresaRegimeTributario: empresaBody.empresaRegimeTributario,
            empresaNaturezaPessoa: empresaBody.empresaNaturezaPessoa
        })
    });

    if (!response.ok) {
        throw new Error("Erro ao atualizar empresa");
    }

    return await response.json();
};

// ==========================================
// Chamadas de Conta
// ==========================================

export async function buscarContas(): Promise<any> {
    const response = await fetch(baseUrl + 'contas', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    });

    if(!response.ok) {
        throw new Error("Erro ao buscar contas");
    }
    
    const data = await response.json();
    return data;
}

export async function buscarContaPorId(id: string): Promise<any> {
    const response = await fetch(baseUrl + 'contas/' + id, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    });

    if(!response.ok) {
        throw new Error("Erro ao buscar conta por ID");
    }
    
    const data = await response.json();
    return data;
}

export async function criarConta(contaBody: AccountType): Promise<any> {
    const response = await fetch(baseUrl + 'contas', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            descricao: contaBody.descricao,
            contaTipo: contaBody.contaTipo,
            movimentacaoTipo: contaBody.movimentacaoTipo,
            numero: contaBody.numero,
            agencia: contaBody.agencia
        })
    });

    if (!response.ok) {
        throw new Error("Erro ao criar conta");
    }
    
    const data = await response.json();
    return data;
}

export async function desativarConta(id: string): Promise<any> {
    const response = await fetch(baseUrl + 'contas/' + id, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        throw new Error("Erro ao desativar conta");
    }

    return await response.json();
}

// ==========================================
// Chamadas de Lançamento
// ==========================================

export async function buscarLancamentos(): Promise<any> {
    // TODO: Completar chamada para buscar lançamentos manualmente
    return [];
}

export async function buscarLancamentoPorId(_id: string | number): Promise<any> {
    // TODO: Completar chamada para buscar lançamento por ID manualmente
    return null;
}

export async function criarLancamento(_lancamentoBody: any): Promise<any> {
    // TODO: Completar chamada para cadastrar lançamento manualmente
    return null;
}

export async function atualizarLancamento(_id: string | number, _lancamentoBody: any): Promise<any> {
    // TODO: Completar chamada para atualizar lançamento manualmente
    return null;
}

export async function deletarLancamento(_id: string | number): Promise<any> {
    // TODO: Completar chamada para deletar lançamento manualmente
    return null;
}

// ==========================================
// Chamadas de Pessoa
// ==========================================

export async function buscarPessoas(): Promise<any> {
    // TODO: Completar chamada para buscar pessoas manualmente
    return [];
}

export async function buscarPessoaPorId(_id: string | number): Promise<any> {
    // TODO: Completar chamada para buscar pessoa por ID manualmente
    return null;
}

export async function criarPessoa(_pessoaBody: any): Promise<any> {
    // TODO: Completar chamada para cadastrar pessoa manualmente
    return null;
}

export async function atualizarPessoa(_id: string | number, _pessoaBody: any): Promise<any> {
    // TODO: Completar chamada para atualizar pessoa manualmente
    return null;
}

export async function deletarPessoa(_id: string | number): Promise<any> {
    // TODO: Completar chamada para deletar pessoa manualmente
    return null;
}

// ==========================================
// Chamadas de Categoria
// ==========================================

export async function buscarCategorias(): Promise<any> {
    // TODO: Completar chamada para buscar categorias manualmente
    return [];
}

export async function buscarCategoriaPorId(_id: string | number): Promise<any> {
    // TODO: Completar chamada para buscar categoria por ID manualmente
    return null;
}

export async function criarCategoria(_categoriaBody: any): Promise<any> {
    // TODO: Completar chamada para cadastrar categoria manualmente
    return null;
}

export async function atualizarCategoria(_id: string | number, _categoriaBody: any): Promise<any> {
    // TODO: Completar chamada para atualizar categoria manualmente
    return null;
}

export async function deletarCategoria(_id: string | number): Promise<any> {
    // TODO: Completar chamada para deletar categoria manualmente
    return null;
}
import { defineStore } from "pinia";
import type { SessionType } from "../types/SessionType";
import { buscarSessao, logout } from "../api/Api";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        sessao: null as SessionType | null,
        carregada: false
    }),
    getters: {
        autenticado: (state) => state.sessao !== null,
        role: (state) => state.sessao?.role ?? null,
        ehDonoOuAdmin: (state) => ["DONO", "ADMINISTRADOR_DO_SISTEMA"].includes(state.sessao?.role ?? ""),
    },
    actions: {
        async carregarSessao() {
            try {
                const data = await buscarSessao()
                
                const session: SessionType = {
                    nome: data.nome,
                    email: data.email,
                    empresaId: data.empresaId,
                    role: data.role
                }

                this.sessao = session; 
            } catch(err) {
                this.sessao = null;
            } finally {
                this.carregada = true;
            }
      },

      async logoutSystem () {
        await logout();
        this.sessao = null;
      }
    }
})
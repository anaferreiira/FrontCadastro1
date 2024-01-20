import {set} from "@/utils/vuex"
export default {
    setAllPrestadores: (state, data) => set((state.allPrestadores = data)),
    setGrupoUsuario: (state, data) => set((state.grupoUsuario = data)),

 }
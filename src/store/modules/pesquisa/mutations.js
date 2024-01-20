import { set } from '@/utils/vuex'
export default {
	setAllPesquisas: (state, data) => set((state.allPesquisas = data)),
	setAllPesquisaCod: (state, data) => set((state.allPesquisaCod = data)),
	setItemsInLine: (state, data) => set((state.allItemInLine = data)),
	setParticularidades: (state, data) => set((state['particularidades'] = data)),
	setExcel: (state, data) => set((state['excel'] = data)),
	setUsuarioId: (state, data) => {
		state.usuarioId = data
	},
}

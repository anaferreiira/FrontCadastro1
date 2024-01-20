import pesquisa from '@/services/pesquisa'
export default {
	async getAllPesquisa({ commit, dispatch }, payload) {
		try {
			const data = await pesquisa.getAllPesquisa(payload)
		
			if (!data) {
				dispatch(
					'setSnackbar',
					{
						status: true,
						message: 'Nada encontrado',
					},
					{ root: true }
				)
			}
			commit('setAllPesquisas', data.data)
		} catch (e) {
			throw e
		}
	},
	getAllItemInLine({ commit }) {
		try {
			const { data } = pesquisa.getAllItemInLine()

			commit('setAllItemInLine', data)
		} catch (e) {
			throw e
		}
	},
	async getAllPesquisaCod({ commit,dispatch }, id) {
	
		try {
			const data = await pesquisa.getAllPesquisaCod(id)
			if (data.data.length === 0) {
				dispatch(
					'setSnackbar',
					{
						status: true,
						message: 'Nada encontrado',
					},
					{ root: true }
				)
			} else{
				
				commit('setAllPesquisaCod', data)
			}
		
		} catch (e) {
			throw e
		}
	},

	async getParticularidades({ commit }) {
		try {
			const { data } = await pesquisa.getParticularidades()
			commit('setParticularidades', data)
			return data
		} catch (e) {
			throw e
		}
	},
	async postExcel({ commit}, payload) {
	
		try {
			const { data } = await pesquisa.postExcel(payload)
			const href = `${window.location.origin}/${data}`
			window.open(href)
			commit('setExcel', data)
			} catch (e) {
			throw e
		}
	},
}

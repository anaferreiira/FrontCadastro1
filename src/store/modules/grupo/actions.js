import grupo from '@/services/grupo/index.js'
export default {
	async getPrestadores({ commit }) {
		
		try {
		
			const { data } = await grupo.getPrestadores()

			commit('setAllPrestadores', data)
			console.log(data, 'data aparece aqui')
		} catch (e) {
			throw e
		}
	},
	async getGrupoUsuario({ commit }) {
		
		try {
			const { data } = await grupo.getGrupoUsuario()
			commit('setGrupoUsuario', data)
		} catch (e) {
		
			throw e
		}
	},
	async deleteGravar({ commit }) {
		try {
			const { data } = await grupo.deletePrestador()
			commit('setDelete', data)
		} catch (e) {
			throw e
		}
	},
	async postGravar({ commit }, payload) {
		try {
			const { data } = await grupo.postUser(payload)
			commit('setAllPrestador', data)
		} catch (e) {
			throw e
		}
	},
}

import user from '@/services/user'
export default {
	async getAllUser({ commit }, nomeUsuario) {
		try {
			const { data } = await user.getAllUser(nomeUsuario)
			commit('setAllUsers', data)
		} catch (e) {
			throw e
		}
	},
	async getInserir({ commit, dispatch }, payload) {
		
		try {
			const { data } = await user.getInserir(payload)
			commit('setInserir', data)
			dispatch(
				'setSnackbar',
				{
					status: true,
					message: 'Gravação realizada com sucesso!',
				},
				{ root: true }
			)
		} catch (e) {
			dispatch(
				'setSnackbar',
				{
					status: true,
					message: 'O Usuário informado já possui Alçada cadastrada!',
				},
				{ root: true }
			)
			throw e
		}
	},

	async getExcluir({ commit, dispatch}, id) {
		console.log(id,'id');
		if(!id){
			return dispatch(
				'setSnackbar',
				{
					status: true,
					message:
						'Selecione usuário!',
				},
				{ root: true }
			)
		}
		try {
			await user.getExcluir(id)
			commit('setExcluir', id)
			dispatch(
				'setSnackbar',
				{
					status: true,
					message: 'Exclusão realizada com sucesso!',
				},
				{ root: true }
			)
		} catch (e) {
			dispatch(
				'setSnackbar',
				{
					status: true,
					message:
						'Selecione usuário!',
				},
				{ root: true }
			)
			throw e
		}
	},
}

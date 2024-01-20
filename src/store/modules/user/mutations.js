import { set } from '@/utils/vuex'
export default {
	setAllUsers: (state, data) => set((state.allUsers = data)),
	setInserir: (state, data) => set((state.inserir = data)),
	setExcluir: (state, data) => set((state.excluir = data)),
	setUserId (state, data) {state.idUserId += data},
	setUserInsert (state, data) {state.userInsert = data}
}

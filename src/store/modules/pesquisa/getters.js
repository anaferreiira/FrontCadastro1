import { get } from '@/utils/vuex'
import state from './state'
export default {
	allPesquisas: get('allPesquisas'),
	allPesquisaCod: get('allPesquisaCod'),
	allItemInLine: get('allItemsInLine'),
	particularidades: get('particularidades'),
	usuarioId: (state) => state.usuarioId
	
}

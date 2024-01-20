import { request } from '@/utils/request'
import { LocalChunkSize } from 'papaparse'
export default {
	getAllUser: payload => request.get(`Usuario/${payload}`),
	getInserir: payload => request.post(`AlcadaAcesso`,payload),
	getExcluir: (id) => request.delete(`AlcadaAcesso/${id}`),
}


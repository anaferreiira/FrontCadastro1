import { request } from "@/utils/request"
export default {
        getAllPesquisa: (payload) => request.get(`Pesquisa?IN_TAB_STATUS_ID=${0}`),
        getAllPesquisaCod: (id) => request.get(`PesquisaCod?id=${id}`),
        getParticularidades: () => request.get(`Particularidades`),
        postExcel: (payload) => request.post(`Excel`, payload),
       
}



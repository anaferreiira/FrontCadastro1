import {get} from "@/utils/vuex"
export default{
    allUsers: get("allUsers"),
    inserir: get('inserir'),
    excluir: get('excluir'),
   idUserId: (state) => state.idUserId,
   userInsert: (state) => state.userInsert
}
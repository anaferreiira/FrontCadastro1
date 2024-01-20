import { request } from "@/utils/request";

export default {
    getPrestadores: () => request.get("Grupo"), 
     getGrupoUsuario:() => request.get("/grupoUsuario")
}
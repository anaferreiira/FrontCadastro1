<template>
  <div class="container">
    <v-card class="container__card">
      <div class="container__card__box">
        <v-card-title class="container__card__box__title">
          Cadastro de Alçadas do Usuário
        </v-card-title>
        <div class="container__card__box__button">
          <v-btn @click="goTopesquisa" class="btn1" rounded outlined color="#0672b9">Pesquisar</v-btn>
          <v-btn @click="goToLigarPrestador" class="pes btn" rounded outlined color="#0672b9">Ligar Prestadores</v-btn>
        </div>
      </div>
      <v-row class="2">
        <v-col cols="4">
          <Autocomplete :clear="clear" :fnSync="queryUser" isAsync v-model="user" label="Usuário" item-text="nomeUsuario"
            item-value="usuarioId" returnObject :items="getAllUser" outlined>
          </Autocomplete>
        </v-col>
        <v-col cols="4">
          <Autocomplete :clear="clear" :fnSync="grupoUsuario" isAsync v-model="suporteSigna" :items="grupoUsuario"
            item-text="desc_grupo_usuario" item-value="grupO_USUARIO_ID" return-object label="Suporte Signa" outlined>
          </Autocomplete>
        </v-col>
        <v-switch v-model="flag" label="Audita todos os fornecedores">
        </v-switch>
      </v-row>
      <br />
      <v-btn @click="gravar" class="btna" rounded color="#349BFF">Gravar</v-btn>
      <v-btn @click="clearUser" class="btn" rounded outlined color="#0672b9">Excluir</v-btn>
      <v-btn @click="Limpar" class="btn" rounded outlined color="#0672b9">Limpar
      </v-btn>
      <v-btn @click="goToHome" class="btn" rounded outlined color="#0672b9">Voltar</v-btn>
    </v-card>
  </div>
</template>

<script>
import Autocomplete from "@/pages/Autocomplete.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "app",
  data() {
    return {
      itemInLine: {},
      user: "",
      userId: "",
      suporteSigna: "",
      flag: false,
      clear: false,
    };
  },
  components: {
    Autocomplete,
  },
  async mounted() {
    if (this.userInsert.length !== 0) {
      (this.user = this.userInsert[0]),
        (this.suporteSigna = this.userInsert[1].desc_grupo_usuario);
    }
    await this.$store.dispatch("grupo/getGrupoUsuario"),
      (this.itemInLine = this.$route.query.q);
    if (this.itemInLine) {
      (this.user = this.itemInLine),
          (this.userId = this.itemInLine.codigoId),
        (this.suporteSigna = this.itemInLine.prestador);
    }
  },
  computed: {
    ...mapGetters({
      getAllUser: "user/allUsers",
      grupoUsuario: "grupo/grupoUsuario",
      snackbarMessage: "snackbarMessage",
      loading: "loading",
      userInsert: "user/userInsert",
    }),
    filteredItems() {
      return this.getAllUsers.filter((item) =>
        item.toLowerCase().includes(this.user.toLowerCase())
      );
    },
    filteredItems() {
      return this.grupoUsuario.filter((item) =>
        item.toLowerCase().includes(this.grupoUsuario.toLowerCase())
      );
    },
  },
  methods: {
    ...mapActions({
      excluir: "user/getExcluir",
      inserir: "user/inserir",
      idUserId: "user/idUserId",
    }),
    queryUser(val) {
      this.$store.dispatch("user/idUserId", val);
    },

    goToHome() {
      this.$router.push("/");
    },
    goTopesquisa() {
      this.$router.push("/pesquisa");
    },
    async goToLigarPrestador() {
      this.$router.push({
        path: "/LigarPrestador",
        query: { q: this.itemInLine },
      });
    },
    async gravar() {
      this.$store.dispatch("setLoading", true);
      try {
        if (this.user === "" || this.suporteSigna === null) {
          this.$store.dispatch("setSnackbar", {
            status: true,
            message: "Preencha Usuario!",
          });
          this.$store.dispatch("setLoading", true);
        } else {
          const obj = {
            alcadaAcessoId: this.suporteSigna.alcadA_APROVACAO_ID,
            usuarioId: this.user.usuarioId,
            tabStatusId: this.suporteSigna.taB_STATUS_ID,
            nomeUsuario: this.user.nomeUsuario,
          };
          await this.$store.dispatch("user/getInserir", obj);
          this.reset();
          this.$store.dispatch("setLoading", false);
        }
      } catch (e) {
        this.$store.dispatch("setLoading", false);
      }
    },
    async clearUser() {
      let userId = null
      if (this.user.usuarioid) {
        userId = this.user.usuarioid
      } else {
        userId = this.user.usuarioId
      }
      await this.$store.dispatch(
        'user/getExcluir',
        userId 
      )
      this.clear = true;
      this.suporteSigna = null;
    },
    Limpar() {
      this.clear = true;
      this.suporteSigna = null;
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  &__card {
    padding: 1rem;
    color: black;

    &__box {

      display: flex;
      align-items: center;
      justify-content: space-between;

      &__title {
        margin-bottom: 1rem;
        color: #3498db;

      }

      &__button {
        width: 400px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}



.btn {
  margin-right: 8px;
}



.btna {
  margin-right: 8px;
  color: #ffffff !important;
}
</style>

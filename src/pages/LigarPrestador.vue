<template>
  <div class="container">
    <v-card class="container__card">
      <v-card-title class="container__card__title">
        Cadastro de Alçadas do Usuário - Ligar Prestadores
      </v-card-title>
      <v-row class="1">
        <v-col cols="3">
          <v-text-field v-model="codInterno" label=" Cód.Interno" outlined>
          </v-text-field>
        </v-col>
        <v-col cols="4">
          <Autocomplete
            :clear="clear"
            :fnSync="queryUser"
            isAsync
            v-model="user"
            label="Usuário"
            item-text="nomeUsuario"
            item-value="usuarioId"
            returnObject
            :items="getAllUser"
            outlined
          >
          </Autocomplete>
        </v-col>
        <v-col cols="">
          <v-text-field v-model="prestador" label=" Prestador" outlined>
          </v-text-field>
        </v-col>
        <v-col cols="">
          <v-autocomplete
            v-model="grupoPrestador"
            :items="getAllPrestadores"
            item-text="nome"
            item-value="grupoFornecedorId"
            return-object
            label="Grupo de Prestador"
            outlined
          >
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-card-subtitle class="container__card__subtitle">
        <font color="black"><b>Prestadores Relacionados</b></font>
      </v-card-subtitle>
      <br />
      <v-data-table
        @click:row="getList2"
        :headers="headers"
        :items="getAllPesquisaCod.data"
        :search="search"
        hide-default-footer
      >
      </v-data-table>
      <v-btn @click="gravar" class="btna" rounded color="#349BFF">Gravar</v-btn>
      <v-btn @click="clearUser" class="btn" rounded outlined color="#0672b9"
        >Excluir</v-btn
      >
      <v-btn @click="Limpar" class="btn" rounded outlined color="#0672b9"
        >Limpar
      </v-btn>
      <v-btn @click="goToCadastro" class="btn" rounded outlined color="#0672b9"
        >Voltar</v-btn
      >
    </v-card>
  </div>
</template>
<script>
import Autocomplete from "@/pages/Autocomplete.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      clear: false,
      codInterno: "",
      itemInLine: {},
      user: "",
      userId: "",
      prestador: "",
      itemGetAllPrestadores: [],
      grupoPrestador: "",
      Items: {},
      search: "",
      headers: [
        {
          text: "Código",
          align: "start",
          filterable: false,
          value: "alcadA_PREST_ID",
        },
        { text: "Prestador", value: "prestador" },
        { text: "CNPJ Prestador", value: "cnpJ_PRESTADOR" },
      ],
    };
  },
  components: {
    Autocomplete,
  },
  computed: {
    ...mapGetters({
      getAllUser: "user/allUsers",
      getAllPesquisaCod: "pesquisa/allPesquisaCod",
      getAllPrestadores: "grupo/allPrestadores",
      snackbarMessage: "snackbarMessage",
      loading: "loading",
    }),
    filteredItems() {
      return this.getAllUsers.filter((item) =>
        item.toLowerCase().includes(this.user.toLowerCase())
      );
    },
  },
  async mounted() {
    this.itemInLine = this.$route.query.q;
    if (this.itemInLine) {
      (this.user = this.itemInLine.usuario),
        (this.userId = this.itemInLine.codigoId),
        (this.suporteSigna = this.itemInLine.prestador);
    }

    await this.$store.dispatch("grupo/getPrestadores"),
      await this.$store.dispatch("pesquisa/getAllPesquisaCod", this.userId);

    this.itemGetAllPrestadores = this.getAllPesquisaCod.data;
  },
  methods: {
    queryUser(val) {
      this.$store.dispatch("user/getAllUser", val);
    },
    ...mapActions({
      getAllPesquisaCod: "pesqusia/allPesquisaCod",
      getPrestadores: "grupo/getPrestadores",
      inserir: "user/inserir",
      excluir: "user/excluir",
      idUserId: "user/idUserId",
    }),
    queryUser(val) {
      this.$store.dispatch("user/idUserId", val);
    },
    ...mapMutations({
      setItemsInLine: "setItemsInLine",
    }),
    getList(item) {
      this.$store.commit("pesquisa/allPesquisa", item);
    },
    async getList2(item) {
      this.Items = item;
      this.codInterno = item.alcadA_PREST_ID;
      this.prestador = item.prestador;
    },
    goToCadastro() {
      this.$router.push("/cadastro");
    },
    async gravar() {
      {
        this.$store.dispatch("setLoading", true);
        try {
          if (
            this.user === "" ||
            this.codInterno === "" ||
            this.prestador === "" ||
            this.grupoPrestador === ""
          ) {
            this.$store.dispatch("setSnackbar", {
              status: true,
              message: "Preencha Usuario!",
            });
            this.$store.dispatch("setLoading", true);
          } else {
            const obj = {
              message: "O Usuário informado já possui Alçada cadastrada",
              user: this.user,
              grupoPrestador: this.grupoPrestador,
              codInterno: this.codInterno,
              prestador: this.prestador,
            };
            await this.$store.dispatch("user/getInserir", obj);
            this.reset();
            this.$store.dispatch("setLoading", false);
          }
        } catch (e) {
          this.$store.dispatch("setLoading", false);
        }
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
    Voltar() {
      window.location.reload();
    },
    Limpar() {
      this.clear = true;
      this.grupoUser = null;
	  this.grupoPrestador = null;
	  this.prestador = null;
	  this.codInterno = null;
    },
    coletaDados() {},
  },
};
</script>
<style lang="scss" scoped>
.container {
  &__card {
    padding: 1rem;
    color: black;

    &__title {
      margin-bottom: 1rem;
      color: #3498db;
    }
  }
}

.pes {
  position: absolute;
  right: 0%;
}

.btn {
  margin-right: 8px;
}

.btna {
  margin-right: 8px;
  color: #ffffff !important;
}
</style>

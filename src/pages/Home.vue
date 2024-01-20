<template>
  <div class="container">
    <v-card class="container__card">
      <v-card-title class="container__card__title">
        Cadastro de Alçadas do Usuário
        <v-btn
          @click="goTopesquisa"
          class="pes btn"
          rounded
          outlined
          color="#0672b9"
          >Pesquisar</v-btn
        >
      </v-card-title>
      <v-card-subtitle class="container__card__subtitle">
        <font color="black"
          ><b>Informe os dados abaixo para realizar o cadastro</b></font
        >
      </v-card-subtitle>
      <v-row class="1">
        <v-col cols="5">
          <Autocomplete
            :fnSync="queryUser"
            isAsync
            ref="autocomplete"
            no-data-text
            v-model="user"
            :clear="clear"
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
          <v-autocomplete
            v-model="grupoUser"
            :items="grupoUsuario"
            item-text="desc_grupo_usuario"
            item-value="grupO_USUARIO_ID"
            return-object
            label="Grupo Usuário"
            outlined
          >
          </v-autocomplete>
        </v-col>
        <v-switch v-model="flag" label="Audita todos os fornecedores">
        </v-switch>
      </v-row>
      <Table />
      <hr />
      <br />
      <v-btn @click="gravar" class="btna" rounded color="#349BFF">Gravar</v-btn>
      <v-btn @click="clearUser" class="btn" rounded outlined color="#0672b9"
        >Excluir</v-btn
      >
      <v-btn @click="Limpar" class="btn" rounded outlined color="#0672b9"
        >Limpar
      </v-btn>
      <v-btn @click="Voltar" class="btn" rounded outlined color="#0672b9"
        >Voltar</v-btn
      >
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
      user: [],
      flag: false,
      grupoUser: null,
      clear: false,
    };
  },
  components: {
    Autocomplete,
  },
  async mounted() {
    await this.$store.dispatch("grupo/getGrupoUsuario");
  }, 
  
  computed: {
    ...mapGetters({
      grupoUsuario: "grupo/grupoUsuario",
      getAllUser: "user/allUsers",
      snackbarMessage: "snackbarMessage",
      loading: "loading",
    }),
    filteredItems() {
      return this.getAllUsers.filter((item) =>
        item.toLowerCase().includes(this.user.toLowerCase())
      );
    },
  },
  methods: {
    ...mapActions({
      inserir: "user/inserir",
      excluir: "user/getExcluir",
    }),
    queryUser(val) {
      this.$store.dispatch("user/getAllUser", val);
    },
    goTopesquisa() {
      this.$router.push("/pesquisa");
    },
    async gravar() {
      {
        await this.$store.dispatch("setLoading", true);
        try {
          if (this.user === "" || this.grupoUser === null) {
            this.$store.dispatch("setSnackbar", {
              status: true,
              message: "Preencha Usuario!",
            });
            this.$store.dispatch("setLoading", true);
          } else {
            const obj = {
              alcadaAcessoId: this.grupoUser.alcadA_APROVACAO_ID,
              usuarioId: this.user.usuarioId,
              tabStatusId: this.grupoUser.taB_STATUS_ID,
              nomeUsuario: this.user.nomeUsuario,
            };
            const arr = [this.user, this.grupoUser];

            await this.$store.dispatch("user/getInserir", obj);
            this.$store.commit("user/setUserInsert", arr);
            this.$router.push("/cadastro");
            this.reset();
            this.$store.dispatch("setLoading", false);
           
          }
        } catch (e) {
          this.$store.dispatch("setLoading", false);
        }
      }
    },
    async clearUser() {
      await this.$store.dispatch(
        'user/getExcluir',
        this.user.usuarioId,
      )
    },
    Limpar() {
      this.clear = true;

      this.grupoUser = null;
    },
    Voltar() {
      window.location.reload();
    },
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

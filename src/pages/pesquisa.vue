<template>
	<div class="container">
		<v-card class="container__card">
			<v-card-title class="container__card__title">
				Pesquisa de Alçada do Usuário
				<v-btn
					@click="goToTableAll"
					class="pes btn"
					rounded
					outlined
					color="#0672b9"
					>Pesquisar</v-btn
				>
			</v-card-title>
			<v-card-subtitle class="container__card__subtitle">
				<font color="black"
					><b>Informe os dados abaixo para realizar a pesquisa</b></font
				>
			</v-card-subtitle>
			<v-row class="1">
				<v-col cols="4">
					<Autocomplete
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
			<hr />
			<br />
			<v-btn @click="goToHome" class="btn" rounded outlined color="#0672b9"
				>Voltar</v-btn
			>
		</v-card>
	</div>
</template>

<script>
import Autocomplete from '@/pages/Autocomplete.vue'
import { mapGetters } from 'vuex'
export default {
	name: 'app',
	data() {
		return {
			user: '',
			grupoUser: '',
			grupoPrestador: {},
		}
	},
	components: {
		Autocomplete,
	},
	async mounted() {
		await this.$store.dispatch('grupo/getPrestadores'),
			await this.$store.dispatch('grupo/getGrupoUsuario')
	},
	computed: {
		...mapGetters({
			getAllUser: 'user/allUsers',
			getAllPrestadores: 'grupo/allPrestadores',
			getAllPesquisa: 'pesquisa/allPesquisas',
			grupoUsuario: 'grupo/grupoUsuario',
		}),
		filteredItems() {
			return this.getAllUsers.filter(item =>
				item.toLowerCase().includes(this.user.toLowerCase())
			)
		},
	},
	methods: {
		queryUser(val) {
			this.$store.dispatch('user/getAllUser', val)
		},
		goToHome() {
			this.$router.push('/')
		},
		async goToTableAll() {
			await this.$store.commit('pesquisa/setUsuarioId', this.user.usuarioId)
			const obj = {
				IN_USUARIO_ID: this.user.usuarioId,
				IN_TAB_STATUS_ID: this.grupoUser.taB_STATUS_ID,
				IN_GRUPO_FORNECEDOR_ID: this.grupoPrestador.grupoFornecedorId,
				IN_Grupo_Usuario_Id: this.grupoUser.grupO_USUARIO_ID,
			}
			const res = await this.$store.dispatch('pesquisa/getAllPesquisa', obj)
			this.$router.push('/TableAll')
		},
	},
	coletaDados() {},
	Pesquisa() {
		dispatchEvent
	},
}
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
</style>

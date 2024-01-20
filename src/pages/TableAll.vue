<template>
	<div class="container">
		<v-card class="container__card">
			<v-card-title class="container__card__title">
				Pesquisa de Alçada de Acesso

				<v-btn @click="downloadExcel" class="pes btn" rounded outlined color="#0672b9">
					Visualizar em Planilha <v-icon>mdi-microsoft-excel</v-icon></v-btn>
			</v-card-title>
			<v-card-subtitle class="container__card__subtitle">
				<font color="black"><b>CRITÉRIO: Tab status ID igual a 1, Grupo de prestador igual a Signa
						Fornecedores, Grupo usuário ID igual a 1</b></font>
			</v-card-subtitle>
			<v-data-table :headers="headers" :items="items" :search="search" hide-default-footer>
				<template #item.codigoId="{ item }"><router-link @click="getList(item)"
						:to="{ path: '/cadastro', query: { q: item } }">
						{{ item.codigoId }}</router-link>
				</template>
			</v-data-table>
			<hr />

			<div>
				<v-btn @click="goTopesquisa" class="btn" rounded outlined color="#0672b9">Voltar</v-btn>
			</div>
		</v-card>
	</div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
	data() {
		return {
			teste: 1,
			search: '',
			items: [],
			headers: [
				{
					text: 'Código',
					align: 'start',
					filterable: false,
					value: 'codigoId',
				},
				{ text: 'Usuário', value: 'usuario' },
				{ text: 'Prestador', value: 'prestador' },
				{ text: 'CNPJ Prestador', value: 'cnpjprestador' },
			],
			tableFooterProps: {
				'items-per-page-text': 'Linhas por página',
				'items-per-page-all-text': 'Todos',
				'items-per-page-of-text': 'de',
			},
			auxItem: {},
			excelData: [],
		}
	},
	computed: {
		...mapGetters({

			allItemInLine: 'pesquisa/allItemInLine',
			idUserId: 'user/idUserId',
			getAllPesquisa: 'pesquisa/allPesquisas',
			usuarioId: 'pesquisa/usuarioId',
		}),
	},
	mounted() {
		const arr = this.getAllPesquisa.map(item => {
			return {
				cnpjprestador: item.cnpjprestador ? item.cnpjprestador : null,
				codigoId: item.codigoId ? item.codigoId : null,
				pesquisaCod: item.pesquisaCod ? item.pesquisaCod : null,
				prestador: item.prestador ? item.prestador : null,
				usuario: item.usuario ? item.usuario : null,
				usuarioid: item.usuarioid ? item.usuarioid : null,
			}
		})
		this.items = arr.filter(item => item.usuarioid == this.usuarioId)
	},
	methods: {
		getList(item) {
			this.$store.commit('user/setUserId', item.id)
			this.$router.push('/cadastro')
		},
		async downloadExcel() {

			const alcada = this.items.map(i => {
				return {
					codigoId: i.codigoId,
					usuario: i.usuario,
					prestador: i.prestador,
					cnpjprestador: i.cnpjprestador,
				}
			})
			const objExcel = {
				fields: alcada,
				title: 'Pesquisa de Alçada de Acesso',
				headers: this.headers.filter(item => item.userExcel ?? true),
			}
		
			await this.$store.dispatch('pesquisa/postExcel', objExcel)
		},
		goTopesquisa() {
			this.$router.push('/pesquisa')
		},
		...mapMutations({
			setItemsInLine: 'setItemsInLine',
			setUserId: 'setUserId',
		}),
	},
}
</script>
<style lang="scss" scoped>
.container {

	align-items: center;

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
	right: 4%;
}

.btn {
	margin-top: 2%;
	margin-left: 2%;
}
</style>

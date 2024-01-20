<template>
	<v-app>
		<v-main>
			<router-view />
		</v-main>
		<v-snackbar :color="snackbarColor" v-model="snackbar" @input="change">
			{{ snackbarMessage }}
		</v-snackbar>
	</v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'App',
	data: () => ({
		snackbar: false,
		snackbarColor: ''
	}),
	async mounted() {
		await this.$store.dispatch('auth/getPermissao')
	},
	computed: {
		...mapGetters({
			getSnackbar: 'snackbar',
			snackbarMessage: 'snackbarMessage',
		}),
	},
	watch: {
		getSnackbar() {
			this.snackbar = this.getSnackbar
		},
		snackbarMessage() {
			/*
			Altera a cor da snackbar dependendo da mensagem no padrão de cores 
			atuais do figma | VERDE -> SUCESSO | AMARELO -> AVISO | VERMELHO -> ERRO
			*/
			if (this.snackbarMessage === 'Gravação realizada com sucesso!'|| this.snackbarMessage === 'Exclusão realizada com sucesso!') this.snackbarColor = '#009688'
			if (this.snackbarMessage === 'Preencha Usuario!'|| this.snackbarMessage === 'Selecione usuário!'||  this.snackbarMessage === 'Preencha Código de Alçada de Acesso!') this.snackbarColor = '#FBC02D'
			if (this.snackbarMessage === 'O Usuário informado já possui Alçada cadastrada!'
			|| this.snackbarMessage === 'Preencha Código de Alçada de Acesso!'|| this.snackbarMessage === 'Nada encontrado') this.snackbarColor = '#FF0C3E'
			if (this.snackbarMessage === 'Preencha Código de Alçada de Acesso!') this.snackbarColor = '#FF0C3E'
		}
	},
	methods: {
		change() {
			this.$store.dispatch('setSnackbar', { status: false, message: '' })
		},
	},
}
</script>

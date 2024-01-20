import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import(/* webpackChunkName: "home" */ '@/pages/Home'),
	},
	{
		path: '/pesquisa',
		name: 'pesquisa',
		component: () => import(/* webpackChunkName: "home" */ '@/pages/pesquisa'),
	},
	{
		path: '/TableAll',
		name: 'tableAll',
		component: () => import(/* webpackChunkName: "home" */ '@/pages/TableAll'),
	},
	{
		path: '/Cadastro',
		name: 'Cadastro',
		component: () => import(/* webpackChunkName: "home" */ '@/pages/Cadastro'),
		props: route => ({ query: route.query.q }),
		
	},
	{
		path: '/LigarPrestador',
		name: 'LigarPrestador',
		component: () => import(/* webpackChunkName: "home" */ '@/pages/LigarPrestador'),
		props: route => ({ query: route.query.q }),
	},
	{
		path: '/Autocomplete',
		name: 'Autocomplete',
		component: () => import(/* webpackChunkName: "home" */ '@/pages/Autocomplete'),
	},
]

const router = new VueRouter({
	// mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: { name: 'element-ui-dialog' }
	},
	{
		path: '/element-ui-dialog',
		name: 'element-ui-dialog',
		component: () => import('./views/element-ui-dialog.vue')
	},
]

const router = new VueRouter({
	base: process.env.BASE_URL,
	routes
})

export default router

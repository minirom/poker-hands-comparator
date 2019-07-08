import Vue from 'vue';
import Router from 'vue-router';
import PokerGameSimulator from '@/views/PokerGameSimulator.vue';
import About from '@/views/About.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'pokerGameSimulator',
			component: PokerGameSimulator
		},
		{
			path: '/about',
			name: 'about',
			component: About
		}
	]
});

import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import cookie from 'vue-cookies';

// client pages
import Home from '../views/client/Home.vue';
import Layout from '../views/client/Layout.vue';
import Login from '../views/client/Login.vue';
import Movies from '../views/client/Movies.vue';
import Tracks from '../views/client/Tracks.vue';
import Videos from '../views/client/Videos.vue';
import Books from '../views/client/Books.vue';
import MovieDetails from '../views/client/MovieDetails.vue';
import WatchMovie from '../views/client/WatchMovie.vue';
import WatchVideo from '../views/client/WatchVideo.vue';
import Result from '../views/client/Result.vue';

// admin pages
import AdminLogin from '../views/admin/AdminLogin.vue';
import Admin from '../views/admin/Layout.vue';
import aHome from '../views/admin/pages/aHome.vue';
import aMovies from '../views/admin/pages/aMovies.vue';
import aTracks from '../views/admin/pages/aTracks.vue';
import aVideos from '../views/admin/pages/aVideos.vue';
import aBooks from '../views/admin/pages/aBooks.vue';
import aPassword from '../views/admin/pages/aPassword.vue';

import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/admin-login',
		component: AdminLogin,
	},
	{
		path: '/',
		component: Layout,
		children: [
			{ path: '', component: Home },
			{ path: 'movies', component: Movies },
			{ path: 'tracks', component: Tracks },
			{ path: 'videos', component: Videos },
			{ path: 'movies/:id', component: MovieDetails },
			{ path: 'watch/movies/:id', component: WatchMovie },
			{ path: 'watch/videos/:id', component: WatchVideo },
			{ path: 'books', component: Books },
			{ path: 'search/:id', component: Result },
		],
		// beforeEnter: (to, from, next) => {
		//   let password = cookie.get('password');

		//   axios.post('/api/client', {
		//     password
		//   })
		//   .then(res => {
		//     if (res.data.client === true) {
		//       next();
		//     } else {
		//       next('/login');
		//     }
		//   })
		// }
	},
	{
		path: '/admin',
		component: Admin,
		children: [
			{ path: '', component: aHome },
			{ path: 'movies', component: aMovies },
			{ path: 'tracks', component: aTracks },
			{ path: 'books', component: aBooks },
			{ path: 'videos', component: aVideos },
			{ path: 'password', component: aPassword },
		],
		// beforeEnter: (to, from, next) => {
		//   let password = cookie.get('adminpassword');

		//   axios.post('/adminpassword', {
		//     password
		//   })
		//     .then(res => {
		//       if (res.data.admin === true) {
		//         next();
		//       } else {
		//         next('/login');
		//       }
		//     })
		//     .catch(err => {
		//       console.log(err);
		//       next('/login');
		//     })
		// }
	},
	{
		path: '*',
		component: NotFound,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;

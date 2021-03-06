import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

const messages = {
	en: {
		login: 'Login',
		loginToContinue: 'Login to Continue',
		welcome: 'Welcome',
		movies: 'Movies',
		books: 'Kitaplar',
		videos: 'Videos',
		tracks: 'Tracks',
		popular: 'Popular',
		new: 'New',
		logout: 'Logout',
		tags: 'Tags',
		searchPlaceholder: 'Search movie, track, video, book names...',
		loadMore: 'Load More',
		sort: 'Sort',
		filter: 'Filter',
		textFilter: 'Search name',
		selectLanguage: 'Select language',
		search: 'Search',
		noResult: 'No results!',
		homePage: 'Home Page',
		recommendation: 'Recommendation',
		overview: 'Overview',
		read: 'Read',
		searchAuthor: 'Search by author name',
		adBookTitle: 'The most wanted books',
		writePassword: 'Write the password',
		adPortal: 'Millions of movies, TV shows and people to discover. Explore now.',
		passwordError: 'Password error',
		aboutBook: 'Join Today',
		adBookText: 'Discover these popular fiction titles and much more. Alibris has award winning fiction titles. Lorem ipsum dolor sit lorem ipsum.'
	},
	ru: {
		login: 'Login',
		loginToContinue: 'Login stoby prodolzat',
		welcome: 'Dobro pozalowat',
		movies: 'Filmi',
		books: 'Kitaplar',
		videos: 'Klipy',
		tracks: 'Treki',
		popular: 'Populyarnye',
		new: 'Nowye',
		logout: 'Wyyti',
		tags: 'Tegi',
		searchPlaceholder: 'Isite po imeni filmi, video, kniga...',
		loadMore: 'Zagruzi bolse',
		sort: 'Sortirowka',
		filter: 'Filtr',
		textFilter: 'Poisk po imeni',
		selectLanguage: 'Wybirite yazyk',
		search: 'Poisk',
		noResult: 'Net rezultat!',
		homePage: 'Dom',
		recommendation: 'Rekomendasiya',
		overview: 'Obzor',
		read: 'Citay',
		searchAuthor: 'Search by author name',
		adBookTitle: 'Lucsiye knigi',
		writePassword: 'Zapisite parol',
		adPortal: 'Millions of movies, TV shows and people to discover. Explore now.',
		passwordError: 'Neprawilnyy parol',
		aboutBook: 'Join',
		adBookText: 'Discover these popular fiction titles and much more. Alibris has award winning fiction titles. Lorem ipsum dolor sit lorem ipsum.'
	},
	tk: {
		login: 'Giriň',
		loginToContinue: 'Dowam etmek üçin ulgama giriň',
		welcome: 'Hoş geldiňiz!',
		movies: 'Filmler',
		books: 'Kitaplar',
		videos: 'Wideolar',
		tracks: 'Aýdymlar',
		popular: 'Meşhur',
		new: 'Täze',
		logout: 'Çykmak',
		tags: 'Tegler',
		searchPlaceholder: 'Film, aýdym, wideo we kitap atlaryny gözläň',
		loadMore: 'Dowamy',
		sort: 'Tertiple',
		filter: 'Filterle',
		textFilter: 'Ady boýunça gozlan',
		selectLanguage: 'Dil saýlaň',
		search: 'Gözle',
		noResult: 'Maglumat tapylmady!',
		homePage: 'Baş',
		recommendation: 'Maslahat berilýär',
		overview: 'Syn',
		read: 'Oka',
		searchAuthor: 'Aýdymçynyň adyna görä gözläň',
		adBookTitle: 'Täze goşulan kitaplar',
		writePassword: 'Paroly girizin',
		adPortal: 'Millions of movies, TV shows and people to discover. Explore now.',
		passwordError: 'Nädogry parol!',
		aboutBook: 'Bize yazylyn',
		adBookText: 'Discover these popular fiction titles and much more. Alibris has award winning fiction titles. Lorem ipsum dolor sit lorem ipsum.'
	}
}

export default new VueI18n({
	locale: 'tk',
	messages
});
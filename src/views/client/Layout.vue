<template>
	<v-app>
		<v-navigation-drawer
			app
      v-model="drawer"
      dark
      color="rgb(1,180,228)"
      disable-resize-watcher
    >
      <v-list
        nav
        dense
      >
      	<v-select
          :items="languages"
          :label="$t('selectLanguage')"
          dense
          outlined
          v-model="lang"
        ></v-select>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
        	<v-list-item
        		v-for="(item, i) in menuItems"
        		:key="i"
        		:to="item.route"
        		link
        	>
        		<v-list-item-icon>
        			<v-icon>{{ item.icon }}</v-icon>
        		</v-list-item-icon>
        		<v-list-item-content>
            	<v-list-item-title>{{ changeItems(item) }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
          	style="background-color:rgba(30,213,169,1)"
          	class="white--text font-weight-black"
          	elevation="0"
          	block
          	@click="goToLoginPage"
          >
            {{ $t('logout') }}
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

		<v-app-bar
			app
			height="60"
			class="dark-blue"
			dark
			fixed
			elevate-on-scroll
		>
			<v-app-bar-nav-icon
				dark
				@click="drawer = !drawer"
				class="bmdHide"
			></v-app-bar-nav-icon>

			<router-link
				to="/"
				class="mr-8"
			>
				<v-img
					src="../assets/logo.svg"
				></v-img>
			</router-link>

			<v-spacer></v-spacer>

			<v-text-field
				class="mt-7 mr-2"
				dense
				:label="$t('search')"
				type="search"
				:placeholder="searchPlaceholder"
				clearable
				outlined
				v-model="search"
				@keypress.enter="handleSearch"
			></v-text-field>

			<router-link
				v-for="(item,i) in menuItems"
				:key="i"
				class="font-weight-bold text-capitalize white--text mx-2 bsmHide"
				:to="item.route"
			>{{ changeItems(item) }}</router-link>

			<v-menu
				class="bsmHide"
				transition="slide-x-transition"
				bottom
				right
				auto
				offset-y
			>
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						class="bsmHide font-weight-bold mx-2"
						outlined
						style="background-color: rgba(3,37,65, 1);"
						elevation="0"
						dark
						v-bind="attrs"
						v-on="on"
					>
						{{ locale }}
					</v-btn>
				</template>
				<v-list>
					<v-list-item @click="change('tk')">
						<v-list-item-title>Turkmen</v-list-item-title>
					</v-list-item>
				</v-list>
				<v-list>
					<v-list-item @click="change('en')">
						<v-list-item-title>English</v-list-item-title>
					</v-list-item>
				</v-list>
				<v-list>
					<v-list-item @click="change('ru')">
						<v-list-item-title>Russian</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>

			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						class="bsmHide font-weight-bold mr-3"
						style="background-color: rgba(3,37,65, 1);"
						elevation="0"
						dark
						v-bind="attrs"
						v-on="on"
						icon
						@click="goToLoginPage"
					>
						<v-icon>mdi-logout</v-icon>
					</v-btn>
				</template>
				<span>{{ $t('logout') }}</span>
			 </v-tooltip>
		</v-app-bar>

		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
	export default{
		data() {
			return{
				drawer: false,
				locale: '',
				menuItems: [
					{
						name: 'Home',
						icon: 'mdi-home',
						route: '/',
						name_tk: 'Baş sahypa',
						name_ru: 'Dom'
					},
					{
						name: "Movies",
						route: "/movies",
						name_tk: "Filmler",
						name_ru: "Filmi",
						icon: 'mdi-movie',
					},
					{
						name: "Tracks",
						route: "/tracks",
						name_tk: "Aýdymlar",
						name_ru: "Treki",
						icon: 'mdi-music-note',
					},
					{
						name: "Videos",
						route: "/videos",
						name_tk: "Wideolar",
						name_ru: "Video",
						icon: 'mdi-video',
					},
					{
						name: "Books",
						route: "/books",
						name_tk: "Kitaplar",
						name_ru: "Knigi",
						icon: 'mdi-book',
					}
				],
				languages: ['Turkmen', 'English', 'Russian'],
				lang: 'Turkmen',
				search: '',
			}
		},
		computed: {
			searchPlaceholder() {
				if(this.$i18n.locale == 'tk'){
					return 'Film, wideo, aydym, kitap atlaryny gozlan...'
				} else if ( this.$i18n.locale == 'en'){
					return 'Search movie, video, book, track names...'
				} else {
					return 'Isite filmi, wideo, treki, knigi po nazwaniyam...'
				}
			}
		},
		watch: {
			lang(value) {
				if( value === "English" ){
					this.$root.$i18n.locale = 'en';
				} else if( value === 'Russian'){
					this.$root.$i18n.locale = 'ru'
				} else {
					this.$root.$i18n.locale = 'tk'
				}
			},
		},
		methods: {
			goToLoginPage() {
				this.$router.push('/login');
			},
			change(lang) {
				this.$root.$i18n.locale = lang;
				this.locale = this.$root.$i18n.locale;
			},
			changeItems(item) {
				if(this.$root.$i18n.locale == 'tk'){
					return item.name_tk;
				} else if (this.$root.$i18n.locale == 'en'){
					return item.name;
				} else {
					return item.name_ru
				}
			},
			handleSearch() {
				if(this.search != '' && this.search != ' ' ){
					this.$router.push(`/search/${this.search}`);
				}
			}
		},
		created() {
			this.locale = this.$root.$i18n.locale;
		}
	}
</script>

<style>
		.dark-blue{
				background-color: rgba(3,37,65, 1) !important;
		}

		a{
			text-decoration: none;
		}

		@media all and (max-width: 960px){
		.bsmHide{
			display:none !important;
		}
	}

  @media all and (min-width: 960px){
		.bmdHide{
			display:none !important;
		}
  }
</style>

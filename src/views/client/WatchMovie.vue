<template>
	<div>
		<v-row class="xHeight mr-0">
			<v-col
				cols="12"
				md="8"
			>
				<div id="movie"></div>
				<v-row cols="12">
					<v-col class="text-h6 text-md-h5 font-weight-bold d-inline-flex">{{ currentMovieTitle }}</v-col>
				</v-row>
				<v-row no-gutters class="body-2">{{ currentMovieDescription }}</v-row>
			</v-col>


			<v-col
				md="4"
				class="bsmHide rightList scrollY"
			>
				<v-row 
					v-for="(recommend, i) in recommends" 
					:key="i"
				>
					<v-col cols="6">
						<v-img 
							:src="recommend.thumbnail"
							height="340"
							width="240"
						>
							<div 
								class="d-flex align-center justify-center" 
								style="height: 100%;"
							>
								<router-link :to="'/watch/movies/' + recommend._id">
									<v-btn
										icon
										style="background-color: rgba(0,0,0, .8);"
									>
										<v-icon color="white">mdi-play</v-icon>
									</v-btn>
								</router-link>
							</div>
						</v-img>
					</v-col>
					<v-col cols="6">
						<div class="body-1 font-weight-bold">{{ movieTitle(recommend, 25) }}</div>
						<div class="body-2">{{ movieDescription(recommend, 510) }}</div>
					</v-col>
				</v-row>
			</v-col>
		</v-row>

		<v-row class="recommendMovie d-flex flex-nowrap bmdHide">
			<v-col v-for="(recommend, i) in recommends" :key="i" class="bmdHide">
				<v-img
					:src="recommend.thumbnail"
					width="180"
					height="264"
				>
					<div
						class="d-flex align-center justify-center"
						style="height: 100%; width: 100%;"
					>
						<v-btn
							icon
							style="background-color:rgba(0,0,0, .8)"
							@click="goToWatch(recommend)"
						>
							<v-icon color="white">mdi-play</v-icon>
						</v-btn>
					</div>
				</v-img>
				<div class="body-2 font-weight-bold">{{ movieTitle(recommend, 25) }}</div>
				<div class="caption">{{ movieDescription(recommend, 100) }}</div>
			</v-col>
		</v-row>
	</div>	
</template>

<script>
	import axios from 'axios'

	export default {
	  name: 'Watch',
	  data () {
	    return {
	    	movie: {},
	    	tags: [],
	    	recommends: []
	    }
	  },
	  computed: {
			currentMovieTitle() {
				let locale = this.$root.$i18n.locale;
				if(locale == 'en') {
					return this.movie.title_en;
				} else if(locale == 'ru') {
					return this.movie.title_ru;
				} else {
					return this.movie.title_tk;
				}
			},
			currentMovieDescription() {
				let locale = this.$root.$i18n.locale;
				if(locale == 'en') {
					return this.movie.description_en;
				} else if(locale == 'ru') {
					return this.movie.description_ru;
				} else {
					return this.movie.description_tk;
				}
			}
	  },
	  methods: {
	  	movieTitle(movie, s){
				if(this.$root.$i18n.locale == 'en'){
					let title = movie.title_en.length;
					if(title > s) {
						return movie.title_en.slice(0, s) + '...';
					}
					else {
						return movie.title_en;
					}
				} else if (this.$root.$i18n.locale == 'ru'){
					let title = movie.title_ru.length;
					if(title > s) {
						return movie.title_ru.slice(0, s) + '...';
					} else {
						return movie.title_ru;
					}
				} else {
					let title = movie.title_tk.length;
					if(title > s) {
						return movie.title_tk.slice(0, s) + '...';
					} else {
						return movie.title_tk;
					}
				}
			},
			movieDescription(movie, s){
				if(this.$root.$i18n.locale == 'en'){
					if(movie.description_en.length > s) {
						return movie.description_en.slice(0, s) + '...';
					} else {
						return movie.description_en;
					}
				} else if(this.$root.$i18n.locale == 'ru'){
					if(movie.description_ru.length > s) {
						return movie.description_ru.slice(0, s) + '...';
					} else {
						return movie.description_ru;
					}
				} else {
					if(movie.description_tk.length > s) {
						return movie.description_tk.slice(0, s) + '...';
					} else {
						return movie.description_tk;
					}
				}
			},
			goToWatch(movie) {
				this.$router.push(movie._id);
			}
	  },
	  created() {
	  	let id = this.$route.params.id;
	  	axios.get(`/api/movies/${id}`)
	  		.then(res => {
	  			this.movie = res.data;
	  			res.data.tags.forEach(tag => {
	  				this.tags.push(`tags=${tag}`)
	  			});

  				setTimeout(() => {
						if(screen.width <= 600) {
							let movieTag = "\<video preload=\"auto\" width=\"100%\" height=\"70%\" controlsList=\"nodownload\" controls src=\"" + this.movie.smallMovie + "\"/\>";
							document.getElementById('movie').innerHTML = movieTag;
						} else if(screen.width > 600 && screen.width < 960) {
							let movieTag = "\<video preload=\"auto\" width=\"100%\" height=\"70%\" controlsList=\"nodownload\" controls src=\"" + this.movie.mediumMovie + "\"/\>";
							document.getElementById('movie').innerHTML = movieTag;
						} else {
							let movieTag = "\<video preload=\"auto\" width=\"100%\" height=\"70%\" controlsList=\"nodownload\" controls src=\"" + this.movie.largeMovie + "\"/\>";
							document.getElementById('movie').innerHTML = movieTag;
						};
					}, 500)

	  			axios.get(`/api/movies?${this.tags.toString()}&limit=20`)
			  		.then(res => {
			  			res.data.forEach(movie => {
			  				if(this.$route.params.id != movie._id){
			  					this.recommends.push(movie);
			  				}
			  			})
			  		})
			  		.catch(err => {
			  			console.log(err);
			  		});
	  		})
	  		.catch(err => {
	  			console.log(err);
	  		});
	  }
	}
</script>

<style>
	.rightList {
		max-height: 90vh;
		overflow-y: scroll;
	}

	.recommendMovie {
		overflow-x: hidden;
		overflow-y: scroll;
	}

	.recommendMovie::-webkit-scrollbar {
	  height: 10px;
	}

	.recommendMovie::-webkit-scrollbar-track {
	  background: #f1f1f1;
	}

	.recommendMovie::-webkit-scrollbar-thumb {
		border-radius: 20px;
	  background: #999;
	}

	.recommendMovie::-webkit-scrollbar-thumb:hover {
	  background: #1ed5a9 !important;
	}

	.scrollY::-webkit-scrollbar {
	  width: 12px !important;
	}

	.scrollY::-webkit-scrollbar-track {
	  background: #f1f1f1;
	  width: 10px;
	}

	.scrollY::-webkit-scrollbar-thumb {
	  background: #999;
	  border-radius: 20px;
	}

	.scrollY::-webkit-scrollbar-thumb:hover {
	  background: #1ed5a9 !important;
	  border-radius: 20px;
	}

	@media all and (max-width: 960px) {
		.bsmHide {
			display: none;
		}
	}

	@media all and (min-width: 960px) {
		.bmdHide {
			display: none;
		}

		.xHeight {
			height: 90vh;
		}
	}
</style>
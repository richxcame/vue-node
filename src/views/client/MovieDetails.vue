<template>
	<div>
		<div :style="backgroundZ0">
			<v-row class="backgroundZ1 pa-4">
				<v-col
					cols="12"
					md="4"
					justify="center"
				>
					<center>
						<v-img
							:src="movie.thumbnail"
							height="440"
							width="300"
							class="rounded-lg"
						>
							<div
								class="d-flex align-center justify-center"
								style="height: 100%;"
							>
								<v-btn
									icon
									large
									style="background-color:rgba(0,0,0, .8)"
									:to="'/watch/movies/' + movie._id"
								>
									<v-icon
										large
										color="white"
									>mdi-play</v-icon>
								</v-btn>
							</div>
						</v-img>
					</center>
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pa-4 white--text d-flex align-center"
				>
				<div>
					<h1 class="text-h5 text-lg-h3">{{ movieTitle }}</h1>
					<!-- <p>{{ duration }}</p> -->
					<v-row class="my-5">
					<div
						style="background-color: #081c22; height:75px; width: 75px; border-radius: 50%;"
						class="d-flex align-center justify-center"
					>
						<v-progress-circular
          		:rotate="-90"
				      :value="movie.voice"
				      :color="movie.voice > 49 ? '#1ed5a9' : 'red darken-1'"
				      size="65"
				      width="5"
				    >
				    	<span class="white--text font-weight-black">{{ movie.voice }}<small><sup>%</sup></small></span>
				    </v-progress-circular>
			    </div>
			    <div class="d-flex align-center px-7">
			    	<v-rating
			    		readonly
			    		:value="voice"
			    		:color="movie.voice > 50 ? '#1ed5a9' : 'red darken-1'"
			    	></v-rating>
				  </div>
			    </v-row>
					<h3 class="font-weight-bold">{{ $t('overview') }}</h3>
					<p class="body-2">{{ description }}</p>
					</div>
				</v-col>
			</v-row>
		</div>

		<!-- <video
			:src="movie.movie"
			style="display: none !important;"
			@loadedmetadata="loaded"
			id="video"
		></video> -->

		<!-- Recommendation -->
		<div v-if="recommends.length != 0">
			<div class="text-h6 mt-7 mx-5 mb-2">{{ $t('recommendation') }}</div>
			<v-row class="bScroll d-flex flex-nowrap mb-2" no-gutters>
				<v-card
					elevation="4"
					class="ma-2"
					v-for="(recommend, i) in recommends"
					:key="i"
					width="150"
					height="220"
					@click="goToMovieDetails(recommend._id)"
				>
					<v-img
						:src="recommend.thumbnail"
						width="150"
						height="220"
					></v-img>
					<!-- <router-link
						:to="'/movies/' + recommend._id"
						class="black--text body-2 font-weight-black"
					>{{ recommendTitle(recommend) }}</router-link> -->
				</v-card>
			</v-row>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
	  name: 'MovieDetails',
	  data() {
	    return {
	    	movie: {},
	    	tags: [],
	    	recommends: [],
	    	duration: '00:00:00',
	    	voice: '',
	    }
	  },
	  computed: {
	  	backgroundZ0() {
	  		return `background-image: url(${this.movie.background_image}); background-size: cover; background-repeat: no-repeat; background-position: right -200px top;`
	  	},
	  	movieTitle() {
	  		if(this.$i18n.locale === 'en'){
	  			return this.movie.title_en;
	  		} else if(this.$root.$i18n.locale === 'ru'){
	  			return this.movie.title_ru;
	  		} else {
	  			return this.movie.title_tk;
	  		}
	  	},
	  	description() {
	  		if(this.$i18n.locale === 'en'){
	  			return this.movie.description_en;
	  		} else if(this.$root.$i18n.locale === 'ru'){
	  			return this.movie.description_ru;
	  		} else {
	  			return this.movie.description_tk;
	  		}
	  	}
	  },
	  methods: {
	  	recommendTitle(movie) {
	  		if(this.$root.$i18n.locale === 'en'){
	  			return movie.title_en;
	  		} else if(this.$root.$i18n === 'ru'){
	  			return movie.title_ru;
	  		} else {
	  			return movie.title_tk;
	  		}
	  	},
	  	loaded() {
	  		let video = document.getElementById('video');
	  		let duration = video.duration;
	  		let hours = Math.floor(duration / 3600);
	  		let minutes = Math.floor((duration - hours * 3600)/60);
	  		let seconds = Math.floor(duration - hours * 3600 - minutes * 60);
	  		this.duration = hours + ":" + minutes + ":" + seconds;
	  	},
	  	goToMovieDetails(id) {
	  		this.$router.push(`/movies/${id}`);
	  	}
	  },
	  created() {
	  	let id = this.$route.params.id;
	  	axios.get('/api/movies/' + id)
	  		.then(res => {
	  			this.movie = res.data;
	  			this.voice = res.data.voice / 20;
	  			res.data.tags.forEach(tag => {
	  				this.tags.push(`tags=${tag}`)
	  			});

	  			axios.get(`/api/movies?${this.tags.toString()}&limit=20`)
			  		.then(res => {
							res.data.forEach(movie => {
								if (movie._id != id) {
									this.recommends.push(movie);
								}
							})
			  		})
			  		.catch(err => {
			  			console.log(err);
			  		});
	  		})
	  		.catch(err => console.log(err));
	  }
	}
</script>

<style>
	.a {
		text-decoration: none;
	}

	.backgroundZ1 {
		background: linear-gradient(to bottom right, rgba(3.92%, 5.49%, 11.37%, 1.00), rgba(3.92%, 5.49%, 11.37%, 0.84));
	}

	.bScroll {
		overflow-y: scroll;
	}

	.bScroll::-webkit-scrollbar {
	  width: 1px;
	  height: 10px !important;
	}

	.bScroll::-webkit-scrollbar-track {
	  background: #f1f1f1;
	}

	.bScroll::-webkit-scrollbar-thumb {
		border-radius: 20px;
	  background: #999;
	}

	.bScroll::-webkit-scrollbar-thumb:hover {
	  background: #1ed5a9 !important;
	}
</style>

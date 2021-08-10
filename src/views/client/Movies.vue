<template>
	<div class="mx-2">
			<center><h3 class="mb-3">{{ $t('movies') }}</h3></center>
			<v-row>
				
				<v-col 
					cols="12"
					sm="6" 
					md="4"
					lg="3"
					class="px-auto"
				>
					<v-card 
						elevation="5" 
						class="rounded-lg mb-3"
					>
						<v-list>					
				      <v-list-group :value="true">
				        <template v-slot:activator>
				          <v-list-item-title class="font-weight-bold black--text">{{ $t('sort') }}</v-list-item-title>
				        </template>
				        <v-divider class="mt-1"></v-divider>
				        <div>
				        	<v-select
				        		:items="items"
					          dense
					          outlined
					          bottom
					          single-line
					          class="ma-3"
					          menu-props="offsetY"
					          v-model="select"
					          color="rgba(3,37,65, .8)"
					        ></v-select>
				        </div>
					    </v-list-group>
					  </v-list>
					</v-card>

				  <v-card 
						elevation="5" 
						class="rounded-lg"
					>
						<v-list>							
				      <v-list-group>
				        <template v-slot:activator>
				          <v-list-item-title class="font-weight-bold black--text">{{ $t('filter') }}</v-list-item-title>
				        </template>
				        <v-divider class="mt-1"></v-divider>
				        <div>
				        	<v-text-field
				        		rounded
				        		prepend-inner-icon="mdi-filter"
				        		outlined
				        		small
				        		class="mx-2 mt-2"
				        		dense
				        		color="rgba(3,37,65, .8)"
				        		clearable
				        		:placeholder="$t('textFilter')"
				        		v-model="query"
				        	></v-text-field>
				        	<v-select
					          dense
					          :items="filterItems"
					          outlined
					          bottom
					          single-line
					          class="mx-3 mb-3"
					          menu-props="offsetY"
					          v-model="language"
				        		color="rgba(3,37,65, .8)"
					        ></v-select>
				        </div>
					    </v-list-group>
					  </v-list>
					</v-card>
					<v-btn 
				  	class="rounded-lg my-5 button font-weight-bold"
				  	dark
				  	@click="handleSearch"
				  >
						{{ $t('search') }}
					</v-btn>
				</v-col>

				<v-col
					cols="12"
					sm="6"
					md="8"
					lg="9"
					v-if="noResult"
					class="d-flex justify-space-around" 
				>
					<div>
						<center>
							<v-img
								src="/uploads/images/noresult.png"
								height="350"
								width="350"
							></v-img><br>
						</center>
						<center><h2>{{ $t('noResult') }}</h2></center>
					</div>
				</v-col>

				<v-col
					cols="12"
					sm="6"
					md="8"
					lg="9"
					v-if="!clicked"
				>

					<v-row class="d-flex justify-space-around">
						<v-card
							class="ma-2 rounded-lg"
							v-for="(movie, i) in movies"
							:key="i"
							elevation="4"
							max-width="150"
							:to="goToMovieDetails(movie._id)"
						>
							<v-img
								class="rounded-lg"
								width="150"
								height="220"
								:src="movie.thumbnail"
							>
								<template v-slot:placeholder>
			            <v-row
			              class="fill-height ma-0"
			              align="center"
			              justify="center"
			            >
			              <v-progress-circular
			                indeterminate
			                color="grey lighten-5"
			              ></v-progress-circular>
			            </v-row>
			          </template>
							</v-img>
						<v-card-actions
			        class="pt-6"
			        style="position: relative;"
			      >
			        <v-btn
			          absolute
			          color="rgba(3,37,65,1)"
			          class="white--text"
			          fab
			          small
			          top
			        >
		          	<v-progress-circular
		          		:rotate="-90"
						      :value="movie.voice"
						      :color="movie.voice > 50 ? '#1ed5a9' : 'red darken-1'"

						    >
						    	<span class="white--text text-caption">{{ movie.voice }}<small><sup>%</sup></small></span>
						    </v-progress-circular>
			        </v-btn>
			      <h4>{{ movie.title_tk }}</h4>
			      </v-card-actions>
					</v-card>
						<v-btn 
							class="button white--text font-weight-bold my-2 mx-2"
							@click="loadMore"
							v-if="!last"
						>{{ $t('loadMore') }}</v-btn>
					</v-row>
				</v-col>

				<v-col
					cols="12"
					sm="6"
					md="8"
					lg="9"
					v-if="searchResult.length != 0"
				>

					<v-row class="d-flex justify-space-around">
						<v-card 
							class="ma-2 rounded-lg"
							v-for="(movie, i) in searchResult"
							:key="i"
							elevation="4"
							max-width="150"
							:to="goToMovieDetails(movie._id)"
						>
							<v-img
								class="rounded-lg"
								width="150"
								height="220"
								:src="movie.thumbnail"
							>
								<template v-slot:placeholder>
			            <v-row
			              class="fill-height ma-0"
			              align="center"
			              justify="center"
			            >
			              <v-progress-circular
			                indeterminate
			                color="grey lighten-5"
			              ></v-progress-circular>
			            </v-row>
			          </template>
								<v-btn fab icon small class="float-right">
									<v-icon small color="white">mdi-dots-vertical</v-icon>
								</v-btn>
							</v-img>
						<v-card-actions
			        class="pt-6"
			        style="position: relative;"
			      >
			        <v-btn
			          absolute
			          color="rgba(3,37,65,1)"
			          class="white--text"
			          fab
			          small
			          top
			        >
		          	<v-progress-circular
		          		:rotate="-90"
						      :value="movie.voice"
						      :color="movie.voice > 50 ? '#1ed5a9' : 'red darken-1'"

						    >
						    	<span class="white--text text-caption">{{ movie.voice }}<small><sup>%</sup></small></span>
						    </v-progress-circular>
			        </v-btn>
			      <h4>{{ movie.title_tk }}</h4>
			      </v-card-actions>
					</v-card>
						<v-btn 
							class="button white--text font-weight-bold my-2"
							@click="loadMore"
							v-if="!last"
						>{{ $t('loadMore') }}</v-btn>
					</v-row>
				</v-col>
			</v-row>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
	  name: 'Movies',
	  data() {
	    return {
	    	query: '',
	      movies: [],
	      numberMovies: 0,
	      last: false,
	      language: "Turkmen",
	    	select: "Taze gosulan",
	    	items: ["Taze gosulan", "Kop halanan"],
	    	filterItems: ["Turkmen", "English", "Russian"],
	    	searchResult: [],
	    	noResult: false,
	    	clicked: false,
	  	}
	  },
	  methods: {
	  	loadMore() {
	  		axios.get(`/api/movies?skip=${this.numberMovies}&limit=28`)
	  			.then(res => {
	  				if(res.data.length == 0){
	  					this.last = true;
	  				} else {
		  				res.data.forEach(movie => {
		  					this.movies.push(movie);
		  				})
	  				}
	  				this.numberMovies = this.numberMovies + res.data.length;
	  			})
	  			.catch(err => {
	  				console.log(err);
	  			});
	  	},
	  	handleSearch() {
	  		this.clicked = true;
	  		this.searchResult = [];
	  		this.noResult = false;
	  		if(this.select == 'Taze gosulan'){
	  			if(this.language == 'Turkmen'){
	  				axios.get(`/api/movies?title_tk=${this.query}&order=time&language=Turkmen`)
			  			.then(res => {
			  				if(res.data.length == 0) {
			  					this.noResult = !this.noResult;
			  				} else {
			  					this.searchResult = res.data;
			  				}
			  			})
			  			.catch(err => console.log(err));
	  			} else if (this.language == 'English'){
	  				axios.get(`/api/movies?title_en=${this.query}&order=time&language=English`)
			  			.then(res => {
			  				if(res.data.length == 0) {
			  					this.noResult = !this.noResult;
			  				} else {
			  					this.searchResult = res.data;
			  				}
			  			})
			  			.catch(err => console.log(err));
	  			} else {
	  				axios.get(`/api/movies?title_ru=${this.query}&order=time&language=Russian`)
			  			.then(res => {
			  				if(res.data.length == 0) {
			  					this.noResult = !this.noResult;
			  				} else {
			  					this.searchResult = res.data;
			  				}
			  			})
			  			.catch(err => console.log(err));
	  			}
	  		} else {
	  			if(this.language == 'Turkmen'){
	  				axios.get(`/api/movies?title_tk=${this.query}&order=voice`)
			  			.then(res => {
			  				if(res.data.length == 0) {
			  					this.noResult = !this.noResult;
			  				} else {
			  					this.searchResult = res.data;
			  				}
			  			})
			  			.catch(err => console.log(err));
	  			} else if (this.language == 'English'){
	  				axios.get(`/api/movies?title_en=${this.query}&order=voice`)
			  			.then(res => {
			  				if(res.data.length == 0) {
			  					this.noResult = !this.noResult;
			  				} else {
			  					this.searchResult = res.data;
			  				}
			  			})
			  			.catch(err => console.log(err));
	  			} else {
	  				axios.get(`/api/movies?title_ru=${this.query}&order=voice`)
			  			.then(res => {
			  				if(res.data.length == 0) {
			  					this.noResult = !this.noResult;
			  				} else {
			  					this.searchResult = res.data;
			  				}
			  			})
			  			.catch(err => console.log(err));
	  			}
	  		}
	  	},
	  	goToMovieDetails(query) {
	  		return `/movies/${query}`
	  	}
	  },
	  created() {
	  	axios.get('/api/movies?order=time&limit=28')
	  		.then(res => {
	  			this.movies = res.data;
	  			this.numberMovies = res.data.length;
	  		})
	  		.catch(err => {
	  			console.log(err);
	  		});
	  }
	}
</script>

<style>
	.button {
		background:linear-gradient(to right, rgb(30, 213, 169) 0%, rgb(1, 180, 228) 100%);
		width: 100%;
	}
</style>
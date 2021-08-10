<template>
	<section>
		<loader v-if="isLoading" />
		<div v-if="noResult">
		  <v-img
		  	src="../../../uploads/images/noresult.png" 
		  	width="300px"
		  	:aspect-ratio="1"
		  	class="mx-auto center"
		  	></v-img>
		  	<center class="mt-8"><h2>{{ $t('noResult') }}</h2></center>
		  </div>

		  <div v-if="tkMovies != 0">
		  	<h3>{{ $t('movies') }}</h3>
			  <v-row class="ma-1 mb-3 d-flex flex-nowrap bScroll">
	      <v-card
	        class="mx-1"
	        v-for="(movie, i) in tkMovies"
	        :key="i"
	        elevation="0"
	        width="150"
	      >
	      <router-link :to="'/movies/' + movie._id">
	        <v-img
	          class="rounded-lg"
	          width="150"
	          height="225"
	          :src="movie.thumbnail"
	          position
	          gradient="to top right, rgba(0,0,0, 0), rgba(0,0,0, .5)"
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
	        </router-link>
	        <v-card-actions
	          class="pt-6"
	          style="position: relative;"
	        >
	        	<h4>{{ movie.title_tk }}</h4>
	        </v-card-actions>
	      </v-card>
	    </v-row>
	  </div>

	  <div v-if="ruMovies.length != 0">
	    <h3>{{ $t('movies') }}</h3>
	    <v-row class="ma-1 mb-3 d-flex flex-nowrap bScroll">
	      <v-card
	        class="mx-1"
	        v-for="(movie, i) in ruMovies"
	        :key="i"
	        elevation="0"
	      >
	      <router-link :to="'/movies/' + movie._id">
	        <v-img
	          class="rounded-lg"
	          width="150"
	          height="225"
	          :src="movie.thumbnail"
	          position
	          gradient="to top right, rgba(0,0,0, 0), rgba(0,0,0, .5)"
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
	        </router-link>
	        <v-card-actions
	          class="pt-6"
	          style="position: relative;"
	        ><h4>{{ movie.title_ru }}</h4>
	        </v-card-actions>
	      </v-card>
	    </v-row>
	  </div>

    <div v-if="enMovies.length != 0">
    	<h3>{{ $t('movies') }}</h3>
	    <v-row class="ma-1 mb-3 d-flex flex-nowrap bScroll">
	      <v-card
	        class="mx-1"
	        v-for="(movie, i) in enMovies"
	        :key="i"
	        elevation="0"
	        width="150"
	      >
	      <router-link :to="'/movies/' + movie._id">
	        <v-img
	          class="rounded-lg"
	          width="150"
	          height="225"
	          :src="movie.thumbnail"
	          position
	          gradient="to top right, rgba(0,0,0, 0), rgba(0,0,0, .5)"
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
	        </router-link>
	        <v-card-actions
	          class="pt-6"
	          style="position: relative;"
	        ><h4>{{ movie.title_en }}</h4>
	        </v-card-actions>
	      </v-card>
	    </v-row>
    </div>

    <div v-if="tracks.length != 0">
    	<h3>{{ $t('tracks') }}</h3>
	    <v-row class="ma-1 mb-3 d-flex flex-nowrap bScroll">
	      <v-card
	        class="mx-1"
	        v-for="(track, i) in tracks"
	        :key="i"
	        elevation="0"
	        width="150"
	      >
	      <router-link to="/tracks">
	        <v-img
	          class="rounded-lg"
	          width="150"
	          height="225"
	          :src="track.thumbnail"
	          position
	          gradient="to top right, rgba(0,0,0, 0), rgba(0,0,0, .5)"
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
	        </router-link>
	        <v-card-actions
	          class="pt-6"
	          style="position: relative;"
	        ><h4>{{ track.title }}</h4>
	        </v-card-actions>
	      </v-card>
	    </v-row>
    </div>

    <div v-if="videos.length != 0">
    	<h3>{{ $t('videos') }}</h3>
	    <v-row class="ma-1 mb-3 d-flex flex-nowrap bScroll">
	      <v-card
	        class="mx-1"
	        v-for="(video, i) in videos"
	        :key="i"
	        elevation="0"
	        width="150"
	      >
	      <router-link :to="'/watch/videos/' + video._id">
	        <v-img
	          class="rounded-lg"
	          width="150"
	          height="225"
	          :src="video.thumbnail"
	          position
	          gradient="to top right, rgba(0,0,0, 0), rgba(0,0,0, .5)"
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
	        </router-link>
	        <v-card-actions
	          class="pt-6"
	          style="position: relative;"
	        ><h4>{{ video.title }}</h4>
	        </v-card-actions>
	      </v-card>
	    </v-row>
	  </div>

	  <div v-if="books.length != 0">
	  	<h3>{{ $t('books') }}</h3>
	    <v-row class="ma-1 mb-3 d-flex flex-nowrap bScroll">
	      <v-card
	        class="mx-1"
	        v-for="(book, i) in books"
	        :key="i"
	        elevation="0"
	        width="150"
	      >
	      <router-link :to="'/books/' + book._id">
	        <v-img
	          class="rounded-lg"
	          width="150"
	          height="225"
	          :src="book.thumbnail"
	          position
	          gradient="to top right, rgba(0,0,0, 0), rgba(0,0,0, .5)"
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
	        </router-link>
	        <v-card-actions
	          class="pt-6"
	          style="position: relative;"
	        ><h4>{{ book.title }}</h4>
	        </v-card-actions>
	      </v-card>
	    </v-row>
	  </div>

	</section>
</template>

<script>
	import axios from 'axios'
	import loader from '../components/loader.vue'

	export default {
	  name: 'Result',
	  components: {
	  	loader,
	  },
	  data () {
	    return {
	    	tkMovies: [],
	    	ruMovies: [],
	    	enMovies: [],
	    	tracks: [],
	    	videos: [],
	    	books: [],
	    	isLoading: true,
	    	noResult: false
	    }
	  },
	  created() {
	  	axios.get(`/api/search?query=${this.$route.params.id}`)
	  		.then(res => {
	  			this.tkMovies = res.data.tkMovies;
	  			this.ruMovies = res.data.ruMovies;
	  			this.enMovies = res.data.enMovies;
	  			this.tracks = res.data.tracks;
	  			this.videos = res.data.videos;
	  			this.books = res.data.books;
	  			this.isLoading = false;
	  			if(
	  			  	res.data.enMovies.length == 0 &&
	  			  	res.data.ruMovies.length == 0 &&
	  			  	res.data.tkMovies.length == 0 &&
	  			  	res.data.videos.length == 0 &&
	  			  	res.data.books.length == 0 &&
	  			  	res.data.tracks.length == 0
	  			  ){ this.noResult = true }
	  		})
	  		.catch(err => {
	  			console.log(err);
	  			this.isLoading = false;
	  		});
	  },
	  updated() {
	  	axios.get(`/api/search?query=${this.$route.params.id}`)
	  		.then(res => {
	  			this.enMovies = res.data.enMovies;
	  			this.ruMovies = res.data.ruMovies;
	  			this.enMovies = res.data.enMovies;
	  			this.tracks = res.data.tracks;
	  			this.videos = res.data.videos;
	  			this.books = res.data.books;
	  			this.isLoading = false;
	  			if(
	  			  	res.data.enMovies.length == 0 &&
	  			  	res.data.ruMovies.length == 0 &&
	  			  	res.data.tkMovies.length == 0 &&
	  			  	res.data.videos.length == 0 &&
	  			  	res.data.books.length == 0 &&
	  			  	res.data.tracks.length == 0
	  			  ){ this.noResult = true }
	  		})
	  		.catch(err => {
	  			console.log(err);
	  			this.isLoading = false;
	  		});
	  }
	}
</script>

<style>
	.center {
		margin-top: calc((90vh - 360px)/2);
	}

	.bScroll {
    overflow-x: scroll;
    overflow-y: hidden;
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
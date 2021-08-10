<template>
	<section>
		<h2 class="my-1 mt-2"><center>{{ $t('videos') }}</center></h2>
		<v-col cols="12" md="8" class="mx-auto">
			<v-text-field
				class="mx-3 rounded-lg"
				dense
				:label="$t('search')"
				type="search"
				clearable
				outlined
				color="rgba(3,37,65, .8)"
				@keypress.enter="handleSearch"
				v-model="query"
			></v-text-field>
		</v-col>
		<h2 class="mx-auto mt-10" v-if="noresult">{{ $t('noresult') }}</h2>
		<v-row 
			class="d-flex flex-wrap justify-center"
			no-gutters
		>
			<v-card
				class="rounded-lg ma-1"
				width="250"
				v-for="(video, i) in videos"
				:key="i"
			>
				<v-img
					class="rounded-lg"
					:src="video.thumbnail"
					gradient="to bottom right, rgba(0,0,0,0), rgba(0,0,0, .3)"
					width="250"
        	height="150"
				>
					<div class="d-flex align-center justify-center" style="height:100%; width: 100%">
            <v-btn
              icon
              style="background-color:rgba(0,0,0, .5)"
              @click="goToWatch(video._id)"
            >
              <v-icon
                color="white"
                size="40"
              >mdi-play</v-icon>
            </v-btn>
          </div>
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
				<v-card-title class="body-2 font-weight-bold">{{ video.title }}</v-card-title>
			</v-card>
		</v-row>
		<v-container>
			<v-btn
				class="button white--text font-weight-bold ma-2 rounded-lg"
				@click="loadMore"
				v-if="!hide"
			>{{ $t('loadMore') }}</v-btn>
		</v-container>
	</section>
</template>

<script>
	import axios from 'axios' 

	export default {
	  name: 'Videos',
	  data() {
	    return {
				videos: [],
				numberVideos: 0,
				hide: false,
				query: '',
				noresult: false,
	    }
	  },
	  methods: {
	  	handleSearch() {
	  		axios.get(`/api/videos?query=${this.query}`)
	  			.then(res => {
						this.videos = res.data;
						this.numberVideos += res.data.length;
						this.hide = true;
						if (res.data.length === 0) {
							this.noresult = !this.noresult;
						}
	  			})
	  			.catch(err => console.log(err));
	  	},
	  	goToWatch(id) {
	  		this.$router.push('/watch/videos/' + id);
	  	},
			loadMore() {
				axios.get(`/api/videos?skip=${this.numberVideos}&limit=30`)
					.then(res => {
						res.data.forEach(element => {
							this.videos.push(element);
						});
						this.numberVideos += res.data.length;
						if(res.data.length == 0) {
							this.hide = true;
						}
					})
					.catch(err => {
						console.log(err);
					});
			}
	  },
	  created() {
	  	axios.get('/api/videos?limit=30')
	  		.then(res => {
	  			this.videos = res.data;
	  			this.numberVideos = res.data.length;
	  		})
	  		.catch(err => console.log(err));
	  }
	}
</script>

<style>
	.xCenter {
		height: 100%;
		width: 100%;
	}

	.xInline {
		background-color: rgba(0,0,0, .8);
	}
</style>
<template>
	<div>
		<v-row class="backgroundAd mb-3" min-height="210">
			<div class="cover">
				<v-container class="pt-10 white--text">
					<div class="pb-6 px-4 px-md-0">
						<p class="text-h5 text-md-h4 font-weight-bold">Explore Top Music Powered By TMDB</p>
						<span class="body-2">We bring together your favourite music services and join up listening, watching and sharing to connect your musical world.<br> Below you can visualise, in real-time, the listening habits, trends of us. Our global community. Go Explore.</span>
					</div>				
				</v-container>
			</div>
		</v-row>

		<v-row class="mx-2" style="margin-bottom: 80px;">

			<v-col
				cols="12"
				sm="6"
				md="4"
				lg="3"
				class="px-auto"
			>
      	<v-text-field
      		rounded
      		prepend-inner-icon="mdi-filter"
      		outlined
      		small
      		class="mx-2 mt-2"
      		dense
      		color="rgb(1, 180, 228)"
      		clearable
      		:placeholder="$t('textFilter')"
      		v-model="query"
      	></v-text-field>
      	<v-select
          dense
          :items="filterItems"
          outlined
          :placeholder="$t('selectLanguage')"
          bottom
          single-line
          class="mx-2 mb-2 rounded-xl"
          menu-props="offsetY"
          v-model="language"
          color="cyan darken-1"
        ></v-select>

				<v-btn 
			  	class="rounded-xl button font-weight-bold"
			  	dark
			  	@click="handleSearch"
			  >
					{{ $t('search') }}
				</v-btn>

				<!-- <center class="my-3">
					<v-img :src="track.thumbnail"	height="236" width="180">
						<template v-slot:placeholder>
							<v-row class="fill-height ma-0" align="center" justify="center">
								<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
							</v-row>
						</template>
					</v-img>
				</center> -->
			</v-col>

			<v-col 
				cols="12"
				sm="6"
				md="8"
				lg="9"
				class="d-flex flex-wrap justify-space-around"
			>
				<v-card
	      	width="180"
	      	v-for="(track, i) in tracks"
	      	:key="i"
	      	color="grey lighten-3"
	      	class="rounded-0 my-1"
	      	outlined
	      	tile
	      >
	      	<v-img
	      		:src="track.thumbnail"
	      		height="236"
	      		width="180"
	      		gradient="to bottom, rgba(0,0,0, 0), rgba(0,0,0, .5)"
	      	>
	      		<div class="cover">
		      		<v-btn
		      			style="background-color: #fff;"
		      			icon
		      			class="ma-2"
		      			@click="playTrack(track, i)"
		      		>
		      			<v-icon color="black">mdi-music-note</v-icon>
		      		</v-btn>
		      		<div class="d-flex flex-column mb-2 ml-1 mt-15">
			      		<span class="body-2 white--text font-weight-bold mt-15">{{ track.title }}</span>
			      		<span class="body-2 white--text">{{ track.author }}</span>
			      	</div>
			      </div>
	      	</v-img>  
	      </v-card>
	      <v-btn
					class="button white--text font-weight-bold my-2 rounded-xl"
					@click="loadMore"
					v-if="!hide"
				>{{ $t('loadMore') }}</v-btn>
			</v-col>
		</v-row>

		<!-- hidden audio -->
		<audio 
			controls 
			:loop="loop" 
			id="audio"
			style="display: none !important;" 
			@loadedmetadata="loadedTrack"
			@pause="paused"
			@play="played"
		>
			<source src="track.track" type="audio/mpeg" id="source">
		</audio>

		<!-- footer -->
		<v-footer
			color="rgb(3,37,65)"
			fixed
			height="80"
			class="pa-0 d-flex mt-15"
		>
			<div 
				class="ma-0"
				width="80"
				height="80"
			>
				<v-img
					:src="track.thumbnail" 
					height="75" 
					width="75"
					style="margin-left: 5px; margin-right: 5px;"
				></v-img>
			</div>
			<v-row class="fill-height mb-0 mx-3 mt-1">
				<v-col cols="12" class="d-flex pa-0">
					<span class="white--text">{{ currentTime }}</span>
					<v-slider
						color="blue"
						v-model="realTime"
						:max="realDuration"
						class="mx-2 mb-0"
						height="15"
					></v-slider>
					<span class="white--text">{{ duration }}</span>
				</v-col>
				<v-col cols="12">
					<v-row>
						<v-row>
							<v-col cols="3"></v-col>
							<v-col cols="6" class="d-flex align-center justify-center">
								<div>
									<v-btn icon outlined small color="white" @click="playPrev">
										<v-icon color="white" small>mdi-skip-previous</v-icon>
									</v-btn>
									<v-btn 
										icon 
										outlined 
										color="white" 
										class="mx-3"
										@click="playPause"
									>
										<v-icon color="white">{{ playPauseIcon }}</v-icon>
									</v-btn>
									<v-btn icon outlined small color="white" @click="playNext">
										<v-icon color="white">mdi-skip-next</v-icon>
									</v-btn>
								</div>
							</v-col>
							<v-col cols="3" class="d-flex align-center justify-end">
								<v-btn 
									elevation="0" 
									color="rgb(3,37,65)"
									icon
									@click="changeRepeat"
								>
									<v-icon color="white">{{ footerRepeat }}</v-icon>
								</v-btn>
							</v-col>
						</v-row>
					</v-row>
				</v-col>
			</v-row>
		</v-footer>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
	  name: 'Tracks',
	  data () {
	    return {
	    	tracks: [],
	    	track: {},
	    	numberOfTracks: 0,
	    	currentTrack: 0,
	    	playPauseIcon: 'mdi-play',
	    	currentTime: 0,
	    	trackDuration: 0,
	    	key: 0,
	    	realDuration: 0,
	    	realTime: 0,
	    	duration: 0,
	    	query: undefined,
	    	loop: false,
	    	currentTime: 0,
	    	footerIcon: 'mdi-play',
	    	footerRepeat: 'mdi-repeat',
	    	duration: 0,
	    	language: "Turkmen",
	    	filterItems: ["Turkmen", "English", "Russkiy"],
				xtrack: 0,
				hide: false
	    }
	  },
	  watch: {
	  	realTime(oldVal, newVal) {
	  		let audio = document.getElementById('audio');
	  		if(oldVal > newVal + 1 || newVal > oldVal + 1){
	  			audio.currentTime = oldVal;
	  		}
	  	}
	  },
    methods: {
    	playPause() {
				let audio = document.getElementById('audio');
    		if(this.playPauseIcon === 'mdi-play'){
    			this.playPauseIcon = 'mdi-pause';
    			audio.play();
    		} else {
    			this.playPauseIcon = 'mdi-play';
    			audio.pause();
    		}
    	},
    	playTrack(track, i) {
    		let audio = document.getElementById('audio');
				this.currentTrack = i;
				this.track = this.tracks[this.currentTrack];
				audio.src = this.tracks[this.currentTrack].track;
    		audio.play();
    		this.playPauseIcon = 'mdi-pause';
    	},
    	playNext(){
				let audio = document.getElementById('audio');
				if(this.currentTrack >= this.tracks.length - 1) {
					this.currentTrack = this.tracks.length -1;
					audio.pause();
					this.track = this.tracks[this.tracks.length - 1];
					audio.src = this.tracks[this.currentTrack].track;
					audio.load();
    			audio.play();
				} else {
					this.currentTrack += 1;
					audio.pause();
					this.track = this.tracks[this.currentTrack];
					audio.src = this.tracks[this.currentTrack].track;
					audio.load();
    			audio.play();
				}
    	},
    	playPrev() {
				let audio = document.getElementById('audio');
				if(this.currentTrack <= 0) {
					this.currentTrack = 0;
					this.track = this.tracks[0];
					audio.pause();
					audio.src = this.tracks[this.currentTrack].track;
					audio.load();
					audio.play();
				} else {
					this.currentTrack -= 1;
					this.track = this.tracks[this.currentTrack];
					audio.pause();
					audio.src = this.tracks[this.currentTrack].track;
					audio.load();
					audio.play();
				}
    	},
    	changeRepeat() {
    		let audio = document.getElementById('audio');
    		if (this.footerRepeat == 'mdi-repeat') {
    			this.loop = true;
    			this.footerRepeat = 'mdi-repeat-once';
    		} else {
    			this.footerRepeat = 'mdi-repeat';
    			this.loop = false;
    		}
    	},
    	loadedTrack() {
    		let audio =  document.getElementById('audio');
    		let minutes = Math.floor(audio.duration/60);
    		this.realDuration = audio.duration;
	    	let seconds = Math.floor(audio.duration - minutes*60);
	    	this.duration = minutes + ':' + seconds;
	    	setInterval(() => {
	    		let timer = audio.currentTime;
	    		this.realTime = timer;
	    		let minutesx = Math.floor(timer/60);
		    	let secondsx = Math.floor(timer - minutesx*60);
		    	this.currentTime = minutesx + ":" + secondsx;
	    	}, 1);
    	},
    	loadMore() {
    		axios.get(`/api/tracks?skip=${this.numberOfTracks}&limit=24`)
    			.then(res => {
    				res.data.forEach(track => {
    					this.tracks.push(track);
    				})
    				this.numberOfTracks += res.data.length;
    			})
    			.catch(err => console.log(err));
    	},
    	paused() {
    		this.playPauseIcon = 'mdi-play';
    	},
    	played() {
    		this.playPauseIcon = 'mdi-pause';
			},
			handleSearch() {
    		axios.get(`/api/tracks?query=${this.query}`)
    			.then(res => {
						this.tracks = res.data;
						if(res.data.length == 0) {
							this.hide = true;
						}
    			})	
    			.catch(err => {
    				console.log(err);
    			})
    	},
    },
    mounted() {
    	axios.get(`/api/tracks?limit=24`)
				.then(res => {
					let audio = document.getElementById('audio');
					this.numberOfTracks += res.data.length;
    			this.tracks = res.data;
					this.track = this.tracks[0];
					audio.src = this.tracks[0].track;
    		})
    		.catch(err => {
    			console.log(err);
    		});
    }
	}
</script>

<style>
	.cover {
		height: 100%;
		width: 100%;
		background-image: linear-gradient(transparent 0px, rgba(0,0,0, .9));
	}

	.backgroundAd {
		background-image: url(https://www.last.fm/static/images/dashboard_header.f28f1fbea2f9.jpg);
		background-size: cover;
		background-position: center 100%;
	}

	.button {
		background:linear-gradient(to right, rgb(30, 213, 169) 0%, rgb(1, 180, 228) 100%);
		width: 100%;
	}

	.v-messages{
		display: none;
	}
</style>

<template>
	<div>
		<v-row class="xHeight">
			<v-col 
				cols="12"
				md="8"
			>
				<div id="video"></div>
				<v-row cols="12">
					<v-col 
						cols="9" 
						class="text-h6 text-md-h5 font-weight-bold d-inline-flex"
					>
						{{ video.title }}
					</v-col>
				</v-row>
				<div class="body-2"></div>
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
						<router-link :to="'/watch/videos/' + recommend._id">
							<v-img 
								:src="recommend.thumbnail"
								width="250"
								height="150"
							>
								<div 
									class="d-flex align-center justify-center" 
									style="height: 100%;"
								>
									<v-btn
										icon
										style="background-color: rgba(0,0,0, .8);"
										@click="goTowatch(recommend._id)"
									>
										<v-icon color="white">mdi-play</v-icon>
									</v-btn>
								</div>
							</v-img>
						</router-link>
					</v-col>
					<v-col cols="6">
						<div class="body-1 font-weight-bold">{{ recommend.title }}</div>
					</v-col>
				</v-row>
			</v-col>
		</v-row>

		<v-row 
			class="bScroll d-flex flex-nowrap bmdHide mt-10"
			no-gutters
		>
			<v-col v-for="(recommend, i) in recommends" :key="i" class="bmdHide mx-2">
				<v-img
					:src="recommend.thumbnail"
					class="rounded-lg"
					width="250"
					height="150"
				>
					<div
						class="d-flex align-center justify-center"
						style="height: 100%; width: 100%;"
					>
						<v-btn
							icon
							style="background-color:rgba(0,0,0, .8)"
							@click="goTowatch(recommend._id)"
						>
							<v-icon color="white">mdi-play</v-icon>
						</v-btn>
					</div>
				</v-img>
				<div class="body-2 font-weight-bold">{{ recommend.title }}</div>
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
	    	video: {},
	    	tags: [],
	    	recommends: []
	    }
	  },
	  methods: {
	  	goTowatch(id) {
	  		this.$router.push(`/watch/videos/${id}`)
	  	}
	  },
	  mounted() {
	  	let id = this.$route.params.id;
	  	axios.get(`/api/videos/${id}`)
	  		.then(res => {
	  			this.video = res.data;
	  			res.data.tags.forEach(tag => {
	  				this.tags.push(`tags=${tag}`)
	  			});

					setTimeout(() => {
						if(screen.width <= 600) {
							let videoTag = "\<video preload=\"auto\" width=\"100%\" height=\"70%\" controlsList=\"nodownload\" controls src=\"" + this.video.smallVideo + "\"/\>";
							document.getElementById('video').innerHTML = videoTag;
						} else if(screen.width > 600 && screen.width < 960) {
							let videoTag = "\<video preload=\"auto\" width=\"100%\" height=\"70%\" controlsList=\"nodownload\" controls src=\"" + this.video.mediumVideo + "\"/\>";
							document.getElementById('video').innerHTML = videoTag;
						} else {
							let videoTag = "\<video preload=\"auto\" width=\"100%\" height=\"70%\" controlsList=\"nodownload\" controls src=\"" + this.video.largeVideo + "\"/\>";
							document.getElementById('video').innerHTML = videoTag;
						};
					}, 500)
	  			

	  			axios.get(`/api/videos?${this.tags.toString()}&limit=20`)
			  		.then(res => {
			  			res.data.forEach(video => {
			  				if(this.$route.params.id != video._id){
			  					this.recommends.push(video);
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

	.bScroll {
		overflow-x: scroll;
	}

	.bScroll::-webkit-scrollbar {
	  height: 10px;
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

	.scrollY::-webkit-scrollbar {
	  width: 20px;
	}

	.scrollY::-webkit-scrollbar-track {
	  background: #f1f1f1;
	}

	.scrollY::-webkit-scrollbar-thumb {
	  background: #999;
	}

	.scrollY::-webkit-scrollbar-thumb:hover {
	  background: #1ed5a9 !important;
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
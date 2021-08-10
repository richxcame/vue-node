<template>
	<div class="mx-1 mx-md-10 my-2">
		<v-alert
      border="left"
      colored-border
      type="info"
      elevation="2"
      class="mb-7"
    >Wideo we suraty mohumdir. Tegler portalda esasy orny tutyar, sebabi maslahat berilyan wideolar teglere gora berilyar. Tegi ozuniz girizmek isleseniz her tegin arasynda "," belgini goyun!</v-alert>
		<v-snackbar 
      v-model="snackbar"
      :timeout="4000"
      top
      color="red darken-2"
      centered
      elevation="10"
    >Maglumatlary doly girizin!</v-snackbar>
    <v-snackbar 
      v-model="success"
      :timeout="4000"
      top
      color="success"
      centered
      elevation="10"
    >Wideo ustunlikli gosuldy!</v-snackbar>
    <v-row class="d-flex justify-space-around">
    	<v-col cols="4">
    		<v-file-input
			    label="Kici olcegli wideo gosun"
			    outlined
			    dense
			    color="cyan darken-2"
			    @change="uploadSmallVideo"
			  ></v-file-input>
    	</v-col>
    	<v-col cols="4">
    		<v-file-input
			    label="Orta olcegli wideo gosun"
			    outlined
			    dense
			    color="cyan darken-2"
			    @change="uploadMediumVideo"
			  ></v-file-input>
    	</v-col>
    	<v-col cols="4">
    		<v-file-input
			    label="Uly olcegli wideo gosun"
			    outlined
			    dense
			    color="cyan darken-2"
			    @change="uploadLargeVideo"
			  ></v-file-input>
    	</v-col>
    </v-row>
		<v-row class="d-flex justify-space-around">
		  <v-col cols="10">
			  <v-file-input
			    label="Surat gosun"
			    outlined
			    dense
			    color="cyan darken-2"
			    @change="uploadThumbnail"
			  ></v-file-input>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<v-text-field
			    label="Atlandyryň"
			    outlined
			    clearable
			    dense
			    color="cyan darken-2"
			    v-model="title"
			  ></v-text-field>
			</v-col>
		</v-row>
		<v-row class="d-flex justify-space-around">
			<v-col cols="4">
				<v-combobox
          :items="items"
          label="Teg goşuň"
          multiple
          outlined
          dense
          item-color="cyan darken-2"
          color="cyan darken-2"
          v-model="tags"
        ></v-combobox>
	    </v-col>
	    <v-col cols="4">
				<v-select
		      :items="languages"
		      label="Dilini saýlaň"
		      dense
		      outlined
		      menu-props="offsetY"
		      color="cyan darken-2"
		      v-model="language"
		    ></v-select>
			</v-col>
		</v-row>
		<v-row>
			<v-col 
				cols="12" 
				md="8" 
				class="mx-auto"
			>
				<v-btn
		      class="ma-2 font-weight-black"
		      dark
		      style="background:linear-gradient(to right, rgba(30,213,169,1) 0%, rgba(1,180,228,1) 100%);"
		      @click="storeVideo"
		      block
		      :loading="loading"
      		:disabled="loading"
		    >
		      tassykla
		      <template v-slot:loader>
		        <span class="custom-loader">
		          <v-icon light>mdi-cached</v-icon>
		        </span>
		      </template>
		    </v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import axios from 'axios'

	export default{
		data() {
			return{
				title: '',
				language: '',
				duration: '',
				tags: [],
				smallVideo: null,
				mediumVideo: null,
				largeVideo: null,
				thumbnail: null,
				success: false,
				items: [
          'Clip',
          'SynTV',
          'Turkmen',
          'Turk',
          'Rus',
          'Inlis'
        ],
        languages: [
        	'Türkmençe',
        	'Русский',
        	'English',
        	'Turkce'
        ],
        loader: null,
      	loading: false,
      	snackbar: false,
			}
		},
		methods: {
			storeVideo() {
			this.loading = true;
			let video = new FormData;

      video.append('smallVideo', this.smallVideo);
      video.append('mediumVideo', this.mediumVideo);
      video.append('largeVideo', this.largeVideo);
      video.append('title', this.title);
      video.append('language', this.language);
      video.append('duration', this.duration);
      video.append('tags', this.tags);
      video.append('thumbnail', this.thumbnail);

      axios.post('/api/videos', video)
        .then(res => {
        	this.loading = false;
        	this.success = true;
        })
        .catch(err => {
        	this.loading = false;
        	this.snackbar = true;
        });
			},
			uploadSmallVideo(file) {
				this.smallVideo = file;
			},
			uploadMediumVideo(file) {
				this.mediumVideo = file;
			},
			uploadLargeVideo(file) {
				this.largeVideo = file;
			},
			uploadThumbnail(file) {
				this.thumbnail = file;
			}
		}
	}
</script>

<style>
	.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .color{
  	background-image: linear-gradient(to right, rgba(30,213,169,1), rgba(1,180,228,1));
  }
</style>
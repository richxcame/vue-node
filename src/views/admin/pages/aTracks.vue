<template>
	<div class="mx-1 mx-md-10 my-2">

		<v-alert
      border="left"
      colored-border
      type="info"
      elevation="2"
      class="mb-7"
    >Aydym we suraty mohumdir. Tegler portalda esasy orny tutyar, sebabi maslahat berilyan aydymlar teglere gora berilyar. Tegi ozuniz girizmek isleseniz her tegin arasynda "," belgini goyun!</v-alert>

		<v-snackbar 
      v-model="snackbar"
      :timeout="4000"
      top
      color="red darken-2"
      centered
      elevation="10"
    >Maglumatlary doly girizin!</v-snackbar>
		<v-row class="d-flex justify-space-around">
			<v-col cols="5">
				<v-file-input
			    label="Aydymy gosun"
			    outlined
			    dense
			    color="cyan darken-2"
			    @change="uploadTrack"
			  ></v-file-input>
		  </v-col>
		  <v-col cols="5">
			  <v-file-input
			    label="Surat saylan"
			    outlined
			    dense
			    color="cyan darken-2"
			    @change="uploadThumbnail"
			  ></v-file-input>
			</v-col>
		</v-row>
		<v-row class="d-flex justify-space-around">
			<v-col cols="4">
				<v-text-field
			    label="Aydymyn ady"
			    outlined
			    clearable
			    dense
			    color="cyan darken-2"
			    v-model="title"
			  ></v-text-field>
			</v-col>
			<v-col cols="4">
				<v-text-field
			    label="Aydymcy"
			    outlined
			    clearable
			    dense
			    color="cyan darken-2"
			    v-model="author"
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
		      @click="storeTrack"
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
	import axios from 'axios';

	export default{
		data() {
			return {
				title: '',
				author: '',
				language: '',
				duration: '',
				tags: [],
				track: null,
				thumbnail: null,
				items: [
          'Pop',
          'Rap',
          'Turkmen',
          'Turk',
          'Rus',
          'Inlis'
        ],
        languages: [
        	'Türkmençe',
        	'Русский',
        	'English'
        ],
        loader: null,
      	loading: false,
      	snackbar: false,
			}
		},
		methods: {
			storeTrack() {

			this.loading = true;

      let track = new FormData;

      track.append('title', this.title);
      track.append('author', this.author);
      track.append('language', this.language);
      track.append('duration', this.duration);
      track.append('tags', this.tags);
      track.append('track', this.track);
      track.append('thumbnail', this.thumbnail);

      axios.post('/api/tracks', track)
        .then(res => {
        	this.loading = false;
        	console.log(res);
        })
        .catch(err => {
        	this.loading = false;
        	console.log(err);
        	this.snackbar = true;
        });

			},
			uploadTrack(file) {
				this.track = file;
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
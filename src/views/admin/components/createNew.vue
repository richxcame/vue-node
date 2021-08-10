<template>
	<div class="mx-1 mx-md-10 my-2">
		<v-row class="d-flex justify-space-around">
			<v-col cols="4">
				<v-file-input
			    :label="fileUploadName"
			    outlined
			    dense
			    color="cyan darken-2"
			    v-model="fileUpload"
			  ></v-file-input>
		  </v-col>
		  <v-col cols="4">
			  <v-file-input
			    :label="imageUploadName"
			    outlined
			    dense
			    color="cyan darken-2"
			    v-model="fileUpload2"
			  ></v-file-input>
			</v-col>
			<v-col cols="4" v-if="ulySuratGerekmi">
			  <v-file-input
			    :label="ulySurat"
			    outlined
			    dense
			    color="cyan darken-2"
			    v-model="fileUpload3"
			  ></v-file-input>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="4">
				<v-text-field
			    label="Atlandyryň"
			    outlined
			    clearable
			    dense
			    color="cyan darken-2"
			    v-model="name"
			  ></v-text-field>
			</v-col>
			<v-col cols="4">
			  <v-text-field
			    label="Give a name"
			    outlined
			    clearable
			    dense
			    color="cyan darken-2"
			    v-model="name_en"
			  ></v-text-field>
			</v-col>
			<v-col cols="4">
				<v-text-field
			    label="Dayte imya"
			    outlined
			    clearable
			    dense
			    color="cyan darken-2"
			    v-model="name_ru"
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
			<v-col cols="4">
				<v-text-field
			    :label="kitapmy ? 'Sahypasy' : 'Dowamlylygy'"
			    outlined
			    :placeholder="'kitapmy' ? 'Meselem: 230 sah' : 'Meselem: 3:45'"
			    dense
			    color="cyan darken-2"
			    v-model="duration"
			  ></v-text-field>
			</v-col>
		</v-row>
		<v-row>
			<v-textarea
        outlined
        auto-grow
        shaped
        label="Düşündirilişi"
        placeholder="Meselem: Lorem bilen Ipsum Cukury halas etmegin yolunda..."
        color="cyan darken-2"
        v-model="description"
      ></v-textarea>
		</v-row>
		<v-row>
			<v-textarea
        outlined
        auto-grow
        shaped
        label="Description"
        placeholder="For example: More than you know..."
        color="cyan darken-2"
        v-model="description_en"
      ></v-textarea>
		</v-row>
		<v-row>
			<v-textarea
        outlined
        auto-grow
        shaped
        label="Opisaniya"
        placeholder="Primer: Grigori Perelman resil..."
        color="cyan darken-2"
        v-model="description_ru"
      ></v-textarea>
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
		      @click="submitInformation"
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
		props: {
			fileUploadName: {
				type: String,
				required: true
			}, 
			imageUploadName: {
				type: String,
				required: true,
			}, 
			isVisibleFileUpload: {
				type: Boolean,
				required: true,
			},
			ulySurat: {
				type: String,
				required: true,
			},
			ulySuratGerekmi: {
				type: Boolean,
				required: true,
			},
			kitapmy: {
				type: Boolean,
				required: true,
			}
		},
		data() {
			return {
				name: '',
				name_en: '',
				name_ru: '',
				fileUpload: null,
				fileUpload2: null,
				fileUpload3: null,
				tags: [],
				language: '',
				duration: '',
				description: '',
				description_en: '',
				description_ru: '',
				loader: null,
				loading: false,
				items: [
          'Wideo',
          'Film',
          'Aýdym',
          'Kitap',
        ],
        languages: [
        	'Türkmençe',
        	'Русский',
        	'English'
        ]
			}
		},
    methods: {
    	submitInformation() {
    		this.loading = true;
    		axios.post('api/movie', {
    			name: this.name,
    			file: this.fileUpload,
    			thumbnail: this.fileUpload2,
    			background_image: this.fileUpload3,
    			description: this.description,
    			tags: this.tags,
    			language: this.language,
    			duration: this.duration
    		})
    			.then(res => {
    				this.loading = false;
    				console.log(res)
    			})
    			.catch(err => {
    				console.log(err);
    				setTimeout(() => {
    					this.loading = false;
    				}, 3000)
    			});
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
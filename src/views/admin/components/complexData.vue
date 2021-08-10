<template>
  <v-card class="ma-2">
    <v-snackbar 
      v-model="snackbarDelete"
      absolute
      :timeout="4000"
      top
      color="success"
      outlined
    >Ustunlikli pozuldy!</v-snackbar>
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
  		<v-text-field
  			v-model="search"
  			append-icon="mdi-magnify"
  			label="Tablisadan islendik maglumaty gozlap bilersiniz"
  			single-line
  			color="cyan darken-2"
  			outlined
  			dense
  			hide-details
  		></v-text-field>
    </v-card-title>
		<v-data-table
	    :headers="headers"
	    :items="data"
	    :items-per-page="5"
	    class="elevation-2"
	    :search="search"
      :footer-props="{
        itemsPerPageText: 'Her sahypa element:',
        itemsPerPageAllText: 'Ahlisi',
        pageText: ''
      }"
    >
      <template v-slot:item.icon="{ item }">
        <v-dialog 
          transition="dialog-bottom-transition"
          class="pa-15 ma-15"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="primary">mdi-update</v-icon>
            </v-btn>
          </template>
          <template v-slot:default="dialog">

            <!-- update a movie details -->
            <v-card v-if="title == 'Movies'">
              <div class="ma-7">
                <v-row class="d-flex justify-space-around">
                  <v-col cols="4">
                    <v-file-input
                      label="Upload a movie"
                      disable
                      outlined
                      dense
                      color="cyan darken-2"
                      @change="selectMovie"
                      disabled
                    ></v-file-input>
                  </v-col>
                  <v-col cols="4">
                    <v-file-input
                      label="Surat gos"
                      disable
                      outlined
                      dense
                      color="cyan darken-2"
                      @change="selectThumbnail"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="4">
                    <v-file-input
                      label="Uly surat gos"
                      disable
                      outlined
                      dense
                      color="cyan darken-2"
                      @change="selectBackgroundImage"
                      disabled
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
                      id="title_tk"
                      color="cyan darken-2"
                      :value="item.title_tk"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      label="Give a name"
                      outlined
                      clearable
                      dense
                      id="title_en"
                      color="cyan darken-2"
                      :value="item.title_en"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      label="Dayte imya"
                      outlined
                      clearable
                      dense
                      id="title_ru"
                      color="cyan darken-2"
                      :value="item.title_ru"
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
                      id="movieTags"
                      item-color="cyan darken-2"
                      color="cyan darken-2"
                      :value="item.tags"
                    ></v-combobox>
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      :items="languages"
                      label="Dilini saýlaň"
                      dense
                      outlined
                      id="movieLanguage"
                      menu-props="offsetY"
                      color="cyan darken-2"
                      :value="item.language"
                    ></v-select>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      label="Ses"
                      outlined
                      placeholder="45"
                      dense
                      id="voice"
                      color="cyan darken-2"
                      :value="item.voice"
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
                    id="description_tk"
                    :value="item.description_tk"
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
                    id="description_en"
                    :value="item.description_en"
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
                    id="description_ru"
                    :value="item.description_ru"
                  ></v-textarea>
                </v-row>
                <v-row>
                  <v-col cols="12" md="8" class="mx-auto">
                    <v-btn
                      @click="updateMovie(item._id)"
                      class="ma-2 font-weight-black"
                      dark
                      style="background:linear-gradient(to right, rgba(30,213,169,1) 0%, rgba(1,180,228,1) 100%);"
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
            </v-card>

            <!-- update a track details -->
            <v-card v-if="title == 'Tracks'">
              <div class="ma-7">
                <v-row class="d-flex justify-space-around">
                  <v-col cols="5">
                    <v-file-input
                      label="Aydymy gosun"
                      outlined
                      dense
                      color="cyan darken-2"
                      @change="uploadTrack"
                      disabled
                    ></v-file-input>
                  </v-col>
                  <v-col cols="5">
                    <v-file-input
                      label="Surat saylan"
                      outlined
                      dense
                      color="cyan darken-2"
                      @change="selectThumbnail"
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
                      id="titleTrack"
                      :value="item.title"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      label="Aydymcy"
                      outlined
                      clearable
                      dense
                      color="cyan darken-2"
                      id="authorTrack"
                      :value="item.author"
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
                      id="trackTags"
                      :value="item.tags"
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
                      id="trackLanguage"
                      :value="item.language"
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
                      @click="updateTrack(item._id)"
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
            </v-card>

            <!-- update a video details -->
            <v-card v-if="title == 'Videos'">
              <div class="ma-7">
                <v-row class="d-flex justify-space-around">
                  <v-col cols="5">
                    <v-file-input
                      label="Wideo gosun"
                      outlined
                      dense
                      color="cyan darken-2"
                      @change="uploadVideo"
                      disabled
                    ></v-file-input>
                  </v-col>
                  <v-col cols="5">
                    <v-file-input
                      label="Surat gosun"
                      outlined
                      dense
                      color="cyan darken-2"
                      @change="selectThumbnail"
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
                      id="titleVideo"
                      :value="item.title"
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
                      id="videoTags"
                      :value="item.tags"
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
                      id="videoLanguage"
                      :value="item.language"
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
                      @click="updateVideo(item._id)"
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
            </v-card>

            <!-- update a book details -->
            <v-card v-if="title == 'Books'">
              <div class="ma-7">
                <v-row class="d-flex justify-space-around">
                  <v-col cols="5">
                    <v-file-input
                      label="Kitaby saylan"
                      outlined
                      dense
                      color="cyan darken-2"
                      @change="uploadBook"
                      disabled
                    ></v-file-input>
                  </v-col>
                  <v-col cols="5">
                    <v-file-input
                      label="Surat gosun"
                      outlined
                      dense
                      color="cyan darken-2"
                      @change="selectThumbnail"
                    ></v-file-input>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="5">
                    <v-text-field
                      label="Ady"
                      outlined
                      clearable
                      dense
                      color="cyan darken-2"
                      id="bookTitle"
                      :value="item.title"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                      label="Awtory"
                      outlined
                      clearable
                      dense
                      color="cyan darken-2"
                      id="authorBook"
                      :value="item.author"
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
                      id="bookTags"
                      :value="item.tags"
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
                      id="bookLanguage"
                      :value="item.language"
                    ></v-select>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      label="Sahypasy"
                      outlined
                      placeholder="Meselem: 329sah"
                      dense
                      color="cyan darken-2"
                      id="bookDuration"
                      :value="item.duration"
                    ></v-text-field>
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
                      @click="updateBook(item._id)"
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
            </v-card>

          </template>
        </v-dialog>
        <v-dialog transition="dialog-bottom-transition">
          <template v-slot:activator="{ on, attrs }">
            
          </template>
        </v-dialog>
        <v-btn 
          icon 
          @click="deleteSingle(title, item._id)"
        >
          <v-icon color="red darken-2">mdi-delete</v-icon>
        </v-btn>
      </template>
      <template v-slot:item.thumbnail="{ item }">
        <v-img
          height="60"
          width="60"
          :src="item.thumbnail"
        ></v-img>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  import axios from 'axios'

	export default{
    props: {
      title: {
        type: String,
        required: true
      },
      data: {
        type: Array,
        required: true
      },
      headers: {
      	type: Array,
      	required: true
      }
    },
		data() {
			return {
				search: "",
        snackbarDelete: false,
        movie: null,
        thumbnail: null,
        background_image: null,
        items: ["Wideo", "Film", "Aýdym", "Kitap"],
        languages: ["Türkmençe", "Русский", "English", "Turkce"],
        loader: null,
        loading: false,			
			}
		},
    methods: {
      selectMovie(file) {
        this.movie = file;
      },
      selectThumbnail(file) {
        this.thumbnail = file;
      },
      selectBackgroundImage(file) {
        this.background_image = file;
      },
      deleteSingle(title, id) {
        if (title == 'Movies') {
          axios.delete('/api/movies/' + id)
            .then(res => { 
              this.snackbarDelete = true
              console.log(res.data);
              this.$router.go();
            })
            .catch(err => console.log(err));
        } else if (title == 'Tracks') {
          axios.delete('/api/tracks/' + id)
            .then(res => { 
              this.snackbarDelete = true
              console.log(res.data);
              this.$router.go();
            })
            .catch(err => console.log(err));
        } else if (title == 'Videos') {
          axios.delete('/api/videos/' + id)
            .then(res => { 
              this.snackbarDelete = true
              console.log(res.data);
              this.$router.go();
            })
            .catch(err => console.log(err));
        } else if (title == 'Books') {
          axios.delete('/api/books/' + id)
            .then(res => {
              this.snackbarDelete = true 
              console.log(res.data);
              this.$router.go();
            })
            .catch(err => console.log(err));
        }
      },
      updateMovie(id) {
        this.loading="true"
        let movie = new FormData;

        let title_tk = document.getElementById('title_tk').value;
        let title_en = document.getElementById('title_en').value;
        let title_ru = document.getElementById('title_ru').value;
        let description_tk = document.getElementById('description_tk').value;
        let description_ru = document.getElementById('description_ru').value;
        let description_en = document.getElementById('description_en').value;
        let movieLanguage = document.getElementById('movieLanguage').value;
        let voice = document.getElementById('voice').value;
        let movieTags = document.getElementById('movieTags').value;


        movie.append('title_tk', title_tk);
        movie.append('title_ru', title_ru);
        movie.append('title_en', title_en);
        movie.append('description_tk', description_tk);
        movie.append('description_ru', description_ru);
        movie.append('description_en', description_en);
        movie.append('language', movieLanguage);
        movie.append('voice', voice);
        movie.append('tags', movieTags);
        movie.append('thumbnail', this.thumbnail);

        axios.post('/api/movies/' + id, movie)
          .then(res => { 
            console.log(res);
            this.loading = false; 
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
          });

      },
      updateTrack(id) {
        this.loading="true"
        let track = new FormData;

        let titleTrack = document.getElementById('titleTrack').value;
        let authorTrack = document.getElementById('authorTrack').value;
        let trackTags = document.getElementById('trackTags').value;
        let trackLanguage = document.getElementById('trackLanguage').value;

        track.append('title', titleTrack);
        track.append('author', authorTrack);
        track.append('tags', trackTags);
        track.append('language', trackLanguage);
        track.append('thumbnail', this.thumbnail);

        axios.post('/api/tracks/' + id, track)
          .then(res => { 
            console.log(res);
            this.loading = false; 
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
          });
      },
      updateVideo(id) {
        this.loading="true"
        let video = new FormData;

        let titleVideo = document.getElementById('titleVideo').value;
        let videoTags = document.getElementById('videoTags').value;
        let videoLanguage = document.getElementById('videoLanguage').value;

        video.append('title', titleVideo);
        video.append('tags', videoTags);
        video.append('language', videoLanguage);
        video.append('thumbnail', this.thumbnail);

        axios.post('/api/videos/' + id, video)
          .then(res => { 
            console.log(res);
            this.loading = false; 
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
          });
      },
      updateBook(id) {
        this.loading="true"
        let book = new FormData;

        let bookTitle = document.getElementById('bookTitle').value;
        let authorBook = document.getElementById('authorBook').value;
        let bookTags = document.getElementById('bookTags').value;
        let bookLanguage = document.getElementById('bookLanguage').value;
        let bookDuration = document.getElementById('bookDuration').value;

        book.append('title', bookTitle);
        book.append('author', authorBook);
        book.append('tags', bookTags);
        book.append('language', bookLanguage);
        book.append('duration', bookDuration);
        book.append('thumbnail', this.thumbnail);

        axios.post('/api/books/' + id, book)
          .then(res => { 
            console.log(res);
            this.loading = false; 
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
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
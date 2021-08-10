<template>
  <div>
    <v-alert
      border="left"
      colored-border
      type="info"
      elevation="2"
      class="mb-7"
    >Film we suraty mohumdir. Uly surat goymak bilen siz portalyn owadanlygyny artdyryarsynyz! 3 dilde atlary we dusundirirlisi girizmegi unutman! Tegler portalda esasy orny tutyar, sebabi maslahat berilyan filmler teglere gora berilyar. Tegi ozuniz girizmek isleseniz her tegin arasynda "," belgini goyun! Film goshmak biraz wagt alyp biler! Arka surata 1600x310 olcegde saylasanyz gowy bolar</v-alert>
    <v-snackbar 
      v-model="snackbar"
      :timeout="4000"
      top
      color="red darken-2"
      centered
      elevation="10"
    >Film we tag bolmagy zerurdyr!</v-snackbar>
    <v-snackbar 
      v-model="success"
      :timeout="4000"
      top
      color="success"
      centered
      elevation="10"
    >Film ustunlikli gosuldy!</v-snackbar>
    <v-row class="d-flex justify-space-around">
      <v-col cols="4">
        <v-file-input
          label="Kici olcegli film gosun"
          outlined
          dense
          color="cyan darken-2"
          @change="selectSmall"
        ></v-file-input>
      </v-col>
      <v-col cols="4">
        <v-file-input
          label="Orta olcegli film gosun"
          outlined
          dense
          color="cyan darken-2"
          @change="selectMedium"
        ></v-file-input>
      </v-col>
      <v-col cols="4">
        <v-file-input
          label="Uly olcegli film gosun"
          outlined
          dense
          color="cyan darken-2"
          @change="selectLarge"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-space-around">
      <v-col cols="6">
        <v-file-input
          label="Surat gos"
          outlined
          dense
          color="cyan darken-2"
          @change="selectThumbnail"
        ></v-file-input>
      </v-col>
      <v-col cols="6">
        <v-file-input
          label="Uly surat gos"
          outlined
          dense
          color="cyan darken-2"
          @change="selectBackgroundImage"
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
          v-model="title_tk"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
          label="Give a name"
          outlined
          clearable
          dense
          color="cyan darken-2"
          v-model="title_en"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
          label="Dayte imya"
          outlined
          clearable
          dense
          color="cyan darken-2"
          v-model="title_ru"
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
          label="Ses"
          outlined
          placeholder="Meselem: 45"
          dense
          color="cyan darken-2"
          v-model="voice"
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
        v-model="description_tk"
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
      <v-col cols="12" md="8" class="mx-auto">
        <v-btn
          @click="storeMovie"
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
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title_tk: "",
      title_en: "",
      title_ru: "",
      smallMovie: null,
      mediumMovie: null,
      largeMovie: null,
      description_tk: "",
      description_en: "",
      description_ru: "",
      thumbnail: null,
      background_image: null,
      duration: '',
      language: '',
      tags: [],
      voice: '',
      items: ["Urus", "Film", "Romantika", "Hindi"],
      languages: ["Türkmençe", "Русский", "English", "Turkce"],
      loader: null,
      loading: false,
      snackbar: false,
      success: false,
    };
  },
  methods: {
    storeMovie() {
      this.loading = true;
      let movie = new FormData;

      movie.append('smallMovie', this.smallMovie);
      movie.append('mediumMovie', this.mediumMovie);
      movie.append('largeMovie', this.largeMovie);
      movie.append('title_tk', this.title_tk);
      movie.append('title_ru', this.title_ru);
      movie.append('title_en', this.title_en);
      movie.append('description_tk', this.description_tk);
      movie.append('description_ru', this.description_ru);
      movie.append('description_en', this.description_en);
      movie.append('language', this.language);
      movie.append('duration', this.duration);
      movie.append('voice', this.voice);
      movie.append('tags', this.tags);
      movie.append('thumbnail', this.thumbnail);
      movie.append('background_image', this.background_image);

      axios.post('/api/movies', movie)
        .then(res => {
          this.loading = false;
          this.success = true;
        })
        .catch(err => {
          this.loading = false;
          this.snackbar = true;
        });

    },
    selectSmall(file) {
      this.smallMovie = file;
    },
    selectMedium(file) {
      this.mediumMovie = file;
    },
    selectLarge(file) {
      this.largeMovie = file;
    },
    selectThumbnail(file) {
      this.thumbnail = file;
    },
    selectBackgroundImage(file) {
      this.background_image = file;
    }
  }
};
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

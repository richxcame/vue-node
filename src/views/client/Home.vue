<template>
  <div>
    <!-- picture -->
    <v-row class="mb-1" style="height: 350px;">
      <v-img
        :src="selectBackgroundImage"
        min-height="250"
        max-height="350"
        gradient="to top right, rgba(0,0,0, 0), rgba(0,0,0, .5)"
      ></v-img>
      <v-container style="position: absolute; color: white;" class="ml-4 ml-md-16 mt-7 ">
        <p class="text-h4 text-md-h2 font-weight-bold">{{ $t('welcome') }}</p>
        <p class="text-h6 text-md-h4 font-weight-bold">{{ $t('adPortal') }}</p>
      </v-container>
      <div
        style="position: absolute; color: white; width:100%; margin-top: 175px;"
        class="ml-2"
      >
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                rounded
                :placeholder="$t('searchPlaceholder')"
                background-color="white"
                height="46"
                v-model="search"
                @keypress.enter="handleSearch"
              >
                <template v-slot:append>
                  <v-btn
                    style="background:linear-gradient(to right, rgba(30,213,169,1) 0%, rgba(1,180,228,1) 100%); margin-top:-4px; margin-right:-24px; color: white;"
                    class="font-weight-bold"
                    rounded
                    height="46"
                    elevation="0"
                    @click="handleSearch"
                  >{{ $t('search') }}</v-btn>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-row>

    <div class="ma-5">
      <v-row>
      <v-col cols="12" md="3" class="text-center">
        <h3 class="font-weight-black">{{ $t('movies') }}</h3>
      </v-col>
      <v-col
        cols="12"
        md="9"
      >
        <div
          style="border: 1px solid rgba(3,37,65,1); height: 30px;"
          class="d-inline-flex mx-4 border-30"
        >
          <div
            class="rounded-xl"
            v-for="(item, i) in items"
            :key="i"
            :style="selectedButton == i ? 'background-color: rgb(3,37,65)' : ''"
          >
            <v-btn
              height="30"
              class="rounded-xl"
              text
              @click="changeButton(i)"
            >
              <span
                :class=" selectedButton == i
                  ? 'back font-weight-bold' : 'font-weight-bold' "
                :style=" selectedButton == i
                  ? '' : 'color: rgb(3,37,65);' "
              >
                {{ newPopular(item) }}
              </span>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    </div>

    <!-- movies -->
    <section class="movie-background mx-auto px-5">
      <v-row class="mb-3 d-flex flex-nowrap bScroll mx-auto" style="max-width:1300px;">
        <v-card
          class="mx-3 mb-5"
          v-for="(movie, i) in movies"
          :key="i"
          elevation="0"
          color="transparent"
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
            <v-btn
              absolute
              color="#081c22"
              class="white--text"
              fab
              small
              top
            >
              <v-progress-circular
                :rotate="-90"
                width="3"
                :value="movie.voice"
                :color="movie.voice > 50 ? '#1ed5a9' : 'red darken-1'"
              >
                <span class="white--text text-caption">{{ movie.voice }}<small><sup>%</sup></small></span>
              </v-progress-circular>
            </v-btn>
          <h4>{{ movieTitle(movie) }}</h4>
          </v-card-actions>
        </v-card>
      </v-row>
    </section>

    <v-container style="background-color: #f7f2f0; height: 300px;" class="mt-5 d-flex align-center">
      <v-col cols="6" md="8">
        <v-row class="d-flex justify-space-around">
          <v-card
            v-for="(book, i) in books"
            :key="i"
            class="bsmHide"
          >
            <v-img
              :src="book.thumbnail"
              width="120"
              height="190"
            ></v-img>
          </v-card>
          <v-card class="bmdHide">
            <v-img
              :src="books[0].thumbnail"
              width="120"
              height="190"
            ></v-img>
          </v-card>
        </v-row>
      </v-col>
      <v-col cols="6" md="4">
        <h3><center>{{ $t('adBookTitle') }}</center></h3>
        <div class="body-1">
          {{ $t('adBookText') }}
        </div>
        <center>
          <v-btn
            elevation="0"
            color="#f86b36"
            class="white--text rounded-lg mt-2 mb-2"
            to="/books"
          >{{ $t('read') }}</v-btn>
        </center>
      </v-col>
    </v-container>

    <!-- videos -->
    <div class="ma-4">
      <h3 class="hover d-inline-flex font-weight-black mt-5">{{ $t('videos') }}</h3>
      <div class="mb-4 bScroll">
        <div class="d-flex flex-nowrap mt-2 mb-4">
          <v-card
            v-for="(video, i) in videos"
            :key="i"
            class="mx-1"
            elevation="0"
            :to="'/watch/videos/' + video._id"
            height="150"
            width="250"
          >
            <v-img
              :src="video.thumbnail"
              class="rounded-lg"
              height="150"
              width="250"
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
          </v-card>
        </div>
      </div>
    </div>

    <!-- movies -->
    <div :style="backgroundStyle" class="mt-5">
      <div
        class="pt-4 pb-7 bScroll"
        style="background: linear-gradient(to right, rgba(3,37,65, 0.75) 0%, rgba(3,37,65, 0.75) 100%);"
      >
        <div class="mx-1 d-flex flex-nowrap" style="padding-top: 40px">
          <div
            class="mx-1"
            v-for="(movie,i) in movies"
            :key="i"
          >
            <v-hover v-slot="{  }">
              <v-img
                class="rounded-lg"
                width="150"
                height="225"
                :src="movie.thumbnail"
                gradient="to top right, rgba(0,0,0, 0), rgba(0,0,0, .5)"
                @mouseover="changeBackgroundImage(movie.background_image)"
              >
                <div class="d-flex align-center justify-center" style="height:100%; width: 100%">
                  <v-btn
                    icon
                    style="background-color:rgba(0,0,0, .5)"
                    @click="goToMovieDetails(movie._id)"
                  >
                    <v-icon
                      color="white"
                      size="40"
                    >mdi-play</v-icon>
                  </v-btn>
                </div>
              </v-img>
            </v-hover>
              <h4 class="font-weight-bold white--text"><center>{{ movieTitle(movie) }}</center></h4>
          </div>
        </div>
      </div>
    </div>

    <!-- trending tags -->
    <div class="mt-5">
      <h3 class="hover d-inline-flex font-weight-black">{{ $t('tags') }}</h3><br>
      <v-row justify="space-around">
        <v-col
          cols="12"
          md="10"
        >
          <v-chip-group
            active-class="deep-purple--text"
            show-arrows
          >
            <v-chip
              outlined
              color="rgba(3, 37, 65, 1)"
              v-for="tag in tags"
              :key="tag"
            >
              {{ tag }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
    </div>

    <!-- new tracks -->
    <div class="my-3">
      <h3 class="hover mt-4 font-weight-black d-inline">{{ $t('new') }} {{ $t('tracks') }}</h3>
      <div class="bScroll d-flex flex-nowrap py-2">
        <v-card
          v-for="(track, i) in tracks"
          :key="i"
          width="150"
          height="200"
          class="mx-1"
          :elevation="hover ? 5 : 2"
          to="/tracks"
        >
          <v-img
            :src="track.thumbnail"
            height="200"
            width="150"
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
            <div
              class="d-flex align-end"
              style="height: 100%; background-color: rgba(0,0,0, .5)"
            >
              <div class="ma-1">
                <div class="body-2 white--text font-weight-bold">{{ track.title }}</div>
                <div class="body-2 white--text">{{ track.author }}</div>
              </div>
            </div>
          </v-img>
        </v-card>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import slideGroup from '../components/slideGroup.vue'
  import xSelector from '../components/xSelector.vue'
  import xSelectorSecond from '../components/xSelectorSecond.vue'

  export default {
    components: {
      slideGroup,
      xSelector,
      xSelectorSecond,
    },
    data() {
      return{
        search: '',
        backgroundImage: "",
        tags: [],
        movies: [],
        tracks: [],
        videos: [],
        books: [],
        selectedButton: 0,
        items: [
          { name: "New", name_tk: "Täze", name_ru: "Nowyy" },
          { name: "Popular", name_tk: "Meşhur", name_ru: "Populyarnye" },
        ],
      }
    },
    computed: {
      backgroundStyle() {
        return "background-image: url(" + this.backgroundImage + ");" + "background-position: center center; background-size: cover; background-repeat: no-repeat; color: #fff;";
      },
      selectBackgroundImage() {
        let random = Math.random().toString().slice(2, 8).slice(0,1);
        return `/uploads/images/${random}.jpg`;
      }
    },
    methods: {
      changeBackgroundImage(image){
        this.backgroundImage = image;
      },
      changeButton(query) {
        this.selectedButton = query;
        if(query == 1) {
          axios.get('/api/movies?order=voice&limit=25')
            .then(res => {
              this.movies = res.data;
            })
            .catch(err => console.log(err));
        } else {
          axios.get('/api/movies?order=time')
            .then(res => {
              this.movies = res.data;
            })
            .catch(err => console.log(err));
        }
      },
      showBooks(query) {
        return `/uploads/images/book${query}.gif`
      },
      movieTitle(movie) {
        let lang = this.$i18n.locale;
        if (lang == 'en'){
          return movie.title_en;
        } else if (lang == 'ru'){
          return movie.title_ru;
        } else {
          return movie.title_tk;
        }
      },
      handleSearch() {
        if(this.search != '' && this.search != ' '){
          this.$router.push(`/search/${this.search}`);
        }
      },
      goToMovieDetails(id) {
        this.$router.push('/movies/' + id);
      },
      newPopular(item) {
        let lang = this.$root.$i18n.locale;
        if(lang == 'en'){
          return item.name;
        } else if (lang == 'ru'){
          return item.name_ru;
        } else {
          return item.name_tk;
        }
      }
    },
    mounted() {
      axios.get('/api/movies?limit=25&order=time')
        .then(res => {
          this.movies = res.data;
          this.backgroundImage = res.data[0].background_image;
        })
        .catch(err => console.log(err));

      axios.get('/api/tracks?limit=25')
        .then(res => {
          this.tracks = res.data;
        })
        .catch(err => console.log(err));

      axios.get('/api/videos?limit=25')
        .then(res => {
          this.videos = res.data;
        })
        .catch(err => console.log(err));

      axios.get('/api/books?limit=4')
        .then(res => {
          this.books = res.data;
        })
        .catch(err => console.log(err));

      axios.get('/api/tags')
        .then(res => {
          res.data.forEach(item => {
            if (item != '') {
              this.tags.push(item);
            }
          })
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
</script>

<style>

  *{
    font-family: 'Source Sans Pro', sans-serif !important;
  }

  a {
    text-decoration: none;
  }

  .movie-background {
    max-width: 1300px;
    background-image: url(/uploads/images/movie-background.svg);
    background-position: 50% 130px;
    background-size: 1300px;
    background-repeat: no-repeat;
  }

  .bScroll {
    overflow-x: scroll;
    overflow-y: hidden;
  }

  .bScroll::-webkit-scrollbar {
    width: 1px;
    height: 7px !important;
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

  .hover:hover{
    animation: hover .5s forwards;
    color: #9C27B0;
  }

  @keyframes hover {
    0% {
      margin-left: 0;
    }
    100% {
      margin-left: 4px;
    }
  }

  .border-30{
    border-radius: 30px;
  }
  .back{
    background-image: -webkit-linear-gradient(to right, #c0fecf, #1ed5a9);
    background-image: -moz-gradient(to right, #c0fecf, #1ed5a9);
    background-image: -mos-linear-gradient(to right, #c0fecf, #1ed5a9);
    background-image: -o-linear-gradient(to right, #c0fecf, #1ed5a9);
    background-image: linear-gradient(to right, #c0fecf, #1ed5a9);
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }

  @media all and (max-width: 960px){
    .bsmHide {
      display: none;
    }
  }

  @media all and (min-width: 960px){
    .bmdHide {
      display: none;
    }
  }
</style>

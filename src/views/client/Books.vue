<template>
  <div>
    <div class="book mb-5">
      <div class="pa-10" style="background-color: rgba(3,37,65, .7)">
        <h2 class="my-3 white--text">{{ $t('aboutBook') }}</h2>
        <v-row>
          <v-col cols="12" sm="6">
            <p class="body-1 mb-4 white--text">Get access to maintain your own custom personal lists, track what you've seen and search and filter for what to watch next—regardless if it's in theatres, on TV or available on popular streaming services like Netflix, Disney Plus, and Amazon Prime Video. Lorem ipsum dolor sit amet consectetur adipisicing, elit.</p>
          </v-col>
          <v-col cols="12" sm="6">
            <ul class="body-1 ml-3 white--text">
              <li>Enjoy Media free</li>
              <li>Maintain a personal watchlist</li>
              <li>Log the movies, tracks, videos shows you've seen</li>
              <li>Build custom lists</li>
            </ul>
          </v-col>
        </v-row>
      </div>
    </div>

    <div class="my-3">
      <h3 class="font-weight-black">{{ $t('books') }}</h3>
      <div class="bScroll d-flex flex-nowrap align-center">
        <v-card
          v-for="(book, i) in books"
          :key="i"
          width="150"
          class="mx-1 mb-7"
          elevation="5"
        >
          <v-img
            :src="book.thumbnail"
            height="200"
            width="150"
            @click="readBook(book.book)"
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
          <v-card-title class="body-1 font-weight-bold">{{ less(book.title) }}</v-card-title>
          <v-card-text class="font-italic" align="end">{{ book.author }}</v-card-text>
        </v-card>
        <v-btn
          :loading="loading"
          :disabled="loading"
          color="blue-grey"
          class="mx-2 white--text my-auto"
          fab
          small
          @click="loadMore"
          v-if="!hide"
        >
          <v-icon>mdi-arrow-right</v-icon>
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
        </template>
        </v-btn>
      </div>
    </div>

    <embed 
      :src="selectedBook"
      type="application/pdf" 
      class="pdf" 
      width="100%"
      height="750px" 
    />
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Books',
    data () {
      return {
        books: [],
        selectedBook: '',
        loader: null,
        loading: false,
        numberBooks: 0,
        hide: false,
      }
    },
    methods: {
      readBook(query) {
        this.selectedBook = query;
      },
      loadMore() {
        this.loading = true;
        axios.get(`/api/books?skip=${this.numberBooks}&limit=30`)
          .then(res => {
            res.data.forEach(book => {
              this.books.push(book);
            })
            this.loading = false;
            this.numberBooks += res.data.length;
            if(res.data.length == 0) {
              this.hide = true;
            }
          })
          .catch(err => {
            console.log(err); 
            this.loading = false;
          })
      },
      less(str) {
        if (str.length > 11) {
          return str.slice(0,11) + '...';
        } else {
          return str;
        }
      }
    },
    created() {
      axios.get('/api/books?limit=25')
        .then(res => {
          this.books = res.data;
          this.selectedBook = res.data[0].book;
          this.numberBooks = res.data.length;
        })
        .catch(err => console.log(err));
    }
  }
</script>

<style>
  .book {
    background-image: url(/uploads/images/book.jpg);
    background-size:cover;
    background-position: center center;
  }
  .pdf {
    overflow-y: hidden;
    overflow-x: hidden;
  }
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
</style>
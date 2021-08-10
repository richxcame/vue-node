<template>
	<section>
		<v-row class="d-flex justify-space-around">
			<v-col 
				cols="12" 
				sm="6" 
				md="3"
				v-for="(item, i) in categories"
				:key="i"
			>
				<v-card 
					outlined 
					elevation="0"
				>
					<v-row>
						<v-col cols="4">
							<v-icon 
								:color="item.color"
								size="60"
							>{{ item.icon }}</v-icon>
						</v-col>
						<v-col cols="8" class="text-right pr-5">
							<div class="text-h5">Jemi</div>
							<div>{{ item.text }}</div>
						</v-col>
						</v-row>
				</v-card>
			</v-col>
		</v-row>
		<complex-data 
			title="Movies"
			:data="movies"
			:headers="movieHeaders"
			v-if="isVisibleMovies"
		></complex-data>
		<complex-data
			title="Tracks"
			:data="tracks"
			:headers="trackHeaders"
			v-if="isVisibleTracks"
		></complex-data>
		<complex-data
			title="Videos"
			:data="videos"
			:headers="videoHeaders"
			v-if="isVisibleVideos"
		></complex-data>
		<complex-data
			title="Books"
			:data="books"
			:headers="bookHeaders"
			v-if="isVisibleBooks"
		></complex-data>
	</section>
</template>


<script>
	import axios from 'axios' 
	import complexData from '../components/complexData.vue'

	export default{
		components: {
			complexData,
		},
		data() {
			return {
				categories: [
					{ name: "Filmler", color: "rgba(3,37,65)", icon: "mdi-movie", text: '' },
					{ name: "Wideolar", color: "amber", icon: "mdi-video", text: '' },
					{ name: "Aydymlar", color: "cyan", icon: "mdi-music-note", text: ''},
					{ name: "Kitaplar", color: "info", icon: "mdi-book", text: '' }
				],
				movies: [],
				tracks: [],
				videos: [],
				books: [],
				isVisibleMovies: false,
				isVisibleTracks: false,
				isVisibleVideos: false,
				isVisibleBooks: false,
				movieHeaders: [
					{
	          text: 'Suraty',
	          align: 'start',
	          sortable: true,
	          value: 'thumbnail'
	        },
	        {
	          text: 'Ady',
	          align: 'start',
	          sortable: true,
	          value: 'title_tk',
	        },
	        {
	        	text: 'Rusca ady',
	        	align: 'start',
	        	sortable: true,
	        	value: 'title_ru'
	        },
	        {
	        	text: 'inlisce ady',
	        	align: 'start',
	        	sortable: true,
	        	value: 'title_en'
	        },
	        { 
	          text: 'Dili',
	          align: 'start',
	          sortable: true,
	          value: 'language'
	        },
	        { 
	          text: 'Uytget/Poz',
	          sortable: false,
	          align: 'end',
	          value: 'icon'
	        }
	      ],
	      trackHeaders: [
	      	{
	          text: 'Suraty',
	          align: 'start',
	          sortable: true,
	          value: 'thumbnail'
	        },
	        {
	          text: 'Ady',
	          align: 'start',
	          sortable: true,
	          value: 'title',
	        },
	        { 
	          text: 'Aydymcy',
	          align: 'start',
	          sortable: true,
	          value: 'author'
	        },
	        { 
	          text: 'Dowamlylygy',
	          align: 'start',
	          sortable: true,
	          value: 'duration'
	        },
	        { 
	          text: 'Uytget/Poz',
	          sortable: false,
	          align: 'end',
	          value: 'icon'
	        }
	      ],
	      videoHeaders: [
	      	{
	          text: 'Suraty',
	          align: 'start',
	          sortable: true,
	          value: 'thumbnail'
	        },
	        {
	          text: 'Ady',
	          align: 'start',
	          sortable: true,
	          value: 'title',
	        },
	        { 
	          text: 'Dowamlylygy',
	          align: 'start',
	          sortable: true,
	          value: 'duration'
	        },
	        { 
	          text: 'Tegler',
	          align: 'start',
	          sortable: true,
	          value: 'tags'
	        },
	        { 
	          text: 'Uytget/Poz',
	          sortable: false,
	          align: 'end',
	          value: 'icon'
	        }
	      ],
	      bookHeaders: [
	      	{
	          text: 'Suraty',
	          align: 'start',
	          sortable: true,
	          value: 'thumbnail'
	        },
	        {
	          text: 'Ady',
	          align: 'start',
	          sortable: true,
	          value: 'title',
	        },
	        { 
	          text: 'Awtory',
	          align: 'start',
	          sortable: true,
	          value: 'author'
	        },
	        { 
	          text: 'Dili',
	          align: 'start',
	          sortable: true,
	          value: 'language'
	        },
	        { 
	          text: 'Uytget/Poz',
	          sortable: false,
	          align: 'end',
	          value: 'icon'
	        }
	      ]
			}
		},
		created() {
			// movies
			axios.get('/api/movies')
				.then(res => {
					this.movies = res.data;
					this.categories[0].text = res.data.length + ' film';
					this.isVisibleMovies = true;
				})
				.catch(err => console.log(err));

				// tracks
				axios.get('/api/tracks')
				.then(res => {
					this.tracks = res.data;
					this.categories[1].text = res.data.length + ' aydym';
					this.isVisibleTracks = true;
				})
				.catch(err => console.log(err));

				// videos
				axios.get('/api/videos')
				.then(res => {
					this.videos = res.data;
					this.categories[2].text = res.data.length + ' wideo';
					this.isVisibleVideos = true;
				})
				.catch(err => console.log(err));

				// books
				axios.get('/api/books')
				.then(res => {
					this.books = res.data;
					this.categories[3].text = res.data.length + ' kitap';
					this.isVisibleBooks = true;
				})
				.catch(err => console.log(err));
		}
	}
</script>
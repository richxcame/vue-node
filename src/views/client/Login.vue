<template>
	<v-app>
		<v-snackbar 
      v-model="error"
      :timeout="4000"
      top
      color="red darken-2"
      centered
      elevation="10"
    >{{ $t('passwordError') }}</v-snackbar>
		<div class="backgroundImg">
			<div class="cover d-flex align-center justify-center">
				<div>
					<div class="d-flex align-center justify-center">
						<div class="text-h3 text-md-h2 font-weight-black white--text my-3">{{ $t('welcome') }}</div>
					</div>
					<div class="d-flex align-center justify-center">
						<div class="text-h4 text-md-h3 font-weight-bold white--text mt-3 mb-4">{{ $t('loginToContinue') }}</div>
					</div>
					<div class="d-flex align-center justify-center my-2">
						<v-text-field
							outlined
							height="45"
							color="white"
							class="rounded-0 input blue--text"
							background-color="white"
							:placeholder="$t('writePassword')"
							v-model="password"
						>
							<template v-slot:append>
		            <v-btn
		            	style="background:linear-gradient(to right, rgba(30,213,169,1) 0%, rgba(1,180,228,1) 100%); margin-top:-17px; margin-right:-12px; color: white;"
		            	class="font-weight-black rounded-0"
		            	height="55"
		            	@click="goToHomePage"
		            >{{ $t('login') }}</v-btn>
		          </template>
						</v-text-field>
					</div>
				</div>
			</div>
		</div>
	</v-app>
</template>

<script>
	import axios from 'axios'

	export default {	
		name: 'Login',
		data () {
			return {
				password: '',
				error: false,
			}
		},
		methods: {
			goToHomePage() {
				axios.post('/register', {
					password: this.password,
				})
					.then(res => {
						if(res.data.password !== '') {
							let d = new Date();
							d.setTime(d.getTime() + 24*60*60*1000);
							document.cookie = `password=${res.data.password};expires=${d}`;
							this.$router.push('/');
						} else {
							this.error = true;
						}
					})
					.catch(err => {
						this.error = true;
					})
			}
		}
	}
</script>

<style>
	.backgroundImg {
		background-image: url(../assets/login.jpg);
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		width: 100vw;
		height: 100vh;
	}

	.cover {
		background: linear-gradient(to bottom, rgba(0,0,0, 0), rgba(0,0,0, .7))
	}

	@media all and (max-width: 960px) {
		.input { 
			width: 94vw;
		}
	}

	@media all and (min-width: 960px) {
		.input {
			width: 800px;
		}
	}
</style>
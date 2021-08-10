<template>
	<v-container>
		<v-row class="d-flex justify-center mb-10">
			<v-alert type="info">
	      Shu gunki parol: {{ password }}
	    </v-alert>
		</v-row>
		<v-row class="mt-10">
			<v-col cols="6" class="d-flex justify-center">
				<div style="height:250px; width: 250px;">
					<v-img
						height="250"
						aspect-ratio="1"
		        class="grey lighten-2"
						:src="avatar"
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
				</div>
			</v-col>
			<v-col cols="6">
				<v-file-input
          label="Avatarynyzy uytgedip bilersiniz"
          outlined
          color="cyan darken-2"
          dense
          @change="selectAvatar"
        ></v-file-input>
        <v-text-field
          label="Adynyzy utgedip bilersiniz"
          outlined
          dense
          color="cyan darken-2"
          id="name"
          :value="name"
        ></v-text-field>
        <v-text-field
          label="Paroly utgedip bilersiniz"
          outlined
          dense
          id="password"
          color="cyan darken-2"
          :value="password"
        ></v-text-field>
        <v-btn
          @click="adminClicked"
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
	</v-container>
</template>

<script>
	import axios from 'axios'

	export default{
		data() {
			return {
				name: '',
				password: '',
				avatar: '',
				loader: null,
      	loading: false,
			}
		},
		methods: {
			selectAvatar(file) {
				this.avatar = file;
			},
			adminClicked() {
				this.loading = true;

				let admin = new FormData;

				let name = document.getElementById('name').value;
				let password = document.getElementById('password').value;

				admin.append('name', name);
				admin.append('password', password);
				admin.append('avatar', this.avatar);

				axios.post('/api/admin', admin)
					.then(res => {
						this.loading = false;
            this.$router.go();
					})
					.catch(err => {
						this.loading = false;
            this.$router.go();
					});
			}
		},
		mounted() {
			axios.get('/api/admin')
				.then(res => {
					this.name = res.data.name;
					this.password = res.data.password;
					this.avatar = res.data.avatar;
				})
				.catch(err => console.log(err));
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
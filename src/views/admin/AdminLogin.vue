<template>
	<section class="d-flex align-center justify-center" style="height: 100%; width: 100%;">
			<v-text-field 
				outlined
				color="rgba(3,27,65, 1)" 
				clearable 
				@keypress.enter="handlePassword"
				v-model="password"
				label="Password"
			></v-text-field>
	</section>
</template>

<script>
	export default {
	  name: 'Login',
	  data () {
	    return {
	    	password: '',
	    }
	  },
	  methods: {
	  	handlePassword() {
	  		this.$cookies.set('adminpassword', `${this.password}`);
	  		this.$router.push('/admin');
	  	}
	  }
	}
</script>
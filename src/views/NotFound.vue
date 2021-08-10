<template>
	<section>
		<center>
			<v-img
				src="../../uploads/images/404.png"
				width="300px"
		  	:aspect-ratio="1"
		  	class="mx-auto center"
			></v-img>
		</center>
		<center class="mt-4">
			<v-btn 
				color="rgba(3,37,65, 1)"
				class="px-4"
				to="/"
				outlined
			>{{ $t('homePage') }}</v-btn>
		</center>
	</section>
</template>

<script>
	export default {
	  name: '404',
	  data () {
	    return {

	    }
	  }
	}
</script>

<style>
	.center {
		margin-top: calc((90vh - 360px)/2);
	}
</style>
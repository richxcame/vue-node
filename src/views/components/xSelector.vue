<template>
	<section>
		<v-row>
			<v-col cols="12" md="3" class="text-center">
				<h3 class="font-weight-black">What's Popular</h3>
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
								{{ item.name }}
							</span>
						</v-btn>
					</div>
				</div>
			</v-col>
		</v-row>
	</section>
</template>

<script>
	export default {
	  data() {
	    return {
	    	selectedButton: 1,
	    	items: [
	    		{ name: "Movies" },
	    		{ name: "Tracks" },
	    		{ name: "Videos" }
	    	]
	    }
	  },
	  methods: {
	  	changeButton(query) {
	  		this.selectedButton = query;
	  	}
	  }
	}
</script>

<style>
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
</style>
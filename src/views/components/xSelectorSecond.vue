<template>
	<v-row class="mb-7">
		<v-col
			cols="12"
			style="position: absolute"
		>
			<div class="d-inline-flex mx-4 border">
				<div 
					v-for="(item, i) in items"
					:key="i"
					:style="selectedButton == i ? 'background-image: linear-gradient(to right, #c0fecf 0%, #1ed5a9 100%)' : ''"
					class="rounded-xl"
				>
					<v-btn
						height="30"
						class="rounded-xl"
						text
						@click="changeButton(i)"
					>
						<span
							class="font-weight-bold white--text"
							:style="selectedButton == i ? 'color: rgb(3,37,65) !important' : ''"
						>
							{{ item.name }}
						</span>
					</v-btn>
				</div>
			</div>
		</v-col>
	</v-row>
</template>

<script>
	export default {
	  data() {
	    return {
	    	selectedButton: 1,
	    	items: [
	    		{ name: "Taze" },
	    		{ name: "Meshhur" },
	    	]
	    }
	  },
	  methods: {
	  	changeButton(i) {
	  		this.selectedButton = i;
	  	}
	  }
	}
</script>

<style>
	.border{
		border-radius: 30px;
		border: 1px solid #1ed5a9; 
		height: 30px;
	}
</style>
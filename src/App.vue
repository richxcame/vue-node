<template>
  <div>
  	<v-scroll-x-transition>
    	<router-view :key="$route.path"></router-view>
    </v-scroll-x-transition>
  </div>
</template>

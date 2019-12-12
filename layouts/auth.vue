<template>
  <v-app>
    <!-- <v-content> -->
      <v-container fluid fill-height class="bg-wrap d-flex justify-center">
        <nuxt />
      </v-container>
    <!-- </v-content> -->
  </v-app>
</template>

<style lang="scss">
.bg-wrap {
  background: url('/background.jpg') no-repeat center center fixed;
  background-size: cover;
}
</style>

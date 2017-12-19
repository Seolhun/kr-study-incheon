<template>
  <div>
    <p>
      {{ getCurrentWeather }}
    </p>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        getCurrentWeather: 'getCurrentWeather'
      })
    },
    methods: {
      ...mapActions({
        getWeather: 'getWeater'
      }),
      getWeather () {
        this.$store.dispatch('getWeather')
      }
    },
    created () {
      this.getWeather()
    }
  }
</script>

<style scoped>

</style>

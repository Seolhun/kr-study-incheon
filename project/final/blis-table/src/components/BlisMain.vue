<template>
  <div class="hello">
    <h1>{{ hello }}</h1>
    <h5>{{ location }}</h5>
    <weather

    >

    </weather>
  </div>
</template>

<script>
  import Weather from './weather/Weather'

  export default {
    components: {
      Weather
    },
    data () {
      return {
        hello: 'Welcome to Blis Table Main'
      }
    },
    computed: {
      location () {
        return navigator.geolocation
      }
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>

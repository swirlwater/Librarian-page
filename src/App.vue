<template>
  <router-view />
  <FooterVue />
</template>

<script>
import FooterVue from './components/FooterVue.vue'

export default {
  name: 'AppView',
  mounted() {
  },
  components: {
    FooterVue
  }
}

</script>

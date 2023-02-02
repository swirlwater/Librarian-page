<template>
  <router-view />
  <FooterVue />
</template>

<script>
import FooterVue from './components/FooterVue.vue'

export default {
  name: 'AppView',
  mounted() {
    this.$router.push('/login')
  },
  components: {
    FooterVue
  }
}

</script>

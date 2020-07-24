<template lang="pug">
  div(id="app")
    b-navbar(variant="dark" fixed="top" sticky=true type="dark")
      b-navbar-brand(to="/")
        b-icon-book
        span(class="pl-2") Книгоигры
    router-view
</template>

<script>
import { BIcon, BIconBook } from 'bootstrap-vue'

export default {
  components: {
    BIcon,
    BIconBook
  }
}
</script>

<style>
</style>

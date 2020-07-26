<template lang="pug">
  div(id="app")
    b-navbar(variant="dark" fixed="top" sticky=true type="dark")
      b-navbar-brand(to="/" class="mr-auto")
        b-icon-book
        span(class="pl-2") Книгоигры
      b-navbar-nav
        b-nav-text(class="text-right") Московское время: {{ moscowTime.setZone("Europe/Moscow").toFormat('dd.MM.yyyy HH:mm') }}
    router-view
</template>

<script>
import { BIcon, BIconBook } from 'bootstrap-vue'
import { DateTime } from 'luxon'

export default {
  data () {
    return {
      moscowTime: DateTime.local()
    }
  },
  created () {
    setInterval(function () {
      this.moscowTime = DateTime.local()
    }.bind(this), 1000)
  },
  components: {
    BIcon,
    BIconBook
  }
}
</script>

<style>
</style>

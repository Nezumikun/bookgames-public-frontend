<template lang="pug">
  b-container
    div(
      class="text-center"
      v-if="loading"
    )
      b-spinner(
        type="grow"
        label="Loading..."
        class="m-3 my-5"
      )
    div(
      v-if="!loading && activeGames.length > 0"
      class="mt-4"
    )
      h3 Текущие игры
      b-list-group
        b-list-group-item(
          v-for="item in activeGames"
          :key="item.id"
        )
          span {{ item.title }}
    div(
      v-if="!loading && complitedGames.length > 0"
      class="mt-4"
    )
      h3 Завершённые игры
      b-list-group
        b-list-group-item(
          v-for="item in complitedGames"
          :key="item.id"
          :to="'/game/'+item.id"
          class="p-0"
        )
          b-button-group(class="d-flex")
            b-button(:to="'/game/'+item.id" variant="light" class="w-100 text-left") {{ item.title }}
            b-button(:to="'/game/'+item.id+'/logs'" variant="primary") Ход&nbsp;игры
            b-button(:to="'/game/'+item.id+'/result'" variant="success") Таблица
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import apiCall from '../tools/axios'

export default {
  data () {
    return {
      games: [],
      loading: true
    }
  },
  computed: {
    activeGames () {
      return this.games.filter(x => x.isComplited === 'N')
    },
    complitedGames () {
      return this.games.filter(x => x.isComplited === 'Y')
    }
  },
  async created () {
    let res = await apiCall('games', 'get')
    this.games = res.data
    this.loading = false
  },
  name: 'home',
  components: {}
}
</script>

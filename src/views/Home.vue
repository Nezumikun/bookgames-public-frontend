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
      h3 Прошедшие игры
      b-row
        b-col(
          sm="12"
          md="6"
          v-for="item in complitedGames"
          :key="item.id"
        )
          b-card(
            :to="'/game/'+item.id"
            class="my-3"
          )
            b-card-body
              b-card-title {{ item.title }}

              b-button-group
                b-button(:to="'/game/'+item.id+'/logs'" variant="primary")
                  b-icon-receipt
                  span(class="pl-1") Ход игры
                b-button(:to="'/game/'+item.id+'/result'" variant="success")
                  b-icon-table
                  span(class="pl-1") Таблица
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import apiCall from '../tools/axios'
import { BIcon, BIconTable, BIconReceipt } from 'bootstrap-vue'

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
  components: {
    BIcon,
    BIconTable,
    BIconReceipt
  }
}
</script>

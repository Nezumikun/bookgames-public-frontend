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
            class="my-3"
          )
            b-card-body(class="m-0 p-0")
              b-card-title {{ item.title }}
              b-card-sub-title {{ item.subtitle }}

              b-card-text(class="mt-2")
                div Начата: {{ formatTime(item.activatedTime) }}
                div(v-if='item.finishTime') Закончена: {{ formatTime(item.finishTime) }}
                div Вопросов: {{ item.countQuestion }}
                div Участников: {{ item.countTeam }}

              b-button(:to="'/game/'+item.id" variant="link" class="pl-0 pr-4")
                b-icon-question-square
                span(class="pl-1") Вопросы
              b-button(:to="'/game/'+item.id+'/logs'" variant="link" class="pl-0 pr-4")
                b-icon-receipt
                span(class="pl-1") Ход игры
              b-button(:to="'/game/'+item.id+'/result'" variant="link" class="pl-0 pr-4")
                b-icon-table
                span(class="pl-1") Результаты
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import apiCall from '../tools/axios'
import { BIcon, BIconTable, BIconReceipt, BIconQuestionSquare } from 'bootstrap-vue'
import { DateTime } from 'luxon'

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
  methods: {
    formatTime (isoString) {
      return DateTime.fromISO(isoString).setZone('Europe/Moscow').setLocale('ru').toFormat('dd MMMM yyyy в HH:mm')
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
    BIconReceipt,
    BIconQuestionSquare
  }
}
</script>

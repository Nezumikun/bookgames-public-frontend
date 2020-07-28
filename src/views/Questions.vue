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
      v-if="!loading"
      class="mt-4"
    )
      h3(class="mt-3") {{ game.title }}
      div(class="text-secondary mb-3") {{ game.subtitle }}
      b-nav(tabs)
        b-nav-item(active) Вопросы
        b-nav-item(:to="'/game/' + id + '/logs'") Ход игры
        b-nav-item(:to="'/game/' + id + '/result'") Результаты
      div(
        v-for="question in game.questions"
        :key="question.id"
        class="my-3"
      ) {{ question.number }}. {{ question.text }}
        div(
          class="font-weight-bold"
          v-if="question.bookTitle.length > 0"
        ) {{ question.author }} &laquo;{{ question.bookTitle }}&raquo;
          span(v-if="question.bookDetail.length > 0")  ({{ question.bookDetail }})
          span(v-if="question.word.length > 0") , {{ question.word }}
        div(
          v-if="question.persons.length > 0"
        ) {{ question.persons }}
        div(
          class="font-italic"
          v-if="question.quote.length > 0"
          v-html="question.quote.replace(/\\n/g, '<br>')"
        )
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import apiCall from '../tools/axios'

export default {
  data () {
    return {
      game: {},
      id: this.$route.params.id,
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
  },
  async created () {
    let res = await apiCall('games/' + this.id, 'get')
    this.game = res.data
    this.loading = false
  },
  name: 'questions',
  components: {
  }
}
</script>

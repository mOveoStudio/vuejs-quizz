<template>
  <div class="page--ranking">
    <Header/>
    <div v-if="score !== null" class="page__content">
      <h1 class="page-content__title">Quizz terminé</h1>
      <p>Voici votre score.<br/>partagez-le avec vous amis !</p>
    </div>

    <p class="ranking__score">{{score}}</p>

    <div class="button__bottom-group">
      <button class="button" @click="restart">> Retour à l'accueil</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import Header from "@/components/HeaderHome";

export default {
  components: {Header},
  computed: {
    ...mapGetters(['getScores']),
    score: function () {
      return this.getScores.reduce((acc, item) => {
        acc += item.score;
        return acc;
      }, 0);
    }
  },
  methods: {
    restart: function () {
      this.$router.push("/");
    }
  },
}
</script>

<style lang="scss">
.ranking__score{
  @include font-size(44);
  font-weight: 600;
  margin-top: calc-rem(0);
  color: $color-theme-dark;
  font-family: $font-condensed;
  display: inline-block;
  padding: 5px 60px;
  background-color: $color-theme;
}
</style>

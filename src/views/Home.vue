<template>
  <div class="page--home">
    <HeaderHome/>
    <div class="page__content">
      <h1 class="page-content__title">Bienvenue sur<br/>le quizz de demo</h1>
      <p>Une petite démo de quizz basée sur un projet client, mais modifié pour le rendre public.</p><p>Bon amusement et bon coding.</p>
    </div>
    <div class="button__bottom-group">
      <button class="button" @click="startGame">> C'est parti !</button>
    </div>

  </div>
</template>

<script>
import HeaderHome from "@/components/HeaderHome";
import {mapRoutes} from "@/router";
import {mapActions} from "vuex";
import api from "@/api";

export default {
  components: {HeaderHome},
  methods: {
    ...mapActions(['setLoading', 'fetchSetupGame']),
    startGame: function () {
      this.setLoading(true);

      api.getSetupGame().then((data) => {
        this.fetchSetupGame(data);
        this.setLoading(false);

        this.$router.push(`/${mapRoutes.round}/0`);
      })
    }
  }
}
</script>

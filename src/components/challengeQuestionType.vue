<template>
  <div>
    <div class="challenge__text">
      {{question.data.label}}
    </div>
    <ul class="challenge__choices_list">
      <li>
      <button class="choice__button" @click="failedChallenge">Défi raté</button>
      </li>
      <li>
        <button class="choice__button" @click="succeedChallenge">Défi validé</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'challengeQuestionType',
  props: ['question'],
  methods: {
    failedChallenge: function(){
      this.$emit('send-result', {
        success: false,
        type: 'challenge',
        answer: "Défi raté !!"
      })
    },
    succeedChallenge: function(){
      this.$emit('send-result', {
        success: true,
        type: 'challenge',
        answer: "Défi réussi !!"
      })
    }
  }
}
</script>

<template>
  <div class="question--type-choices">
    <div class="question__label">{{question.data.label}}</div>
    <div class="question__image" v-if="question.data.image">
      <img :src="question.data.image" alt="" />
    </div>

    <div class="question__choices_list">
      <button class="choice__button" v-for="(choice, index) in question.data.choices" v-bind:key="index" @click="onAnswerSelected(index)">{{choice}}</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'choicesQuestionType',
  props: ['question'],
  data: function(){
    return {
      answer: null
    }
  },
  methods: {
    onAnswerSelected: function(index){
      const rightAnswer = this.question.data.answer;

      this.$emit('send-result', {
        success: rightAnswer === index,
        type: 'choices',
        label: "La bonne réponse était :",
        answer: this.question.data.choices[rightAnswer]
      });
    }
  }
}
</script>

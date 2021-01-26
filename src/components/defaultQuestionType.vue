<template>
  <div class="page__content">
    <p>Attention le type <strong class="text--orange">"{{question.type}}"</strong> n'a pas de template associé.</p>
  </div>
</template>

<script>
export default {
  name: "defaultQuestionType",
  props: ['question']
}
</script>

<template>
  <div>
    <slot name="icon"></slot>
    <div class="result-popup__answer">{{ result.answer }}</div>
    <slot name="results"></slot>
  </div>
</template>

<script>
export default {
  name: 'challengeResultPopup',
  props: ['result']
}
</script>

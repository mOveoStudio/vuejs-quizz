<template>
  <transition type="fade">
    <div class="loader" v-if="isLoading">
      <div class="loader__spinner">
      </div>
    </div>
  </transition>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Loader",
  computed: {
    ...mapGetters(['isLoading'])
  }
}
</script>

<style lang="scss" scoped>
.loader {
  z-index: 600;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba($color-theme-dark, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

// LOADER
//-----------------------------
.loader__spinner,
.loader__spinner:after {
  border-radius: 50%;
  width: 8em;
  height: 8em;
}

$spinner-color: $color-theme;

.loader__spinner {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba($spinner-color, 0.2);
  border-right: 1.1em solid rgba($spinner-color, 0.2);
  border-bottom: 1.1em solid rgba($spinner-color, 0.2);
  border-left: 1.1em solid $spinner-color;
  transform: translateZ(0);
  animation: load8 1.1s infinite linear;
}

@keyframes load8 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>

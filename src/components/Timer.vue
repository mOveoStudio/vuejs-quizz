<template>
  <div class="question__timer" :class="{'warn': time <= 5}">
    <div class="question__timer__inner">
      <span class="question__timer__time">{{ time }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timer",
  props: ['startTime'],
  data: function () {
    return {
      time: this.startTime
    }
  },
  watch: {
    startTime: function (val) {
      if (val !== this.time) {
        this.restart();
      }
    }
  },
  methods: {
    stop: function () {
      if (this.interval) {
        clearInterval(this.interval);
      }
    },
    restart: function (time = null) {
      if (this.interval) {
        clearInterval(this.interval);
      }

      if (time !== null) {
        this.time = time;
      } else {
        this.time = this.startTime;
      }

      this.start();
    },
    start: function () {
      this.interval = setInterval(() => {
        this.time = this.time - 1;
        //console.log(this.time);
        if (this.time <= 0) {
          this.stop();
        }
      }, 1000);
    }
  },
  mounted: function () {
    this.start();
  }
}
</script>

<style lang="scss">

.question__timer {
  margin-left: auto;
  margin-right: auto;
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
  color: #fff;
  background-color: $color-theme-dark;
  font-size: 32px;
  font-family: $font-condensed;
  font-weight: 700;
  z-index: 2;
  margin-top: calc-rem(20);
}

.question__timer__inner {
  display: flex;
  flex: 1 0;
  align-items: center;
  justify-content: center;
  margin-bottom: -5px;
}

.question__timer__time {
  position: relative;
  z-index: 2;
  text-align: center;
}

.question__timer__placeholder {
  display: block;
  position: absolute;
  color: #343333;
  text-align: right;
}

.question__timer.warn {
  background-color: $color-orange;
  color: #ffffff;
}
</style>

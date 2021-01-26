<template>
  <div class="page--game">
    <HeaderPage/>
    <div class="question" v-if="currentQuestion">

      <div class="question__category">
        {{ categoryName }}
        <span class="question__number">Question {{ currentQuestion.index + 1 }}</span>
      </div>

      <Timer :start-time="currentQuestion.time" ref="questionTimer" v-if="!popupResult"/>

      <div class="question__wrapper">
        <!-- DISPLAY QUESTION DEPENDING ON question type-->
        <component
            v-if="!popupResult"
            :is="questionTemplate"
            :question="currentQuestion"
            @send-result="sendResult"
        ></component>

        <transition name="bounce">
          <div class="question-popup-result" v-if="popupResult">
            <!-- DISPLAY ANSWER DEPENDING ON question type-->
            <component
                :is="currentQuestion.type + 'ResultPopup'"
                :result="popupResult"
            >
              <template v-slot:icon>
                <div class="question__result-icon" v-bind:class="{'success': popupResult.success}">
                  <img src="../assets/ico_thumb-up.svg" alt="">
                </div>
              </template>

              <template v-slot:results>
                <ul class="result__score">
                  <li v-if="popupResult.score.bonusTime > 0">Bonus temps : {{ popupResult.score.bonusTime }}</li>
                  <li>Ton score : {{ popupResult.score.scoreTotal }}</li>
                </ul>
              </template>

            </component>
          </div>
        </transition>

        <transition name="slide-down">
          <div class="button__bottom-group" v-if="popupResult">
            <button @click="next" class="button">> Poursuivre</button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {mapRoutes} from "@/router";

// QUESTION TYPES
import defaultQuestionType from "@/components/defaultQuestionType";
import choicesQuestionType from "@/components/choicesQuestionType";
import challengeQuestionType from "@/components/challengeQuestionType";

// RESULT POPUP TYPES
import choicesResultPopup from "@/components/choicesResultPopup";
import challengeResultPopup from "@/components/challengeResultPopup";

import Timer from "@/components/Timer";
import HeaderPage from "@/components/HeaderPage";

export default {
  name: 'Game',
  data: function () {
    return {
      popupResult: null
    }
  },
  beforeRouteUpdate(to, from, next) {
    // Before each route display, we reset popupResult
    this.popupResult = null;
    next();
  },
  components: {
    HeaderPage,
    defaultQuestionType,
    choicesQuestionType,
    challengeQuestionType,
    choicesResultPopup,
    challengeResultPopup,
    Timer
  },
  computed: {
    ...mapGetters(['getQuestion', 'isEnd', 'getCategoryName']),
    currentQuestion: function () {
      const currentID = parseInt(this.$route.params.id);
      return this.getQuestion(currentID);
    },
    categoryName: function () {
      return this.getCategoryName(this.currentQuestion.category);
    },
    questionTemplate: function(){
      // Check if the template given has a corresponding component
      let questionTemplate = this.currentQuestion.type + 'QuestionType';

      if(this.$options.components[questionTemplate]){
        return this.currentQuestion.type + 'QuestionType';
      }

      // Display default question component if not
      return defaultQuestionType;
    }
  },
  methods: {
    ...mapActions(['setScore']),
    next: function () {
      const currentID = parseInt(this.$route.params.id);
      let nextQuestion = currentID + 1;

      //Check if we reach the end of the game
      const isEnd = this.isEnd(currentID);

      if (isEnd) {
        this.$router.push(`/${mapRoutes.ranking}`);
      } else {
        this.$router.push(`/${mapRoutes.round}/${nextQuestion}`);
      }
    },
    sendResult: function (result) {
      // Compute score
      this.$refs.questionTimer.stop();
      let timeLeft = this.$refs.questionTimer.time;

      let score = (result.success) ? this.currentQuestion.score : 0;
      let bonusTime = (score > 0) ? Math.ceil(timeLeft * this.currentQuestion.timeBonusMultiplier) : 0;
      let scoreTotal = (score > 0) ? score + bonusTime : 0;

      result.score = {
        score,
        bonusTime,
        scoreTotal
      };

      // Push score into the store
      this.setScore({
        questionIndex: this.currentQuestion.index,
        score: scoreTotal
      });

      this.popupResult = result;
    }
  }
}
</script>

<style lang="scss">

// QUESTIONS
//-----------------------------
.question{
  position: relative;
}

.question__category {
  @extend %category-title;
  display: inline-block;
  position: relative;
  margin-top: calc-rem(30);
}

.question__number{
  display: inline-block;
  padding: 5px;
  background-color: $color-theme-secondary;
  color: #fff;
  position: absolute;
  white-space: nowrap;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, 5px);
}

.question__wrapper {
  position: relative;
  margin-top: calc-rem(15);
}

.choice__button {
  width: 100%;
  display: block;
  text-align: center;
  cursor: pointer;

  font-family: $font-text;
  border: 2px solid $color-dark;
  background-color: transparent;
  //text-transform: uppercase;
  @include font-size(14);
  font-weight: 400;
  //display: inline-block;
  padding: 5px 20px;
  letter-spacing: 0.5px;
  line-height: 1;
  min-height: 42px;
}

.question__choices_list {
  list-style: none;
  text-align: left;
  padding: 0;
  margin: 0;
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  margin-left: 20px;
  margin-right: 20px;

  margin-left: 1rem;
  margin-right: 1rem;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
}

.question__choices_list .choice__button{
  //grid-column: span 2;
}

.question__choices_list .choice__button:last-child:nth-child(2n - 1) {
  //grid-column: 1 / -1;
}


// QUESTIONS CHOICES
//-----------------------------
.question__image {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: -20px;
  margin-top: -10px;
}

.question__image img {
  display: block;
  width: 100%;
  height: auto;
}

.question__label {
  @include font-size(17);
  margin-bottom: calc-rem(15);
  font-weight: 700;
}

// CHALLENGE TYPE
//-----------------------------
.challenge__text {
  font-weight: $font-bold;
}

.challenge__choices_list {
  display: grid;
  list-style: none;
  text-align: left;
  padding: 0;
  margin: 0;
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
}

// POPUP RESULTS
//-----------------------------
.question-popup-result {
  background-color: #ffffff;
  border: 3px solid $color-theme-secondary;
  padding: calc-rem(30px);
  @include font-size(17);
  margin-top: calc-rem(40);
}

.question-popup-result .question__number {
  color: $color-dark;
  margin-bottom: 10px;
}

.result-popup__label {
  font-weight: $font-bold;
}

.result-popup__answer {
  @include font-size(30);
  text-transform: uppercase;
  font-weight: $font-bold;
  font-family: $font-condensed;
}

.result__score {
  list-style: none;
  margin: calc-rem(20) 0;
  margin-bottom: 0;
  padding: calc-rem(20);
  background-color: $color-theme-secondary;
  color: #ffffff;
}

.question__result-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $color-orange;
  width: 40px;
  height: 40px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  padding: 5px;
  margin-bottom: 10px;
  transform: rotate(180deg);
}

.question__result-icon img {
  width: 100%;
  height: auto;
  position: relative;
  display: block;
  top: -2px;
}

.question__result-icon.success {
  background-color: $color-theme;
  transform: rotate(0);
}
</style>

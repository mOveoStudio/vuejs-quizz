<template>
  <div id="app" class="game__container">
    <transition name="page">
    <router-view :key="'page-' + $route.params.id"/>
    </transition>
    <Loader/>
  </div>
</template>


<script>
import router from "@/router";
import store from "@/store";
import Loader from "@/components/Loader";

router.beforeEach((to, from, next)=>{
  if(to.name === 'Home'){
    next();
    return;
  }
  store.dispatch("isStoreReady").then((isStoreReady)=>{
    if(isStoreReady){
      next();
    }else{
      next("/");
    }
  })
});

export default {
  name:"App",
  beforeMount() {

    window.addEventListener("beforeunload", event => {
      let currentRouteName = this.$route.name;
      if(currentRouteName !== 'Home'){
        event.preventDefault();
        event.returnValue = "";
      }
    })
  },
  components:{
    Loader
  }
}
</script>

<style lang="scss">

*,
*:after,
*:before {
  box-sizing: border-box;
}

#app {
  font-family: $font-text;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-dark;
}

html {
  @include root-size('normal');

}

body {
  background-color: lighten($color-theme, 100%);
  margin: 0;
  padding: 0;
}

button,
a,
input {
  outline: none;
}

label {
  cursor: pointer;
}

.home__logo {
  width: 90%;
  margin-top: 70px;
}

.header__logo {
  width: 90%;
  height: auto;
}

.home__logo--inner {
  width: 60%;
  height: auto;
}

.game__container {
  padding-top: 20px;
  padding-bottom: 120px;
  padding-left: 30px;
  padding-right: 30px;
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;
}

// PAGE CONTENT
//-----------------------------
.page__content p{
  line-height: 1.6;
  margin-bottom: calc-rem(25);
}

.page-content__title{
  font-family: $font-condensed;
  margin-top: calc-rem(20);
  margin-bottom: calc-rem(20);
  text-transform: uppercase;
  @include font-size(45);
  font-weight: 700;
  padding: 2px 20px;
  letter-spacing: 1px;
}

// RESPONSIVE
//-----------------------------
@include down(450) {
  html {
    @include root-size('small');
  }

  %category-title {
    padding-left: 5px;
    padding-right: 5px;

  }

  .game__container {
    padding-left: 10px;
    padding-right: 10px;
  }

  .header__logo {
    width: 70%;
    margin-bottom: 10px;
  }

  .home__logo {
    width: 75%;
    margin-top: 30px;
  }

  .explanations__categories {
    margin-top: 20px;
  }

  .explanations__category + .explanations__category {
    margin-top: 20px;
  }

  .explanations__text {
    margin-top: 30px;
  }

  .choice__button{
    @include font-size(15);
  }

  .question__wrapper{
  }

  .question-popup-result{
    border-width: 2px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .page__content{
    padding: 0 10px;
  }
}
</style>

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isStoreReady: false,
        isLoading: false,
        questions: [],
        scores: [],
        categories: [],
        timeBonusMultiplier: 0,
        gameId: null
    },
    getters: {
        isLoading: (state) => {
            return state.isLoading;
        },
        getQuestion: (state) =>{
            return index => state.questions[index];
        },
        isEnd: (state) => {
            return currentQuestion => currentQuestion + 1 > state.questions.length -1;
        },
        getCategoryName: (state) => {
            return categoryID => state.categories[categoryID];
        },
        timeBonusMultiplier: (state) => {
            return parseFloat(state.timeBonusMultiplier);
        },
        getScores: (state) => {
            return state.scores;
        }
    },
    mutations: {
        LOADING: (state, isLoading = true) => {
            state.isLoading = isLoading;
        },
        FETCH_SETUP_GAME: (state, game) => {
            state.teams = game.teams;
            state.questions = game.questions;
            state.categories = game.categories;
            state.timeBonusMultiplier = game.timeBonusMultiplier;
            state.isStoreReady = true;
            state.gameId = game.gameId;
            state.nbQuestionsPerTeam = game.nbQuestionsPerTeam;
        },
        SET_QUESTION_SCORE: (state, questionScore) => {
            let scores = [...state.scores];
            scores[questionScore.questionIndex] = questionScore;
            state.scores = scores;
        }
    },
    actions: {
        setLoading: (store, isLoading = true) => {
            store.commit('LOADING', isLoading);
        },
        fetchSetupGame: (store, setupGame) => {
            store.commit("FETCH_SETUP_GAME", setupGame);
        },
        setScore: (store, questionScore) => {
            store.commit("SET_QUESTION_SCORE", questionScore);
        },
        isStoreReady: (store) => {
            return store.state.isStoreReady;
        }
    },
    strict: true
})

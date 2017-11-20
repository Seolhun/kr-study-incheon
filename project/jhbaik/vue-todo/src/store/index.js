import Vue from 'vue';
import Vuex from 'vuex';
import Const from '../constant';

Vue.use(Vuex);

var STORAGE_KEY = 'todos-vuejs';

var todoStorage = {
    fetch: function () {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    },
    save: function (todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
};


const store = new Vuex.Store({
    state: {
        todos : todoStorage.fetch(),
        visibility : 'all',
    },
    getters : {
        filteredTodos(state) {
            if (state.visibility == 'active') {
                return state.todos.filter(todo=>!todo.done);
            }
            else if (state.visibility == 'completed') {
                return state.todos.filter(todo=>todo.done);
            }
            else {
                return state.todos;
            }
        },
        activeTodos(state) {
            return state.todos.filter(todo=>!todo.done);
        }
    }, 
    mutations: {
        [Const.ADD_TODO] : (state, payload) => {
            if (payload && payload.todo && payload.todo != ''){
                state.todos.push({ title : payload.todo, done:false});
                todoStorage.save(state.todos);
            }
        },
        [Const.UPDATE_TODO] : (state, payload) => {
            alert(Const.UPDATE_TODO);
        },
        [Const.DELETE_TODO] : (state, payload) => {
            var index = state.todos.indexOf(payload.obj);
            if (index >= 0){
                state.todos.splice(index, 1);        
                todoStorage.save(state.todos);
            }
        },
        [Const.DELETE_COMPLETED_TODO] : (state, payload) => {
            state.todos = state.todos.filter(todo=>!todo.done)
            todoStorage.save(state.todos);
        },        
        [Const.TOGGLE_DONE_TODO] : (state, payload) => {
            var index = state.todos.indexOf(payload.obj);
            if (index >= 0){
                state.todos[index].done = !state.todos[index].done;            
                todoStorage.save(state.todos);
            }
        },           
        [Const.CHECK_DONE_TODO] : (state, payload) => {
            state.todos.forEach(todo => {
                todo.done = payload.value;
            });
            todoStorage.save(state.todos);
        },         
        
        [Const.CHANGE_VISIBILITY] : (state, payload) => {
            if (payload && payload.value && payload.value != ''){
                state.visibility = payload.value;     
            }       
        },           
        
    }
})

export default store;
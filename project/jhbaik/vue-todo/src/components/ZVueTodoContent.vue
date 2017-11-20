<template>
  <section class="main" v-show="todos.length">
    <input class="toggle-all" type="checkbox" v-model="allDone">
    <ul class="todo-list">
      <li class="todo" v-for="todo in filteredTodos" :key="todo.id" :class="{completed: todo.done, editing: todo == editedTodo}">
        <div class="view">
          <input class="toggle" type="checkbox" v-model="todo.done" @click="toggleDoenTodo(todo)">
          <label @dblclick="editTodo(todo)">{{todo.title}}</label>
          <button class="destroy" @click="removeTodo(todo)"></button>
        </div>
        <input class="edit" type="text" v-model="todo.title" v-todo-focus="todo == editedTodo" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)">
      </li>
    </ul>
  </section>
</template>    

<script>
import Const from '../constant';

export default {
  name: 'ZVueTodoContent',
  data : function () {
    return {
      newTodo : '',
      editedTodo : null,
    }
  },
  computed : {
    todos : function() {
      return this.$store.state.todos;
    },
    filteredTodos : function () {
      return this.$store.getters.filteredTodos;
    },
    remaining: function () {
      return this.$store.getters.activeTodos.length;
    },
    allDone: {
      get: function () {
        return this.remaining === 0;
      },
      set: function (value) {
        this.$store.state.todos.forEach(todo => {
          this.$store.commit(Const.CHECK_DONE_TODO, { value : value });
        });
      }
    },    
  },
  methods : {
    removeTodo : function(todo) {
      this.$store.commit(Const.DELETE_TODO, { obj : todo});
    },
    toggleDoenTodo : function(todo) {
      this.$store.commit(Const.TOGGLE_DONE_TODO, { obj : todo});
    },
    editTodo : function() {
      alert('editTodo');
    },
    doneEdit : function() {
      alert('doneEdit');
    }
  },
  created : function() {
    this.$store.commit(Const.CHANGE_VISIBILITY, { value : this.$route.visibility });
  },
  watch : {
    '$route' : function(to, from) {
      this.$store.commit(Const.CHANGE_VISIBILITY, { value : to.params.visibility });
    }
  },
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  },  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

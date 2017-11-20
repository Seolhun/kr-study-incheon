<template>
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo"
        autofocus autocomplete="off"
        placeholder="What needs to be done?"
        v-model="newTodo"
        @keyup.enter="addTodo">
    </header>
</template>    

<script>
import Const from '../constant';

export default {
  name: 'ZVueTodoHeader',
  data : function () {
    return {
      newTodo : '',
    }
  },
  computed : {
  },
  methods : {
    addTodo : function() {
      this.$store.commit(Const.ADD_TODO, { todo : this.newTodo});
      this.newTodo = '';
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

<template>
  <div class="todoapp" v-cloak>

    <z-vue-todo-header/>

    <z-vue-todo-content/>

    <z-vue-todo-footer/>

    <div class="todoapp" v-cloak>
      <h1>zoops todos</h1>
    </div>

  </div>
</template>

<script>
import ZVueTodoHeader from '@/components/ZVueTodoHeader';
import ZVueTodoContent from '@/components/ZVueTodoContent';
import ZVueTodoFooter from '@/components/ZVueTodoFooter';
import Const from '../constant';

export default {
  name: 'ZVueTodo',
  data : function () {
    return {
    }
  },
  components: { ZVueTodoHeader, ZVueTodoContent, ZVueTodoFooter }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

import Vue from 'vue'
import Router from 'vue-router'
import ZVueTodo from '@/components/ZVueTodo'
import ZVueTodoFooter from '@/components/ZVueTodoFooter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ZVueTodo',
      component: ZVueTodo
    },
    {
      path: '/:visibility',
      name: 'ZVueTodo',
      component: ZVueTodo
    },
    {
      path: '/ZVueTodoFooter',
      name: 'ZVueTodoFooter',
      component: ZVueTodoFooter
    },    
  ],
  configure : {
    notfound: function () {
      window.location.hash = '';
      app.visibility = 'all';
    }
  }
})

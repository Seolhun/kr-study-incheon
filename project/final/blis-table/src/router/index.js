import Vue from 'vue'
import Router from 'vue-router'
import BlisMain from '@/components/BlisMain'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BlisMain',
      component: BlisMain
    }
  ]
})

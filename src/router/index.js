import Vue from 'vue'
import Router from 'vue-router'
import VueLeaflet from '@/components/VueLeaflet'
import index from '@/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: index
    },
    {
      path: '/VueLeaflet',
      name: 'VueLeaflet',
      component: VueLeaflet
    }
  ]
})

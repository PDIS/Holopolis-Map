import Vue from 'vue'
import Router from 'vue-router'
import VueLeaflet from '@/components/VueLeaflet'
import index from '@/components/index'
import vote from '@/components/vote'
import share from '@/components/share'
import comment from '@/components/comment'

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
    },
    {
      path: '/vote/:id',
      name: 'vote',
      component: vote
    },
    {
      path: '/share/:id',
      name: 'share',
      component: share
    },
    {
      path: '/comment/:id',
      name: 'comment',
      component: comment
    },
  ]
})

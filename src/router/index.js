import Vue from 'vue'
import Router from 'vue-router'
import worldmap from '@/components/worldmap'
import index from '@/components/index'
import vote from '@/components/vote'
import opinion from '@/components/opinion'
import login from '@/components/login'
import intro from '@/components/intro'
import camera from '@/components/camera'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: intro
    },
    {
      path: '/index',
      name: '/index',
      component: index
    },
    {
      path: '/worldmap',
      name: 'worldmap',
      component: worldmap
    },
    {
      path: '/vote/:id',
      name: 'vote',
      component: vote
    },
    {
      path: '/opinion/:id',
      name: 'opinion',
      component: opinion
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/intro',
      name: 'intro',
      component: intro
    },
    {
      path: '/camera',
      name: 'camera',
      component: camera
    }
  ]
})

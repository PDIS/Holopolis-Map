import Vue from 'vue'
import Router from 'vue-router'
import worldmap from '@/components/worldmap'
import index from '@/components/index'
import vote from '@/components/vote'
import share from '@/components/share'
import comment from '@/components/comment'
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
      path: '/share/',
      name: 'share',
      component: share
    },
    {
      path: '/comment/:id',
      name: 'comment',
      component: comment
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

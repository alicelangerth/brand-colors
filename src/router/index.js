import Vue from 'vue'
import Router from 'vue-router'
import ImageAnalysis from '@/components/ImageAnalysis'
import Start from '@/components/Start'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start
    },
    {
      path: '/image-analysis',
      name: 'ImageAnalysis',
      component: ImageAnalysis
    }
  ]
})

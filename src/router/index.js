import Vue from 'vue'
import Router from 'vue-router'
import Imgs from '@/components/Img/Imgs'
import ImgsDetail from '@/components/Img/ImgsDetail'
import Sources from '@/components/Source/Sources'
import SourceDetail from '@/components/Source/SourceDetail'


Vue.use(Router)

export default new Router({
  routes: [
    
    { path: '/', redirect: '/imgs' },

    { path: '/imgs', component: Imgs },
    { path: '/imgs-detail/:id', component: ImgsDetail },

    { path: '/sources', component: Sources },
    { path: '/sources-detail/:id', component: SourceDetail }
  ]
})

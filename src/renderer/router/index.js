import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'landing-page',
    //   component: require('@/components/LandingPage').default
    // },
    // {
    //   path: '*',
    //   redirect: '/'
    // }
    {
      path:'/',
      component:require('@/views/children/check_dir').default,
      children: [
        {
          path:'check_dir',         
          component:require('@/views/children/check_dir').default
        },
        {
          path:'check_file',
          component:require('@/views/children/check_file').default
        }
      ]
    }
  ]
})

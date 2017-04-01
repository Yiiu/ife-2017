
import Router from './router'

import '../asset/styles/main'

let router = [
    {
        path: '/',
        component: resolve => require(['./components/index'], resolve)
    },
    {
        path: '/reg1',
        component: resolve => require(['./nuomi/reg1'], resolve)
    },
    {
        path: '/vue1',
        component: resolve => require(['./nuomi/vue1'], resolve)
    },
    {
        path: '/vue2',
        component: resolve => require(['./nuomi/vue2'], resolve)
    },
    {
        path: '/vue3',
        component: resolve => require(['./nuomi/vue3'], resolve)
    },
    {
        path: '/vue4',
        component: resolve => require(['./nuomi/vue4'], resolve)
    }
]

window.Router = new Router(router).$mount('section.main')

window.Router.beforeEach((to, from, next) => {
    console.log(to)
    console.log(from)
    console.log(next)
})
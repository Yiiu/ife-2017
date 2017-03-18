
import Router from './router'

import '../asset/styles/main.less'

let index = resolve => require(['./components/index'], resolve)

let reg1 = resolve => require(['./nuomi/reg1'], resolve)

let vue1 = resolve => require(['./nuomi/vue1'], resolve)

let vue2 = resolve => require(['./nuomi/vue2'], resolve)




let router = [
    {
        path: '/',
        component: index
    },
    {
        path: '/reg1',
        component: reg1
    },
    {
        path: '/vue1',
        component: vue1
    },
    {
        path: '/vue2',
        component: vue2
    }
]

window.Router = new Router(router).$mount('section.main')

window.Router.beforeEach((to, from, next) => {
    console.log(to)
    console.log(from)
    console.log(next)
})